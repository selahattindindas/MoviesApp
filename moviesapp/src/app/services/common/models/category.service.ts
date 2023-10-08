import { Injectable } from '@angular/core';
import { CategoryDescription, CategoryEnum } from 'src/app/enums/category-enum';
import { HttpClientService } from '../http-client.service';
import { Create_Category } from 'src/app/contracts/category/create-category';
import { List_Category } from 'src/app/contracts/category/list-category';
import { Observable, firstValueFrom } from 'rxjs';
import { Update_Category } from 'src/app/contracts/category/update-category';
import { CancelButtonText, ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { SweetalertService, icon } from '../../admin/sweetalert.service';
import { Router } from '@angular/router';
import { JsonResponse } from 'src/app/contracts/response/response';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(private httpClientService: HttpClientService, private sweetalertService: SweetalertService, private router: Router) { }

  getCategoryEnumValues(select?: string): { value: CategoryEnum; description: string }[] {
    const enumValues = Object.keys(CategoryEnum)
      .filter((key) => typeof CategoryEnum[key as keyof typeof CategoryEnum] === 'number')
      .map((key) => ({
        value: CategoryEnum[key as keyof typeof CategoryEnum],
        description: CategoryDescription[CategoryEnum[key as keyof typeof CategoryEnum]],
      }));

    return select === CategoryEnum.Seciniz.toString()
      ? enumValues.filter((item) => item.value !== CategoryEnum.Seciniz)
      : enumValues;
  }

  async getAllCategories(): Promise<List_Category[]> {
    const observable: Observable<JsonResponse<List_Category[]>> = this.httpClientService.get(
      { controller: 'Category', action: 'GetAllCategories' });

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async getCategoryById(id: string): Promise<List_Category> {
    const observable: Observable<JsonResponse<List_Category>> =
      this.httpClientService.get({ controller: 'Category', action: 'GetByCategoryId' }, id);

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async createCategory(category: Create_Category) {
    const observable: Observable<Create_Category> = this.httpClientService.post<Create_Category>(
      { controller: 'Category', action: 'CreateCategory' }, category);
    const data = await firstValueFrom(observable);
    this.sweetalertService.showAlert(
      MessageTitle.Success, MessageText.CategoryCreate, icon.Success, false, ConfirmButtonText.Okey, 3);
    this.router.navigate(['/Admin', 'Class-List']);
    return data;
  }

  async updateCategory(category: Update_Category, id: string, name: string) {
    const observable: Observable<Update_Category> = this.httpClientService.put<Update_Category>(
      { controller: 'Category', action: `UpdateCategory/${id}`, queryString: `categoryName=${name}` }, category);

    const data = await firstValueFrom(observable);

    this.sweetalertService.showAlert(
      MessageTitle.Success, MessageText.CategoryUpdate, icon.Success, false, ConfirmButtonText.Okey, 3);
    this.router.navigate(['/Admin', 'Class-List']);
    return data;
  }

  async deleteCategory(id: string) {
    const sweetalert = await this.sweetalertService.showAlert(
      MessageTitle.DeletedQuestion, MessageText.NoTurningBack, icon.Warning, true, ConfirmButtonText.Okey, undefined, CancelButtonText.Cancel);

    if (sweetalert.isConfirmed) {
      await firstValueFrom(this.httpClientService.delete({ controller: 'Category', action: 'DeleteCategory' }, id));
      this.sweetalertService.showAlert(
        MessageTitle.Success, MessageText.CategoryDelete, icon.Success, false, ConfirmButtonText.Okey, 3)
    }
  }

}
