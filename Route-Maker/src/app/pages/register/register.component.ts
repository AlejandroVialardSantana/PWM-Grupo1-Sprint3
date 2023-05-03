import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { switchMap } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required ]),
    confirmPassword: new FormControl('', [Validators.required])
  },
    {validators: passwordsMatch() }
  )

  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private userService: UsersService
    ){}
  get name(){
    return this.signUpForm.get('name');
  }
  get surname(){
    return this.signUpForm.get('surname');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }

  submit(){
    const { name, surname, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !surname || !password || !email) {
      return;
    }

    this.authService
      .signUp(email, password).pipe(
        switchMap(({ user: { uid } }) => this.userService.addUser({ uid, email, displayName: name, displaySurname:surname})), 
        this.toast.observe({
          success: 'Registro correcto',
          loading: 'Registrando usuario...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}