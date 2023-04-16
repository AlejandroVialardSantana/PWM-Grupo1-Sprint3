import { Component } from '@angular/core';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, SwiperOptions, Swiper} from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
 