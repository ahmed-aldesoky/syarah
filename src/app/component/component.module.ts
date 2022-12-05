import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import {SharedModule} from '../shared/shared.module'
import {TranslationModule} from '../translation.module';
import { MessageComponent } from './message/message.component';
import { TitleComponent } from './title/title.component';
import { NgToastModule } from 'ng-angular-popup'






@NgModule({
  declarations: [
    MainComponent,
    NotFoundComponent,
    ProductDetailsComponent,
    ProductComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    MessageComponent,
    TitleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslationModule,
    NgToastModule
    
  ]
,
  exports:[
    MessageComponent,
    TitleComponent,
    NgToastModule

  ]
  
})
export class ComponentModule { }
