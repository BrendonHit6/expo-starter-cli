import Logger from './Logger';

const ErrorManager = {
  handle: (error: unknown, context?: string) => {
    Logger.error(context ?? 'Unknown', error);
  },
};

export default ErrorManager;
