import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { transformJson } from '../utils/tools';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const Exception = exception.getResponse();
    const message = exception.message;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const code = Exception.code !== undefined ? Exception.code : status;
    // 向日志中写入错误信息
    this.logger.error(
      `${message}\n\tMethod: ${
        request.method
      }\n\tStatus code: ${status}\n\tRequest original url: ${
        request.originalUrl
      }\n\tIP: None IP\n\tParams: ${
        transformJson(request.params) ?? 'None Params'
      }\n\tQuery: ${transformJson(request.query) ?? 'None Query'}\n\tBody: ${
        transformJson(request.body) ?? 'None Body'
      }\n`,
      `${exception.stack}`,
    );

    // 设置返回的状态码、请求头、发送错误信息
    response.status(status).send({
      code,
      message,
      data: {},
    });
  }
}
