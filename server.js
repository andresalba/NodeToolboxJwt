require('dotenv').config()

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username: 'Aea',
        title: 'Post 1',
        content: 'This is the content of post 1',
    },
    {
        username: 'Bob',
        title: 'Post 2',
        content: 'This is the content of post 2',
    },
    {
        username: 'John',
        title: 'Post 3',
        content: 'This is the content of post 3',
    },
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})