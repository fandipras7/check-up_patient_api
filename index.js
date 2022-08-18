require('dotenv').config()
const express = require('express')
const createError = require('http-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const xss = require('xss-clean')
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(
    helmet.crossOriginResourcePolicy({
        policy: 'cross-origin'
    })
)
app.use(xss())

// route
app.use('/api')

app.all('*', (req, res, next)=> {
    next(new createError.NotFound())
})

app.use((err, req, res, next) => {
    let messError = err.message || 'Internal Server Error'
    const statusCode = err.status || 500
    res.status(statusCode).json({
        message: messError
    })
})

app.listen(PORT, ()=>{
    console.log(`Server starting on port ${PORT}`);
})