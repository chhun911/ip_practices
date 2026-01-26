import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    
    // Check if this is a GraphQL request
    const contextType = context.getType<string>();
    
    if (contextType === 'graphql') {
      // Handle GraphQL context
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      const operationType = info.parentType.name; // Query, Mutation, Subscription
      const fieldName = info.fieldName;
      
      return next.handle().pipe(
        tap(() => {
          const ms = Date.now() - start;
          console.log(`[GraphQL] ${operationType}.${fieldName} - ${ms}ms`);
        }),
      );
    } else {
      // Handle HTTP context
      const req = context.switchToHttp().getRequest();
      if (req) {
        const { method, url } = req;
        return next.handle().pipe(
          tap(() => {
            const ms = Date.now() - start;
            console.log(`[HTTP] ${method} ${url} - ${ms}ms`);
          }),
        );
      }
    }

    // Fallback for other context types
    return next.handle();
  }
}
