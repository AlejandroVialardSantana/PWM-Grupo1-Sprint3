import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent {
  duration = 1;
  maxCost = 10;
  activityTypes = [
    {value: '1', viewValue: 'Al aire libre', checked: false},
    {value: '2', viewValue: 'Deportiva', checked: false},
    {value: '3', viewValue: 'Cultural', checked: false},
    {value: '4', viewValue: 'Espectáculo', checked: false},
    {value: '5', viewValue: 'Gastronómica', checked: false},
    {value: '6', viewValue: 'Ocio', checked: false},
    {value: '7', viewValue: 'Relajante', checked: false}
  ];
  specificNeeds = [
    {value: '1', viewValue: 'Apto para niños', checked: false},
    {value: '2', viewValue: 'Apto para mascotas', checked: false},
    {value: '3', viewValue: 'Apto para minusválidos', checked: false}
  ];
}

