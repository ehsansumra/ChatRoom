import fs from "fs";

export const loadJSON = (filename = '') => {
    if (fs.existsSync(filename)) {
        return JSON.parse(fs.readFileSync(filename))
    }   else {
        return JSON.parse('null')
    }
}

export const saveJSON = (filename = '', json = '"') => {
    return fs.writeFileSync(filename, JSON.stringify(json));
}

const logJSON = (filename = '') => {
    let json = loadJSON(filename)
    console.log(json)
    console.log(typeof(json))
}

export const checkUser = (name,filename = '"') => {
    // check if name and cookie match.
    let users = filename.users
    for (let user of users) {
        if (name == user.username) {
            console.log('name match')
            return true
        }
    }
    console.log('not found')
    return false    
}

export const addUser = (name, filename = '') => {
    // always do an auth before this function or else it will add duplicates
    let data = loadJSON(filename)
    let userNum = Object.keys(data.users).length
    
    data.users.push({ 
        "id": userNum, 
        "username": name, 
        "loggedon": false })
    
    saveJSON(filename, data)
    
}

export const authUser = (name, filename = '') => {
    let data = loadJSON(filename)
    let userExists = checkUser(name, data)
    return userExists
}

export const loggedOn = (name, filename = '') => {
    let data = loadJSON(filename)
    let users = data.users
    console.log(users)
    const user = users.find( user => name == user.username)
    console.log(user)
    
    user.loggedon = !user.loggedon
    console.log(user)
    saveJSON(filename, data)
}

export const addLine = (chatline, filename = '') => { 
    //chatline is {"username": name, "text": text} object
    let chat = loadJSON(filename)
    chat.lines.push(chatline)
    saveJSON(filename, chat)
}

export const addID = ((username, filename = '') => {
    let chat = loadJSON(filename)
    let users = chat.users
    user.find()
})

