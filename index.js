require('module-alias/register');
require('dotenv').config();
const ServerlessHttp = require("serverless-http");
const express = require('express');
const helmet = require('helmet'); // For setting HTTP headers securely
const morgan = require('morgan'); // HTTP request logger
const cors = require('cors'); // To enable CORS
const rateLimit = require('express-rate-limit'); // To limit request rate
const connectDatabase = require('@utils/database'); // Use relative import if not using module-alias: require('./utils/database')
const routes = require('@routes/mainRouter');

// Initialize express app

const app = express();

// Connect to MongoDB
connectDatabase();

// Set security-related HTTP headers
app.use(helmet());

// Enable CORS with various options
app.use(cors({
  origin: ['http://localhost:3000', 'https://app.lls-chharipalitsangh.in'],
}));

// Log HTTP requests
app.use(morgan('combined'));

// JSON Body Parser Middleware
app.use(express.json());

// Rate limiting middleware
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);
app.use('/api', routes);

// Define your routes here
app.get('/', (req, res) => {
  res.send('Hello, Secure World!');
});

// Handle non-existent route
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

exports.handler = async (event, context, callback) => {
  try {
      context.callbackWaitsForEmptyEventLoop = false

      await connectDatabase();
      const server = ServerlessHttp(app);
      return await server(event, context)
  } catch (err) {
      logger.error("Error occurred! =>", err)
      throw err
  }
}

