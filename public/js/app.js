console.log('JavaScript file is loaded')



const weatherForm = document.getElementById('weather')
const search = document.querySelector('#weather input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    fetch('/weather?address=' + location).then((res) => res.json())
        .then((data) => {
            if (data.error) {
                document.getElementById('message-1').innerText = data.error
                document.getElementById('message-2').innerText = ''
            }
            else {
                document.getElementById('message-1').innerText = data.location
                document.getElementById('message-2').innerText = data.weather
            }
        })
})