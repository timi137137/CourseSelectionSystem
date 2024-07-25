import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { transformJson } from '../utils/tools';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const QueryParams = request.query;

    // 向日志中写入请求信息
    this.logger.log(
      `Request: ${request.originalUrl} - Method: ${request.method}`,
    );
    this.logger.verbose(
      `Method: ${request.method}\n\tRequest original url: ${
        request.originalUrl
      }\n\tIP: None IP\n\tParams: ${
        transformJson(request.params) ?? 'None Params'
      }\n\tQuery: ${transformJson(request.query) ?? 'None Query'}\n\tBody: ${
        transformJson(request.body) ?? 'None Body'
      }\n\tData: ${transformJson(request.data) ?? 'None Data'}`,
    );

    const Result: { code: number; message: string | undefined; data: any} = {
      code: 0,
      message: 'Successful',
      data: undefined,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return next.handle().pipe(
      map(async (Data) => {
        // 如果是文件流，直接返回
        if (Data instanceof StreamableFile) return Data;

        Result.data = Data;
        return Result;
      }),
    );
  }
}
