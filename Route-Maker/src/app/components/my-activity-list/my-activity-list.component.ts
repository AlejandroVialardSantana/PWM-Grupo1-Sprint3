import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Actividad } from '../../models/interfaces/actividades';

@Component({
  selector: 'app-my-activity-list',
  templateUrl: './my-activity-list.component.html',
  styleUrls: ['./my-activity-list.component.css']
})
export class MyActivityListComponent {

  activities: Actividad[] = [];
  user$ = this.usersService.currentUserProfile$;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if(user){
        this.activities = user.activities || [];
      }
    });
  }
}
