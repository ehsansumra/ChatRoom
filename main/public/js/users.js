
const userBox = document.getElementById("userbox")

function createUser(username, id) {
    user = {
        "id": id,
        "username": username,
        "loggedon": "false"
    }
    return user
}

function getText() {
    // debugger
    userBox.addEventListener("keypress", function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log(userBox.value)
            console.log(typeof userBox.value)
            fetch('http://localhost:5001/login', { 
                method: "POST", 
                body: JSON.stringify({username: userBox.value}), 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                credentials: "include"
            })
            .then(data => {
                console.log(data)
                window.location.href="http://localhost:5000";
            });
            
        }
    }, {once : true})
}



