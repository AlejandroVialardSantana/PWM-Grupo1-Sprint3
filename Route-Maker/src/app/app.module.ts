import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponentComponent } from './components/footer/footer-component.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AboutUsContentComponent } from './components/about-us-content/about-us-content.component';
import { DestiniesComponent } from './pages/destinies/destinies.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountManagmentComponent } from './pages/account-managment/account-managment.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponentComponent,
    HomeComponent,
    HeaderComponent,
    CarruselComponent,
    SearchbarComponent,
    AboutUsComponent,
    AboutUsContentComponent,
    DestiniesComponent,
    LoginComponent,
    RegisterComponent,
    AccountManagmentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SwiperModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    HotToastModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }