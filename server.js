const express = require('express')
//const cluster = require('cluster')
//const numCPUs = require('os').availableParallelism();
const PORT = 4000

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
    res.send('Root end point')
})

app.get('/:id', (req,res) => {
    const data = req.body
    const params = req.params.id
    console.log(data)
    console.log(params)
    res.status(200).send('hi there')
})

// We run the code as usual and the PM 2.0 handles the things from here as 
// each of this instance runs as worker thread
console.log('running workers threads..')
app.listen(PORT, () => {
    console.log('server is running')
})