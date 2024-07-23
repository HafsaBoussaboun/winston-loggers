import logger from './logger-winston';
const requestLog = {method: 'POST'};
logger.info('This is an info message', requestLog);
logger.error('This is an error message', { APP: 'winston' });
logger.error('This is an error message', new Error('foo'));
