import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Actividad } from '../../models/interfaces/actividades';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-activity-list',
  templateUrl: './my-activity-list.component.html',
  styleUrls: ['./my-activity-list.component.css']
})
export class MyActivityListComponent {

  activities: Actividad[] = [];
  user$ = this.usersService.currentUserProfile$;
  showMap: boolean[] = [];
  subscription: Subscription = new Subscription();
  
  // Paginator Inputs
  pageSize = 5;
  pageSizeOptions: number[] = [5];
  paginatedActivities: Actividad[] = [];
  pageIndex = 0;
  startIndex = 0;

  constructor(private usersService: UsersService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if(user){
        this.activities = user.activities || [];
        this.paginateActivities();
      }
    });
  }
  
  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  paginateActivities(event?: PageEvent): void {
    this.pageIndex = event ? event.pageIndex : 0;
    this.startIndex = this.pageIndex * this.pageSize;
    this.paginatedActivities = this.activities.slice(this.startIndex, this.startIndex + this.pageSize);
  }

  removeActivity(index: number): void {
    const confirmation = confirm('¿Está seguro de que desea eliminar esta actividad?');
    if (confirmation) {
      const activityIndex = this.startIndex + index;
      this.subscription = this.user$.subscribe(user => {
        if(user){
          user.activities?.splice(activityIndex, 1);
          this.usersService.updateUser(user);
          this.activities = user.activities || [];
          this.paginateActivities();
        }
        this.subscription.unsubscribe();
      });
    }
  } 
}