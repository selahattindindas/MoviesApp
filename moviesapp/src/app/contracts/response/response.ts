export interface JsonResponse<T> {
    statusCode: number;
    result: T;
    statusMessage: T;
  }