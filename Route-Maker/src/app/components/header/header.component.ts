import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

const First_Mediaquery_Breakpoint = 910;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  user$ = this.usersService.currentUserProfile$;

  menuVisible = false;
  navLeft: any; //Lo iniciamos en default
  navRight: any;

  //Para controlar cuando un usuario se ha registrado y cambiar menu de usuario del header
  constructor(public authService: AuthenticationService, private router: Router, private usersService: UsersService){

  }

  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate([""]);
    });
  }
  /*
  Comprobamos si cuando comienza la ejecución la pantalla, el menu desplegable se esta mostrando o no para evitar problemas estéticos con el nav
  */
  ngOnInit(): void {
    if (window.innerWidth > First_Mediaquery_Breakpoint){ //ya que cuando utilizamos (max-width: 890px) en el css, estamos diciendo que se ejecute si la pantalla es <= 890px
      this.navLeft = null;
      this.navRight = '0';
    }else{
      this.navLeft = '-100%';
      this.navRight = null;
    }
  }

  menuBtnClicked(event: Event) {
    const target = event.target as HTMLInputElement;
    //const isChecked = target.checked;
    this.menuVisible = !this.menuVisible;

    this.hideOrShowHorizontalMenu(this.menuVisible);
  }

  private hideOrShowHorizontalMenu(isMenuVisible:boolean):void{
    if (isMenuVisible){
      this.navLeft = '0';
    }else{
      this.navLeft = '-100%';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > First_Mediaquery_Breakpoint){
      this.menuVisible = false; //Contraemos el menu, si se estaba mostrando
      this.navLeft = null;
      this.navRight = '0';
    }else{
      this.navRight = null;
      this.hideOrShowHorizontalMenu(this.menuVisible);
    }
  }

}
