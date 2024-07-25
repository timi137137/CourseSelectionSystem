import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { getClientIp } from '@supercharge/request-ip';
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
    const ip = getClientIp(request);

    // 向日志中写入请求信息
    this.logger.log(
      `Request: ${request.originalUrl} - Method: ${request.method} - IP: ${ip}`,
    );
    this.logger.verbose(
      `Method: ${request.method}\n\tRequest original url: ${
        request.originalUrl
      }\n\tIP: ${ip ?? 'None IP'}\n\tParams: ${
        transformJson(request.params) ?? 'None Params'
      }\n\tQuery: ${transformJson(request.query) ?? 'None Query'}\n\tBody: ${
        transformJson(request.body) ?? 'None Body'
      }\n\tData: ${transformJson(request.data) ?? 'None Data'}`,
    );

    const Result = {
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

        if (
          QueryParams.lowercase !== undefined &&
          QueryParams.lowercase === 'y'
        ) {
          Result.data = await this.ForEachKey(Data);
        } else {
          Result.data = Data;
        }

        return Result;
      }),
    );
  }

  // 遍历对象的key，将key转换为小写
  ForEachKey(Data: T) {
    return new Promise<any>(async (resolve) => {
      if (!(Data instanceof Object)) {
        this.logger.warn(
          'The data is not a valid object type, but it calls the lowercase method and has returned the original value',
        );
        resolve(Data);
        return;
      }

      const Keys = Object.keys(Data);
      for (const Key of Keys) {
        const Sec = Data[Key];
        const LowerKey = Key.toLowerCase();
        if (typeof Sec === 'object' && Sec !== null) {
          Data[Key] = await this.ForEachKey(Sec);
        }

        Data[LowerKey] = Data[Key];
        delete Data[Key];
      }
      resolve(Data);
    });
  }
}
