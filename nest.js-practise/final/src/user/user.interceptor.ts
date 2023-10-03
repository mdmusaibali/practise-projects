import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        // if (response?.password) response.password = undefined;
        // if (response?.tokens) response.tokens = undefined;
        // if (response?.roles) response.roles = undefined;
        // if (response?.__v) response.__v = undefined;
        // manipulate response here
        return response;
      }),
      catchError((err) => {
        console.log(
          'err caught in interceptor, you can log it in logger or send it to newrelic or similar',
          err,
        );
        throw err; // throwing it for client
      }),
    );
  }
}
