import { Injectable } from '@angular/core';
import { CategoryDescription, CategoryEnum } from 'src/app/enums/category-enum';
import { HttpClientService } from '../http-client.service';
import { Create_Category } from 'src/app/contracts/category/create-category';
import { List_Category } from 'src/app/contracts/category/list-category';
import { Observable, firstValueFrom } from 'rxjs';
import { Update_Category } from 'src/app/contracts/category/update-category';
import { CancelButtonText, ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { SweetalertService, icon } from '../../admin/sweetalert.service';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClientService:HttpClientService, private sweetalertService:SweetalertService) {}
  getCategoryEnumValues(): CategoryEnum[] {
    const enumValues = Object.values(CategoryEnum) as CategoryEnum[];
    return enumValues.filter((value) => typeof value === 'number');
  }
  getCategoryDescriptions(): { [key in number]: string } {
    return CategoryDescription;
  }
  async post(category: Create_Category){
    this.httpClientService.post({
      controller:'Category'
    },category).subscribe(()=>{
      this.sweetalertService.showAlert(
        MessageTitle.Success,
        MessageText.CategoryCreate,
        icon.Success,
        false,
        ConfirmButtonText.Okey,
        3
      );
    })
  }
  async get():Promise<Partial<List_Category[]>> {
    const observable :Observable<List_Category[]> = this.httpClientService.get
    <List_Category[]>({
      controller: 'Category'
    });
    const data = await firstValueFrom(observable);
    return data;
  }
  async getCategoryId(id: string): Promise<Partial<List_Category>> {
    const observable: Observable<List_Category> =
      this.httpClientService.get<List_Category>(
        {
          controller: 'Category',
        },
        id
      );
    const data = await firstValueFrom(observable);
    console.log(data);
    return data;
  }
  async delete(id:string){
    const  sweetalert = await this.sweetalertService.showAlert(
      MessageTitle.Deleted,
      MessageText.DeleteWarning,
      icon.Warning,
      true,
      ConfirmButtonText.Okey,
      undefined,
      CancelButtonText.Cancel
    );
    if(sweetalert && sweetalert.isConfirmed){
      await firstValueFrom(
        this.httpClientService.delete<any>({controller:'Category'},id)
      );
      this.sweetalertService.showAlert(MessageTitle.Success,
        MessageText.CategoryDelete,
        icon.Success,
        false,
        ConfirmButtonText.Okey,
        3)
    }
  }
  async put(category:Update_Category,id:string){
    this.httpClientService.put({
      controller:'Category',
      action: id
    }, category).subscribe(()=>{
      this.sweetalertService.showAlert(
        MessageTitle.Success,
        MessageText.CategoryUpdate,
        icon.Success,
        false,
        ConfirmButtonText.Okey,
        3
      );
    })
  }
}
