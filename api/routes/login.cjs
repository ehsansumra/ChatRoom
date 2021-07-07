import express from "express";
let router = express.Router();

router.post("/update/skip", (req, res) => {
    const skip = req.body.skip
    const lines = chat.lines // replace with memory
    const skipChat = lines.slice(skip)
    res.json(JSON.stringify(skipChat))
    
})

module.exports = router;