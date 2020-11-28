import { Injectable, ErrorHandler} from '@angular/core'
import * as Sentry from '@sentry/browser'
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {

  constructor() {
    Sentry.init({
      dsn: "https://5a676731265847d29a9b5c879ac86325@o483856.ingest.sentry.io/5536316",
      environment: 'production'
    })
  }

  handleError(error) {
    Sentry.captureException(error.originalError || error)
  }
}

export function getErrorHandler(): ErrorHandler {
  if (environment.production) {
    return new SentryErrorHandler()
  }
  return new ErrorHandler()
}
