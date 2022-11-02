import { HttpAdapterHost } from "@nestjs/core";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { NotFoundException as NotFoundExceptionCustom } from "../adapter/exception/not.found.exception";
import { NotAvailableException } from "../adapter/exception/not.available.exception";
import { BusinessException } from "../application/exception/business.exception";
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof NotFoundException || exception instanceof NotFoundExceptionCustom
        ? HttpStatus.NOT_FOUND :
        exception instanceof NotAvailableException
          ? HttpStatus.SERVICE_UNAVAILABLE :
          exception instanceof BusinessException
            ? HttpStatus.CONFLICT
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      description: exception?.description,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}