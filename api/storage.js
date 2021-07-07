// write the replacement code for json manipulation here. 
// use that to refactor the current json code in the project.
const chat = 
{ 
    lines: []
}

const addLine = (username, text) => {
    let line = 
    {
        "username": username, 
        "text": text
    }
    chat.lines.push(line)
}

const skipChat = (lines = [], skip) => {
    return lines.slice(skip)
}

