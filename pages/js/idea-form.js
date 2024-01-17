document.getElementById('idea-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    fetch('/submit-idea-form', {
        method: 'POST',
        body: JSON.stringify(formDataObject),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});