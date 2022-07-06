const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 8000
const colors = require('colors')
const connectDB = require('./config/db')
var cors = require('cors')

// Connect to MongoDB
connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// Routes
app.use('/api/feedback', require('./routes/feedbackRoutes'))

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome, please leave constructive feedback about my projects, website or resume!'})
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))