import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

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
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'aboutUs', component: AboutUsComponent },
      { path: 'destinies', component: DestiniesComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'AccountManagement', component: AccountManagmentComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }