import { Component, OnInit } from '@angular/core';
import { OpenOverlayService } from 'src/app/services/open-overlay.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import { ProfileUser } from 'src/app/models/user-profile';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { HotToastService } from '@ngneat/hot-toast';

export function FBpasswordsMatch(user: ProfileUser): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fbPassword = user.password;
    const password = control.get('password')?.value;
    if (fbPassword && password && fbPassword !== password) {
      return {
        passwordsDontMatch: true,
      };
    }
    return null;
  };
}
export function passwordsMatch(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('repeatPassword')?.value;
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return {
        passwordsDontMatch: true,
      };
    }
    return null;
  };
}
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  constructor(
    public openOverlayService: OpenOverlayService,
    private usersService: UsersService,
    private authService: AuthenticationService,
    private toast: HotToastService
  ) {}

  changePasswordForm = new FormGroup(
    {
      Password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
      ]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
    { validators: [passwordsMatch()] }
  );

  get password() {
    return this.changePasswordForm.get('Password');
  }
  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }
  get repeatPassword() {
    return this.changePasswordForm.get('repeatPassword');
  }

  ngOnInit(): void {}

  async changePassword(user: ProfileUser, form: FormGroup) {
    const repeatPassword = form.get('repeatPassword')?.value;
    const userfb = firebase.auth().currentUser;
    const currentPassword = this.password?.value;
    if (!form.valid || !repeatPassword) {
      return;
    }

    try {
      if ( !userfb || !userfb.providerData || !userfb.email || !currentPassword  ) {
        return;
      }
      // Reautenticar al usuario
      const credential = firebase.auth.EmailAuthProvider.credential( userfb.email, currentPassword );
      await firebase.auth().currentUser?.reauthenticateWithCredential(credential).then(() => {
          this.toast.success('Contraseña actualizada correctamente');
          this.usersService.changePassword(user);
          this.authService.updatePassword(repeatPassword);
          this.usersService.updateUser(user);
        })
        .catch((error) => {
          this.toast.error('Contraseña actual incorrecta');
          console.log(error);
        });
        this.openOverlayService.showChangePassword = false;

      // Actualizar la contraseña en Firebase Authentication
    } catch (error) {
      console.log(error);
    }
  }
}
