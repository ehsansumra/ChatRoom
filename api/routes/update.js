const express = require('express');
let router = express.Router();
const cors = require('cors')

const chat = 
{ 
    lines: []
}

router.post("/chat", (req, res) => {
    const line = req.body
    console.log(`/chat line: ${line}`)
    console.log(`/chat stringify line: ${JSON.stringify(line)}`)
    
     // switch to memory
    chat.lines.push(line)
    res.sendStatus(200)

})

router.post("/update", (req, res) => {
    // ?skip
    let skip = req.query.skip
     // replace with memory
    console.log('sending')
    res.json(JSON.stringify(chat))
})


router.post("/update/skip", (req, res) => {
    // console.log(req.body)
    const skip = req.body.skip
    const lines = chat.lines // replace with memory
    const skipChat = lines.slice(skip)
    res.json(JSON.stringify(skipChat))
    
})

module.exports = router;