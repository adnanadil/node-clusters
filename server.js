const express = require('express')

const app = express()
app.use(express.json());

function blockingCode(interval) {
    const startTime = Date.now()
    while(Date.now() - startTime < interval) {
        // Block the coder here
    }
    console.log('Hitting this function')
}

app.get('/blockingCode', (req,res) => {
    blockingCode(9000)
    res.send('Hi there Friend')
})

app.get('/', (req,res) => {

})

app.get('/:id', (req,res) => {
    const data = req.body
    const params = req.params.id
    console.log(data)
    console.log(params)
    res.status(200).send('hi there')
})

app.listen(4000, () => {
    console.log('server is running')
})