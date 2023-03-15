import { Middleware, MiddlewareAPI } from 'redux';
import {
    BadRequestError,
    InternalError,
    NotFoundError,
    UnauthorizedError,
} from '@/api';

/* error code */
const BAD_REQUEST_ERROR = 400;
const UNAUTHORISED_ERROR = 401;
const NOT_FOUND_ERROR = 404;
const INTERNAL_ERROR = 500;

const ERROR_STATUS: { [key: number]: string } = {
    401: 'unauthorized',
    400: 'bad request',
    404: 'not found',
    500: 'internal server error',
};

/* Throws error according to status */
export const handleError = (errorStatus: string) => {
    switch (errorStatus?.toLocaleLowerCase()) {
    case ERROR_STATUS[BAD_REQUEST_ERROR]:
        throw new BadRequestError(errorStatus);
    case ERROR_STATUS[NOT_FOUND_ERROR]:
        throw new NotFoundError(errorStatus);
    case ERROR_STATUS[UNAUTHORISED_ERROR]:
        throw new UnauthorizedError(errorStatus);
    case ERROR_STATUS[INTERNAL_ERROR]:
    default: throw new InternalError(errorStatus);
    }
};

/** Handle action error middleware */
export const handleErrorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
      if (action.error) {
          handleError(action.error.message);
      } else {
          next(action);
      }
  };
