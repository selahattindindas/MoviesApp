export class JsonResponse<T>
{
  statusCode: number;
  statusMessage: string;
  result: T;
}