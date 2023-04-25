import { Component } from '@angular/core';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, SwiperOptions, Swiper} from 'swiper';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

interface Destino {
  name: string;
  stars: number;
  image: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  destinos: any;

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  ngOnInit() {
    //this.http.get<any>('../assets/destinos.json').subscribe(data => {
    //  this.destinos = data;
    //  this.exportDataToFirestore();
    // });
  }

  exportDataToFirestore() {
    const destinosCollectionRef = this.firestore.collection('destinos');
    Object.keys(this.destinos).forEach((key) => {
      const docData = { [key]: this.destinos[key] };
      destinosCollectionRef.add(docData);
    });
  }
  
  config: SwiperOptions = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    };
  title = 'Route-Maker';
}
 