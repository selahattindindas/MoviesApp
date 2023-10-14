import { Injectable } from '@angular/core';
import { CategoryDescription, CategoryEnum } from 'src/app/enums/category-enum';
import { HttpClientService } from '../http-client.service';
import { List_Category } from 'src/app/contracts/category/list-category';
import { Observable, firstValueFrom } from 'rxjs';
import { CancelButtonText, ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { SweetalertService, icon } from '../../admin/sweetalert.service';
import { Router } from '@angular/router';
import { JsonResponse } from 'src/app/contracts/response/response';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {

  constructor(private httpClientService: HttpClientService, private sweetalertService: SweetalertService, private router: Router) { }

  async getCategoryEnumValues(select?: string): Promise<{ value: CategoryEnum; description: string; }[]> {

    const enumValues = Object.keys(CategoryEnum)

      .filter((key) => typeof CategoryEnum[key as keyof typeof CategoryEnum] === 'number')
      .map((key) =>
      ({
        value: CategoryEnum[key as keyof typeof CategoryEnum],
        description: CategoryDescription[CategoryEnum[key as keyof typeof CategoryEnum]],
      }));

    return select === CategoryEnum.Seciniz.toString()
      ? enumValues.filter((item) => item.value !== CategoryEnum.Seciniz)
      : enumValues;
  }

  async getAllCategories(): Promise<List_Category[] | string> {
    const observable: Observable<JsonResponse<List_Category[]>> = this.httpClientService.get(
      { controller: 'Category', action: 'GetAllCategories' });

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async getCategoryById(id: string): Promise<List_Category | string> {
    const observable: Observable<JsonResponse<List_Category>> = this.httpClientService.get(
      { controller: 'Category', action: 'GetByCategoryId' }, id);

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async createCategory(categoryName: string): Promise<string> {
    const observable: Observable<JsonResponse<string>> = this.httpClientService.post(
      {
        controller: 'Category',
        action: `CreateCategory?categoryName=${categoryName}`
      }, null);

    const response = await firstValueFrom(observable);

    if (response.statusCode === 200) {
      this.sweetalertService.showAlert(
        MessageTitle.Success,
        MessageText.CategoryCreate,
        icon.Success,
        false,
        ConfirmButtonText.Okey,
        3
      );
      return response.result;
    } else {
      return response.statusMessage;
    }
    //hata yönetimi gerçekleşecek.
  }

  async updateCategory(name: unknown) {
    const observable: Observable<unknown> = this.httpClientService.put(
      {
        controller: 'Category',
        action: 'UpdateCategory'
      }, name);

    const data = await firstValueFrom(observable);

    this.sweetalertService.showAlert(
      MessageTitle.Success,
      MessageText.CategoryUpdate,
      icon.Success,
      false,
      ConfirmButtonText.Okey,
      3);

    this.router.navigate(['/Admin', 'Class-List']);

    return data;
  }

  async deleteCategory(id: string) {
    const sweetalert = await this.sweetalertService.showAlert(
      MessageTitle.DeletedQuestion,
      MessageText.NoTurningBack,
      icon.Warning,
      true,
      ConfirmButtonText.Okey,
      undefined,
      CancelButtonText.Cancel);

    if (sweetalert.isConfirmed) {
      await firstValueFrom(this.httpClientService.delete(
        {
          controller: 'Category',
          action: 'DeleteCategory'
        }, id));

      this.sweetalertService.showAlert(
        MessageTitle.Success,
        MessageText.CategoryDelete,
        icon.Success, false,
        ConfirmButtonText.Okey,
        3);
    }
  }
}
