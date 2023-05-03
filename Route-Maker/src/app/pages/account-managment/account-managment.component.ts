import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileUser } from 'src/app/models/user-profile';
import { UsersService } from 'src/app/services/users.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
    private imageUpload: ImageUploadService,
    private usersService: UsersService,
    private toast: HotToastService
    ) { }

  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }
  uploadFile(event: any, { uid }: ProfileUser) {
    this.imageUpload
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        switchMap((photoURL) =>
          this.usersService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }
  /*saveProfile() {
    const profileData = this.profileForm.value;
    this.usersService.updateUser(profileData).pipe(
      this.toast.observe({
        loading: "Guardando datos...",
        success: "Datos guardados", 
        error: "Error: No se ha podido actualizar los datos"
      })
    ).subscribe();
  }*/
}
