import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-account-managment',
  templateUrl: './account-managment.component.html',
  styleUrls: ['./account-managment.component.css']
})
export class AccountManagmentComponent implements OnInit{

  user$ = this.usersService.currentUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    displaySurname: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl('')
    });

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService
    ) { }

  ngOnInit(): void {
    
  }
}
