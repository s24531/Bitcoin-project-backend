const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const databaseConnection = require('./DbConnection')
const toolsGet = require('./Endpoints/ToolsGET')
const toolsGetById = require('./Endpoints/ToolByIdGET')
const toolsGetDetails = require('./Endpoints/ToolDetailsGET')
const toolsGetByPrice = require('./Endpoints/ToolByPriceGET')
const commentsGet = require('./Endpoints/CommentsByProductIdGET')
const commnetsPost  = require('./Endpoints/CommentsPOST')
const { exec } = require('child_process')
var cors = require('cors')

const app = express()
const port = 3000

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Tools Page API',
        description: 'Tools Page API Information',
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

app.use(cors(corsOptions))

databaseConnection();

app.use(toolsGet)
app.use(toolsGetById)
app.use(toolsGetDetails)
app.use(toolsGetByPrice)
app.use(commentsGet)
app.use(commnetsPost)

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
)

app.listen(port, () => {
    console.log(`Application works on port: ${port}`)
})

exec('bash start_tunnel.sh', (error, stdout, stderr) => {
  if (error) {
      console.error(`Error executing script: ${error}`);
      return;
  }
  if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}`);
});