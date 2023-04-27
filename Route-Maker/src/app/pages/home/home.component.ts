import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  category: string = "";
  carruselTitles = [
    {title: "Actividades destacadas", category: "destacado"},
    {title: "Actividades al aire libre", category: "aire libre"},
    {title: "Destinos de playa", category: "playa"},
  ];
}