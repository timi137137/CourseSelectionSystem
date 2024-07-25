import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { DataSource, QueryRunner } from 'typeorm';

export function transformJson(
  content: unknown | string,
  replacer?: (this: any, key: string, value: any) => any,
) {
  return JSON.stringify(content, replacer, 4);
}

// 事务流程
export async function transaction(
  dataSource: DataSource,
  logger: Logger,
  callback: (queryRunner: QueryRunner) => Promise<void>,
) {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction(); // 启动事务流程

  try {
    await callback(queryRunner);

    await queryRunner.commitTransaction();

    return true;
  } catch (err) {
    // 出问题直接回滚
    await queryRunner.rollbackTransaction();
    logger.error(err.message, err.stack);
    return false;
  } finally {
    // 释放连接
    await queryRunner.release();
  }
}

// 包装请求
export async function request(http: HttpService, config: AxiosRequestConfig) {
  return http.request(config);
}

export async function reportToWechat(
  http: HttpService,
  key: string,
  content: string,
) {
  return request(http, {
    url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${key}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      msgtype: 'markdown',
      markdown: {
        content,
      },
    },
  });
}
