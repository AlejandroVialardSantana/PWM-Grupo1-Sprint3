import { Component, OnInit } from '@angular/core';
import { OpenOverlayService } from 'src/app/services/open-overlay.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { switchMap } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { user } from '@angular/fire/auth';

export function passwordsMatch(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword){
      return {
        passwordsDontMatch: true
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  user$ = this.usersService.currentUserProfile$;

  constructor(
    public openOverlayService: OpenOverlayService,
    private usersService: UsersService,
    private authService: AuthenticationService
    ){}

  changePasswordForm = new FormGroup({
    Password: new FormControl('', [Validators.required ]),
    newPassword: new FormControl('', [Validators.minLength(8), Validators.required ]),
    repeatPassword: new FormControl('', [Validators.required])
  },
    { validators: passwordsMatch() }
  )

  get password(){
    return this.changePasswordForm.get('Password');
  }
  get newPassword(){
    return this.changePasswordForm.get('newPassword');
  }
  get repeatPassword(){
    return this.changePasswordForm.get('repeatPassword');
  }

  ngOnInit(): void {

  }

}
