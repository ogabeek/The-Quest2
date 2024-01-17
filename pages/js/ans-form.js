document.getElementById('ans-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(event.target);

    let formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });
    console.log(formDataObject)

    fetch('/submit-ans-form', {
        method: 'POST',
        body: JSON.stringify(formDataObject),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('verdict').textContent = data.message
    })
    .catch(error => {
        console.error('Error:', error);
    });
});