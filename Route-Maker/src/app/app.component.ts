import { Component } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions, Swiper } from 'swiper';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  destinos: any;

  constructor(private http: HttpClient, private firestore: AngularFirestore, private firestoreService: FirestoreService) { }

  async ngOnInit() {
    this.exportJsonToFirestore('destinos');
    this.exportJsonToFirestore('actividades');
  }  

  exportJsonToFirestore(name: string) {
    this.http.get(`../assets/${name}.json`).subscribe((data: any) => {
      const json = data;
      const collectionRef = this.firestore.collection(name);
      Object.keys(json).forEach((key) => {
        const docData = { [key]: json[key] };
        collectionRef.doc(key).set(docData);
      });
    });
  }

  config: SwiperOptions = {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  title = 'Route-Maker';
}