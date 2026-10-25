const quantity = document.getElementsByClassName('quan');
const remove = document.getElementsByClassName('remove');

Array.from(quantity).forEach(function(element) {
      element.addEventListener('click', function(){
        // const name = this.parentNode.parentNode.childNodes[1].innerText //since creating objectID and message ID, we don't need const name and const msg anymore!
        // const msg = this.parentNode.parentNode.childNodes[3].innerText
        const quanNum = parseFloat(this.parentNode.childNodes[15].value)
        console.log(quanNum)
        const messageID = this.parentNode.childNodes[1].dataset.messageId
        console.log(messageID)
        fetch('likes', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            messageID,
            'quantity':quanNum
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(remove).forEach(function(element) {
      element.addEventListener('click', function(event){
        const productId = event.target.dataset.productId
        fetch('/product', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
