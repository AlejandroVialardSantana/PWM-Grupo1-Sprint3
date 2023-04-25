import { Component } from '@angular/core';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, SwiperOptions, Swiper} from 'swiper';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

interface Destino {
  name: string;
  stars: number;
  image: string;
  region: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  destinos: any;

  constructor(private http: HttpClient, private firestore: AngularFirestore, private firestoreService: FirestoreService) { }

  async getDestinies() {
    this.destinos = await this.firestoreService.getDestinies();
    return this.destinos;
  }

  async ngOnInit() {
    this.http.get<any>('../assets/destinos.json').subscribe(data => {
      this.destinos = data;
      this.exportDataToFirestore();
     });

     console.log(this.getDestinies());
  }

  exportDataToFirestore() {
    const destinosCollectionRef = this.firestore.collection('destinos');
    Object.keys(this.destinos).forEach((key) => {
      const docData = { [key]: this.destinos[key] };
      destinosCollectionRef.doc(key).set(docData);
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
 