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


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClientService:HttpClientService, private sweetalertService:SweetalertService, private router:Router) {}
  getCategoryEnumValues(): CategoryEnum[] {
    const enumValues = Object.values(CategoryEnum) as CategoryEnum[];
    return enumValues.filter((value) => typeof value === 'number');
  }
  getCategoryDescriptions(): { [key in number]: string } {
    return CategoryDescription;
  }
  async post(category: Create_Category, name:string){
    const observable: Observable<Create_Category>=this.httpClientService.post<Create_Category>(
      {controller:'Category', action:'CreateCategory', queryString:`categoryName=${name}`},category);
    const data = await firstValueFrom(observable);
    this.sweetalertService.showAlert(
      MessageTitle.Success, MessageText.CategoryCreate,icon.Success,false,ConfirmButtonText.Okey,3);
      this.router.navigate(['/Admin', 'Class-List']);
      return data;
    }
  async get():Promise<List_Category[]> {
    const observable :Observable<any> = this.httpClientService.get(
      {controller: 'Category', action:'GetAllCategories'});
    const response = await firstValueFrom(observable);
    if(response.statusCode === 200){
      console.log(response.statusMessage);
      return response.result;
    }else {
      throw new Error(`${response.statusCode}`);
    }
  }
  async getCategoryId(id: string): Promise<List_Category> {
    const observable: Observable<any> =
      this.httpClientService.get({controller: 'Category',action:'GetByCategoryId'},id);
    const response = await firstValueFrom(observable);
    if(response.statusCode === 200){
      console.log(response.statusMessage);
      return response.result;
    }else {
      throw new Error(`${response.statusCode}`);
    }
  }
  async delete(id:string){
    const  sweetalert = await this.sweetalertService.showAlert(
      MessageTitle.Deleted,MessageText.DeleteWarning,icon.Warning,true,ConfirmButtonText.Okey,undefined,CancelButtonText.Cancel);
    if(sweetalert && sweetalert.isConfirmed){
      await firstValueFrom(this.httpClientService.delete<any>({controller:'Category', action:'DeleteCategory'},id));
      this.sweetalertService.showAlert(
        MessageTitle.Success,MessageText.CategoryDelete,icon.Success,false,ConfirmButtonText.Okey,3)
    }
  }
  async put(category:Update_Category,id:string, name:string){
    const observable: Observable<Update_Category> = this.httpClientService.put<Update_Category>(
      {controller:'Category', action:`UpdateCategory/${id}`, queryString:`categoryName=${name}`},category);
      const data = await firstValueFrom(observable);
      this.sweetalertService.showAlert(
        MessageTitle.Success,MessageText.CategoryUpdate,icon.Success,false,ConfirmButtonText.Okey,3);
        this.router.navigate(['/Admin', 'Class-List']);
        return data;
    }
}
