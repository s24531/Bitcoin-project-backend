const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser');
const Client = require('bitcoin-core');
const { exec } = require('child_process')
var cors = require('cors')


const databaseConnection = require('./DbConnection')
const planesGet = require('./Endpoints/PlaneGET')
const planesGetById = require('./Endpoints/PlaneByIdGET')
const planesGetDetails = require('./Endpoints/PlaneDetailsGET')
const planesGetByPrice = require('./Endpoints/PlaneByPriceGET')
const commentsGet = require('./Endpoints/CommentsByProductIdGET')
const commnetsPost  = require('./Endpoints/CommentsPOST')
const getBalance = require('./Endpoints/GetBalancePOST')
const sendPayment = require('./Endpoints/SendPaymentPOST')

const app = express()
const port = 3000

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Planes Page API',
        description: 'Planes Page API Information',
        contact: {
          name: 'Developer Name',
        },
        servers: ['http://localhost:3000'],
      },
    },
    // ['.routes/*.js']
    apis: ['./Endpoints/*.js'],
  }

const swaggerDocs = swaggerJsDoc(swaggerOptions)
const corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
}
app.use(bodyParser.json());
app.use(cors(corsOptions))

databaseConnection();

app.use(planesGet)
app.use(planesGetById)
app.use(planesGetDetails)
app.use(planesGetByPrice)
app.use(commentsGet)
app.use(commnetsPost)
app.use(getBalance)
app.use(sendPayment)

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
)

app.listen(port, () => {
    console.log(`Application works on port: ${port}`)
})