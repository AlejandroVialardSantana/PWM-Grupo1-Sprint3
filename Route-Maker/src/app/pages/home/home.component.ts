import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  carruselTitles = [
    {title: "Destinos destacados"},
    {title: "Destinos más populares"},
    {title: "Destinos más baratos"}
  ];
}
