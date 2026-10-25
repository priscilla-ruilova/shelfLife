const saveEdits = document.querySelector('.save').addEventListener('click', (event) => {
    const quanNum = document.querySelector('#quanNum').value
    const productId = event.target.dataset.Id 
    console.log('HELP', event.target)
    console.log()
    console.log(productId)
    fetch('/product', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            productId,
            'quantity':quanNum
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.href = '/profile'
        })
})

