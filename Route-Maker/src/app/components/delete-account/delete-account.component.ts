import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OpenOverlayService } from 'src/app/services/open-overlay.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$;

  constructor(
    public openOverlayService: OpenOverlayService,
    private usersService: UsersService,
    private authService: AuthenticationService,
    private router: Router
    ){}

  ngOnInit(): void {

  }

  
  deleteAccount(user: ProfileUser) {   
    getAuth().currentUser?.delete().then(() => {
      this.usersService.deleteUser(user).subscribe();
      this.authService.logout().subscribe(() => {
        this.router.navigate([""]);
      });
    });
  }
    

}
