import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenOverlayService {

  showDeleteAccount = false;
  showChangePassword = false;
  constructor() { }
}
