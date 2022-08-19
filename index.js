require('dotenv').config()
const express = require('express')
const createError = require('http-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const xss = require('xss-clean')
const PORT = process.env.PORT || 8080
const mainRoute = require('./src/routes/index')

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
app.use('/api', mainRoute)

app.all('*', (req, res, next)=> {
    next(new createError.NotFound())
})

app.use((err, req, res, next) => {
    let messError = err.message || 'UNKNOWN_ERROR'
    const statusCode = err.status || 500
    let status
    if(statusCode == 400){status = 'INVALID_REQUEST'}
    if(statusCode == 404){status = 'DATA_NOT_FOUND'}
    if(statusCode == 500){status = 'UNKNOWN_ERROR'}
    res.status(statusCode).json({
        status,
        message: messError
    })
})

app.listen(PORT, ()=>{
    console.log(`Server starting on port ${PORT}`);
})