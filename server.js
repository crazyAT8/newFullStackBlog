const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()

// How we convert to HTML
app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

// The Route
app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Article 2',
        createdAt: new Date(),
        description: 'Test description 2'
    }]
    res.render('index', { articles: articles })
})

// Route Test - with text
// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

app.listen(5000)