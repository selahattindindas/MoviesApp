import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { List_Category } from 'src/app/contracts/category/list-category';
import { Observable, firstValueFrom } from 'rxjs';
import { JsonResponse } from 'src/app/contracts/response/response';
import { Update_Category } from 'src/app/contracts/category/update-category';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {

  constructor(private httpClientService: HttpClientService) { }

  async getAllCategories() {
    //Promise'teki stringler kalkacak. // YAPILDI
    const observable: Observable<JsonResponse<List_Category[]>> = this.httpClientService.get(
      { controller: 'Category', action: 'GetAllCategories' });

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async getCategoryById(id: number) {
    const observable: Observable<JsonResponse<List_Category>> = this.httpClientService.get(
      { controller: 'Category', action: 'GetByCategoryId' }, id);

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async createCategory(name: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable = this.httpClientService.post(
      {
        controller: 'Category',
        action: `CreateCategory?categoryName=${name}`
      }, name);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      }).catch(errorResponse => {
        errorCallBack(errorResponse);
      });
  }

  async updateCategory(category: Update_Category, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable = this.httpClientService.put(
      {
        controller: 'Category',
        action: 'UpdateCategory'
      }, category);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      });
  }

  async deleteCategory(id: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<JsonResponse<List_Category>> = this.httpClientService.delete(
      {
        controller: 'Category',
        action: 'DeleteCategory'
      }, id);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response.statusCode === 200 && response.result;
      }).catch(errorResponse => {
        errorCallBack(errorResponse);
      });
  }
}
