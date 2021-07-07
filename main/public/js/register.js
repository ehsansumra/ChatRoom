const regBox = document.getElementById("regbox")
console.log('bruh')
function getRegister() {
    // debugger
    regBox.addEventListener("keypress", function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log(regBox.value)
            console.log(typeof regBox.value)
            fetch('http://localhost:5001/register', {method: "POST", body: JSON.stringify({username: regBox.value}), headers: {
                'Content-Type': 'application/json'}})
            .then(data => {
                console.log(data)
                window.location.href="http://localhost:5000/users";
            });
            
        }
    }, {once : true})
}
