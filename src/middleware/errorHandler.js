import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }
  console.log(process.env.NODE_ENV);
  const isProd = process.env.NODE_ENV === 'production';
  console.log(err.message);
  res.status(500).json({
    message: isProd ? 'Opps its an error!!! ' : err.message,
  });
};
