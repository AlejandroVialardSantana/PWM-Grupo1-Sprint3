import { Component, Input, OnInit} from '@angular/core';
import { Actividad } from '../../models/interfaces/actividades';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.css']
})
export class ActivityInfoComponent {
  @Input() actividad: Actividad = {} as Actividad;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    
  }  

  public sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
