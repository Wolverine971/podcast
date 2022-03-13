const bodyParser = require('body-parser')
import { Request, Response } from "express";
const app = require('express')()

app.use(bodyParser.json())
app.post('/password', (req: Request, res: Response) => {
    if(req.body.password === process.env.password){
        res.json({ data: true })
    } else {
        res.status(400)
    }
})

module.exports = app
