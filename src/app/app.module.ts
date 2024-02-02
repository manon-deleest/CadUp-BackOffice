import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './core/nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FirestoreModule } from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './pages/login/login.component';
import  { AuthenticationService } from './services/authentication.service';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { HomeComponent } from './pages/home/home.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { DepartmentFormComponent } from './pages/department-form/department-form.component';
import { DatatableComponent } from './shareds/datatable/datatable.component';
import { DepartmentsTypesComponent } from './pages/departments-types/departments-types.component';
import { DepartmentTypeFormComponent } from './pages/department-type-form/department-type-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { FirebaseStorage } from '@angular/fire/storage';
import { GoBackComponent } from './shareds/go-back/go-back.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    ForgotPasswordComponent,
    LoadingComponent,
    HomeComponent,
    AdministrationComponent,
    DepartmentFormComponent,
    DatatableComponent,
    DepartmentsTypesComponent,
    DepartmentTypeFormComponent,
    ProductsComponent,
    ProductFormComponent,
    GoBackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    NoopAnimationsModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()), 
    provideAuth(() => getAuth()),
    FirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
