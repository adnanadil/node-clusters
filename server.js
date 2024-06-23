const express = require('express')
const cluster = require('cluster')
const numCPUs = require('os').availableParallelism();
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

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    console.log(`Number of CPUs: ${numCPUs}`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  }

  else {
    console.log(`Worker ${process.pid} started`);

      app.listen(PORT, () => {
        //   console.log('server is running')
      })
  }
