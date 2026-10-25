const Product = require('./models/product.js');
module.exports = function(app, passport, db, ObjectID) {

// LOGIN SECTION =========================
    app.get('/', function(req, res) {
      res.render('index.ejs')
    });
// SHOW HOME PAGE (will also have our login links) ================
    app.get('/profile', async function(req, res) {
      try {
        const products = await Product.find({}); //this is to find ERRthing in the database
        res.status(200).render('profile.ejs', { 
          user: req.user,
          products: products, error: undefined });
      } catch (error) {
        res.status(500).json({ message: error.message })
    };
    });
//// SHOWS ONE PRODUCT IN THE DATABASE =========================
    app.get('/product/:id', async function(req, res) {
      try {
        const { id } = req.params;
        const product = await Product.findOne({ _id: new ObjectID(id) }); //this is to find all things in the database
        console.log(product, "help!")
        res.status(200).render('product.ejs', { 
          user: req.user,
          product});
      } catch (error) {
        res.status(500).json({ message: error.message })
    };
    });

//// CREATES A FRIDGE ITEM =================================
    app.post('/products', async function(req, res) {
      try {
        const product = await Product.create(
          { ...req.body, roommate: req?.user?.local?.name }
        ); //we are creating an instance for this productSchema aka an object!
        console.log(product);
        res.redirect('/profile');
      } catch (error) {
        
        res.status(500).json({ message: error.message }); //this means server error and we'll throw the error out of json.
    }
    })
// LOGOUT PROCESS ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

//// UPDATING A FRIDGE ITEM ===============================================================

    app.put('/product', (req, res) => {
      console.log(req.body)
      console.log(Number(req.body.quantity))
      db.collection('fridgeitems')
      .findOneAndUpdate({_id: new ObjectID(req.body.productId)}, {
        $set: { //this is a mongodb operator that acts on a 'field' (aka the Key)
          quantity: Number(req.body.quantity)
        }
      }, (err, result) => {
          console.log(err)
        if (err) return res.send(err)
        res.send(result)
      })
    })

//// DELETING A FRIDGE ITEM ===============================================================

    app.delete('/product', (req, res) => {
      db.collection('fridgeitems').findOneAndDelete({_id: new ObjectID(req.body.productId)}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Fridge Item deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}










