import { Component, OnInit, NgZone } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions, Swiper } from 'swiper';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, Event, NavigationEnd } from '@angular/router';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  destinos: any;
  loading = false;
  constructor(private ngZone: NgZone, private router: Router, private http: HttpClient, private firestore: AngularFirestore) { }

  ngOnInit() {
    // this.exportJsonToFirestore('destinos');
    //this.exportJsonToFirestore('actividades');
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
      } else {
        this.loading = true;
        setTimeout(() => {
          this.ngZone.run(() => {
            this.loading = false; 
          });
        }, 1500); 
        
      }
    });
    // this.getFirestoreData('destinos');
    // this.getFirestoreData('actividades');
    // this.getFirestoreData('users');
  }

  exportJsonToFirestore(name: string) {
    this.http.get(`../data/${name}.json`).subscribe((data: any) => {
      const json = data;
      const collectionRef = this.firestore.collection(name);
      Object.keys(json).forEach((key) => {
        collectionRef.doc(key).set(json[key]);
      });
    });
  }

  getFirestoreData(name: string) {
    this.firestore.collection(name).get().subscribe((querySnapshot) => {
      const data: {[key: string]: any} = {};
      querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data();
      });
      this.saveDataToJson(data, name);
    });
  }

  saveDataToJson(data: any, name: string) {
    const jsonData = JSON.stringify(Object.values(data));
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = `${name}.json`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }  

  config: SwiperOptions = {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  title = 'Route-Maker';
}
