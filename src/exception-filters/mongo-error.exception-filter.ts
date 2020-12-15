import {ExceptionFilter, ArgumentsHost, Catch} from '@nestjs/common';
import {MongoError} from 'mongodb';
import { Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const hostSwitch = host.switchToHttp();
    const response = hostSwitch.getResponse<Response>();

    console.log('MongoError', exception);

    return response.status(404).json({
      message: {
        statusCode: 404,
        error: 'Not Found',
        message: exception.message,
      },
    });
  }
}