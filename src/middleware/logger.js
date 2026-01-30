import pinoHttp from 'pino-http';

export const pinoHttpLogger = pinoHttp({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
