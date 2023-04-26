import { Component } from '@angular/core';

@Component({
  selector: 'app-destinies',
  templateUrl: './destinies.component.html',
  styleUrls: ['./destinies.component.css']
})
export class DestiniesComponent {
  region: string = "peninsula"; // establece la región por defecto
  carruselTitles = [
    {title: "Destinos en la Península", region: "peninsula"},
    {title: "Destinos en las Islas Canarias", region: "canarias"},
    {title: "Destinos en las Islas Baleares", region: "baleares"}
  ];
}
