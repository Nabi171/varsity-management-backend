/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || 'Something went wrong!';

  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'ami zod error';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: err,
  });
};

export default globalErrorHandler;
