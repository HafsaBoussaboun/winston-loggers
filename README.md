
# winston-loggers

This project sets up a centralized logging system using Winston with daily log file rotation and MongoDB transport.

## Files

#### logger.ts : This file contains the configuration for Winston logging, including daily rotation and MongoDB transport.

#### index.ts : This file demonstrates how to use the configured logger.

## Setup
1. Make sure to install the required npm packages: run `npm install`

2. Configure MongoDB : Ensure that MongoDB is running and accessible at the specified connection string (mongodb://localhost:27017/winston).

3. Usage : Import the logger from logger.ts and use it throughout your application to log messages with different levels and transports.

4. Log Files : 
- Log files are rotated daily and stored in the format combined-%DATE%.log.
- Error logs are stored in error.log.
- Logs are also stored in the MongoDB collection logs.
