import logger from './logger-winston';

const data = {method: 'POST'};
logger.info('This is an info message', data);
logger.error('This is an error message',{ APP: 'winston' });
logger.error('This is an error message', new Error('page not found'));
