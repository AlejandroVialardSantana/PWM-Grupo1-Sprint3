import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Actividad } from '../../models/interfaces/actividades';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity-description',
  templateUrl: './activity-description.component.html',
  styleUrls: ['./activity-description.component.css']
})
export class ActivityDescriptionComponent implements OnInit, OnDestroy {
  actividad: Actividad = {} as Actividad;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    
    this.subscription = this.firestoreService.getActivityByID(id).subscribe(activity => {
      this.actividad = activity;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
