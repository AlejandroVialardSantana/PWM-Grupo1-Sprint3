import { Component } from '@angular/core';

@Component({
  selector: 'app-destinies',
  templateUrl: './destinies.component.html',
  styleUrls: ['./destinies.component.css']
})
export class DestiniesComponent {
  carruselTitles = [
    {title: "Destinos en la Península"},
    {title: "Destinos en las Islas Canarias"},
    {title: "Destinos en las Islas Baleares"}
  ];
}
