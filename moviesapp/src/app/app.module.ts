import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiRoutingModule } from './ui/ui-routings.module';
import { UiModules } from './ui/ui-module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/component/component.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AdminRouting } from './admin/admin-routing.module';
import { environment } from './environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiRoutingModule,
    UiModules,
    AdminModule,
    AdminRouting,
    HttpClientModule,
    RouterModule, 
    FormsModule,
    SweetAlert2Module,

  ],
  providers: [
    { provide: 'baseUrl', useValue: environment.apiUrl, multi: true },
  ],
 
  bootstrap: [AppComponent],
})
export class AppModule { }
