import * as winston from 'winston'; // Import the main winston library
const { combine, timestamp, errors, json, prettyPrint } = winston.format; // Destructure formatting functions from winston.format
import winstonDailyRotateFile from 'winston-daily-rotate-file'; // Import the daily rotate file transport plugin
import 'winston-mongodb'; // Import the MongoDB transport plugin

const options = {
  db: 'mongodb://localhost:27017/winston', // MongoDB connection string
  collection: 'logs', // Collection name in MongoDB
  capped: true, // Attempt to create a capped collection
  level: 'info', // Minimum log level to capture
  json: true, // Output logs in JSON format
}; 

// Example out format function definition
// const myFormat = printf(({ level, message, timestamp }) => {
//   return `${timestamp} [${level}]: ${message}`;
// });

const fileRotateTransport = new winstonDailyRotateFile({
  filename: 'combined-%DATE%.log', // Filename template for rotated log files
  datePattern: 'YYYY-MM-DD', // Date pattern for filename
  maxFiles: '14d' // Maximum number of log files to keep
}); // Create a new instance of the daily rotate file transport

const logger = winston.createLogger({  
  level: 'warn', // Minimum log level
  defaultMeta: {
    service: 'admin-service', // Default metadata to prepend to each log entry
  }, 
  format: combine( // Combine multiple formatting functions
    errors({ stack: true }), // Include error stack traces
    timestamp(), // Add a timestamp to each log entry
    json(), // Format logs as JSON
    prettyPrint() // Pretty print the JSON logs
  ), // End of combined formats
  transports: [
    new winston.transports.Console(), // Console transport
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // File transport for error logs
    new winston.transports.MongoDB(options), // MongoDB transport with specified options
    fileRotateTransport // Daily rotate file transport
  ] // Array of transports
}); // Create the logger with the specified configuration

export default logger; // Export the logger for use in other parts of the application