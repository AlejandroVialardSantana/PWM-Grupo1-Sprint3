import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {

  @Input() barTitle:string = "¿Cuál es tu destino?";
  @Input() barPlaceHolder:string = "Escribe tu destino...";

  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  actualSearchText:string = "";

  constructor() { }

  onSubmit():void {
    this.onSearch.emit( { type: 'search', value: this.actualSearchText } );
  }

}


/* 
Si lo queremos hacer con elementos nativos de HTML
  
import { Component, ViewChild, ElementRef } from '@angular/core';

export class MyComponent {
  @ViewChild('myInput') myInput: ElementRef;

  onSubmit(value: string) {
    // Hacer algo con el valor obtenido
    console.log(value);

    // Resetear el valor del input
    this.myInput.nativeElement.value = '';
    this.myInput.nativeElement.focus();
  }
}
*/