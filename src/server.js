const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const routerNavigation = require('./routes')
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./middleware/swagger');
dotenv.config()

const app = express()
const port = process.env.SERVER_PORT

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/kost-management-system/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha'
    }
  }
));
app.use("/kost-management-system/api/v1", routerNavigation)

app.listen(port, () => {
  console.log(`✅ Your backend server is connected at port ${port}`)
  console.log(`✅ You can access API documentation at : ${process.env.SERVER_API_DOCUMENTATION_URL}`)
})