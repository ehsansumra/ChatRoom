const body = document.body
const div = document.createElement("div")
const tBox = document.getElementById("textbox")
const chatBox = document.getElementById("chatbox")

const user1 = 'retard559'
const user1ID = 'user1'

const user2 = 'farthead1008'
const user2ID = 'user2'

function clearDiv(id) {
    document.getElementById(id).innerHTML = "";
}

function newLine() {
    const line = document.createElement("div")
    line.setAttribute('class', 'line')
    return line
}

function userSpan(id, username) { //id and username will just be hardcoded for now
    const spanName = document.createElement("span")
    spanName.setAttribute('class', 'user')
    spanName.setAttribute('id', id)
    spanName.innerText = username
    return spanName
}

function textSpan(value) {
    const spanText = document.createElement("span")
    spanText.setAttribute('class', 'statement')
    spanText.innerText = ': ' + value
    return spanText
}

function getText() {
    // debugger
    tBox.addEventListener("keypress", function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log(`frontend entry ${tBox.value}`)
            fetch('http://localhost:5001/chat', 
                {method: "POST", 
                body: JSON.stringify({username: "Anonymous", text: tBox.value}), //add a way for user to be identified
                headers: {"Content-Type": "application/json"}})
            // .then(response => response.json())
            .then(data => {
                console.log(`data response: ${data}`)

            });
        }
    }, {once : true})
}

function chatLine(filename = "") {// param is the json
    //this function will be executed with a map()
    let chatData = filename
    let chatL = newLine()
    let chatUser = userSpan('user1', chatData.username)
    let chatText = textSpan(chatData.text)
    chatL.appendChild(chatUser)
    chatL.appendChild(chatText)
    chatBox.appendChild(chatL)
} 

function updateChat(dataLines) {// takes data.lines array
    // pass in the JSON string!
    console.log
    // clearDiv("chatbox") //clears the chatbox
    dataLines.map(line => chatLine(line))
}

let skipNum = 0
function updateSkipnum (num) {
    skipNum += num;
}


function updateSkip(skipNum) {
    fetch('http://localhost:5001/update/skip', 
    {method: "POST", body: JSON.stringify({skip: skipNum}),
    headers: {'Content-Type': 'application/json'},
    mode: "cors"}) //gotta specify post
    
    .then(response => response.json())
    .then(data => {
        if (data) {
            let lines = JSON.parse(data)
            console.log(lines)
            updateSkipnum(lines.length)
            console.log(`update: ${data}`)
            updateChat(lines)
        } else {
            console.log('nothing received')
        }
        

    })
}


console.log('getChat:')
fetch('http://localhost:5001/update', 
    {
    method: "POST", 
    mode: "cors"
    }) //gotta specify post
    .then(response => response.json())
    .then(data => {
        if (data) {
            console.log('1')
            let chat = JSON.parse(data)
            let update = chat.lines
            skipNum = update.length
            console.log(`skipNum: ${skipNum}`)
            console.log(update)
            updateChat(update)
        } else {
            console.log('nothing received')
        }})
        
                
setInterval(() => {
    console.log('3 seconds')
    updateSkip(skipNum)
}, 3000)

//LEFT OFF HERE
// trying to receive the chat.json from /chat endpoint