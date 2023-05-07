import { Component, Input} from '@angular/core';
import { Actividad } from '../../models/interfaces/actividades';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.css']
})
export class ActivityInfoComponent {
  @Input() actividad: Actividad = {} as Actividad;
  userReview: string = '';
  username: string = '';
  user$ = this.usersService.currentUserProfile$;
  userReviewForm: FormGroup = {} as FormGroup;
  isLoggedIn: boolean = false;
  subscription: Subscription = new Subscription();
  activitySaved: boolean = false;

  // Paginator Inputs
  pageSize = 5;
  pageSizeOptions: number[] = [5];

  constructor(private sanitizer: DomSanitizer, private toast: HotToastService, private usersService: UsersService, private fb: FormBuilder, private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if(user){
        this.username = user.displayName + ' ' + user.displaySurname;
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    });

    this.userReviewForm = this.fb.group({
      opinion: ['', Validators.required],
    });
  }  

  onSubmitReview(){
    const review = {
      username: this.username,
      opinion: this.userReviewForm.controls['opinion'].value
    };
    this.actividad.user_reviews.push(review); 
    this.firestore.updateActivity(this.actividad);
    this.toast.success('¡Gracias por tu opinión!');
    this.userReviewForm.reset();
  }

  showLoginMessage(){
    if(!this.isLoggedIn) {
      this.toast.info('Inicia sesión para dejar tu opinión');
    }
  }
  
  saveActivity() {
    this.subscription = this.user$.subscribe(user => {
      if (user) {
        if (!user.activities) {
          user.activities = [];
        }
        if (user.activities.some(activity => activity.id === this.actividad.id)) {
          this.toast.info('Ya has guardado esta actividad');
        } else {
          user.activities.push(this.actividad);
          this.usersService.updateUser(user);
          this.toast.success('Actividad guardada');
        }
        this.subscription.unsubscribe(); // cancela la suscripción después de guardar la actividad
      } else {
        this.toast.info('Inicia sesión para guardar la actividad');
      }
    });
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
