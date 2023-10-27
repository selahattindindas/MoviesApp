import { Injectable } from '@angular/core';
import { CategoryDescription, CategoryEnum } from 'src/app/enums/category-enum';
import { HttpClientService } from '../http-client.service';
import { List_Category } from 'src/app/contracts/category/list-category';
import { Observable, firstValueFrom } from 'rxjs';
import { CancelButtonText, ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { SweetalertService } from '../../admin/sweetalert.service';
import { Router } from '@angular/router';
import { JsonResponse } from 'src/app/contracts/response/response';
import { MessageType } from 'src/app/enums/sweetalert-enum';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {

  constructor(private httpClientService: HttpClientService, private sweetAlertService: SweetalertService, private router: Router) { }
// boolean olarak al select kısmını // YAPILDI
  async getCategoryEnumValues(select?: boolean): Promise<{ value: CategoryEnum; description: string; }[]> {

    const enumValues = Object.keys(CategoryEnum)

      .filter((key) => typeof CategoryEnum[key as keyof typeof CategoryEnum] === 'number')
      .map((key) =>
      ({
        value: CategoryEnum[key as keyof typeof CategoryEnum],
        description: CategoryDescription[CategoryEnum[key as keyof typeof CategoryEnum]],
      }));

    return select === false
      ? enumValues.filter((item) => item.value !== CategoryEnum.Seciniz)
      : enumValues;
  }

  async getAllCategories(){
    //Promise'teki stringler kalkacak. // YAPILDI
    const observable: Observable<JsonResponse<List_Category[]>> = this.httpClientService.get(
      { controller: 'Category', action: 'GetAllCategories' });

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async getCategoryById(id: number){
    const observable: Observable<JsonResponse<List_Category>> = this.httpClientService.get(
      { controller: 'Category', action: 'GetByCategoryId' }, id);

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async createCategory(categoryName: unknown) {
    const observable: Observable<JsonResponse<unknown>> = this.httpClientService.post(
      {
        controller: 'Category',
        action: `CreateCategory?categoryName=${categoryName}`
      }, categoryName);

    const response = await firstValueFrom(observable);

    if (response.statusCode === 200) {
      this.sweetAlertService.showAlert({
        messageTitle: MessageTitle.Success,
        messageText: MessageText.CategoryCreate,
        icon: MessageType.Success,
        confirmButtonText: ConfirmButtonText.Okey,
        delay: 1
      });
      return response.result;
    } else {
      return response.statusMessage;
    }
    //hata yönetimi gerçekleşecek.
  }

  async updateCategory(name: unknown) {
    //stringe çekilecek
    // update'de ki gibi olsun create'de
    const observable: Observable<unknown> = this.httpClientService.put(
      {
        controller: 'Category',
        action: 'UpdateCategory'
      }, name);

    const data = await firstValueFrom(observable);

    this.sweetAlertService.showAlert({
      messageTitle: MessageTitle.Success,
      messageText: MessageText.CategoryUpdate,
      icon: MessageType.Success,
      confirmButtonText: ConfirmButtonText.Okey,
      delay: 1
    });

    this.router.navigate(['/Admin', 'Class-List']);

    return data;
  }

  async deleteCategory(id: number) {
    const sweetalert = await this.sweetAlertService.showAlert({
        messageTitle: MessageTitle.DeletedQuestion,
        messageText: MessageText.NoTurningBack,
        icon: MessageType.Warning,
        showCancelButton: true,
        confirmButtonText: ConfirmButtonText.Okey,
        cancelButtonText: CancelButtonText.Cancel,
      });

    if (sweetalert.isConfirmed) {
      await firstValueFrom(this.httpClientService.delete(
        {
          controller: 'Category',
          action: 'DeleteCategory'
        }, id));

        this.sweetAlertService.showAlert({
          messageTitle: MessageTitle.Success,
          messageText: MessageText.CategoryDelete,
          icon: MessageType.Success,
          confirmButtonText: ConfirmButtonText.Okey,
          delay: 1
        });
    }
  }
}
//Buradaki değişikliklerin hepsi platform'da da olacak.