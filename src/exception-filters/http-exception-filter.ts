import{ExceptionFilter, ArgumentsHost, HttpException, Catch, HttpStatus} from '@nestjs/common';
import{Response, Request} from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (status == 401 && exception.message == 'Unauthorized') {
      response.status(status).json({
        status: status,
        message: exception.message,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }
    response.status(status).json({
      error: exception.getResponse(),
    });
  }
}