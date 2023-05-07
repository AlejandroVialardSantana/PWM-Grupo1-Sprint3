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
    const name = this.route.snapshot.queryParamMap.get('name');
    const city = this.route.snapshot.queryParamMap.get('location');
    
    this.subscription = this.firestoreService.getActivities().subscribe(actividades => {
      const actividadEncontrada = actividades.find(actividad => actividad.name === name && actividad.city === city);
      if (actividadEncontrada) {
        this.actividad = actividadEncontrada;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
