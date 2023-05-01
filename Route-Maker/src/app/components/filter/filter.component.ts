import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent {
  @Output() filterChange = new EventEmitter<any>();

  duration = 1;
  maxCost = 50;
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

  
  // Funciones para emitir eventos cuando cambia un valor
  onDurationChange() {
    this.filterChange.emit({ type: 'duration', value: this.duration });
  }

  onMaxCostChange() {
    this.filterChange.emit({ type: 'maxCost', value: this.maxCost });
  }
  
  onActivityTypeChange(type: {value: string, viewValue: string, checked: boolean}) {
    this.filterChange.emit({ type: 'activityType', value: type.viewValue, isActive: type.checked ? 1 : 0 });
  }
  
  onSpecificNeedChange(need: {value: string, viewValue: string, checked: boolean}) {
    this.filterChange.emit({ type: 'specificNeed', value: need.viewValue, isActive: need.checked ? 1 : 0 });
  }

}

