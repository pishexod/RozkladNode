const express = require('express')
const path = require("path")
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
const PORT = 8989

require('./config/connect-mongo')

app.use(session({
    secret: 'i need more beers',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://172.16.200.2:27017/'
    })
}));


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/', require('./routes/MainRoute'))
app.use('/user', require('./routes/LoginRoute'))
app.use('/admin', require('./routes/AdminRoute'))
app.use('/admin/schedule', require('./routes/ScheduleRoute'))
app.use('/api/telegram', require('./routes/UserTelegramAPI'))


app.use(function (req, res, next) {
    res.status(404).render('error', {
        error: 'Сторінка не знайдена'
    })
})

app.listen(PORT, () => {
    console.log('Server Start. Port: ' + PORT);
})
