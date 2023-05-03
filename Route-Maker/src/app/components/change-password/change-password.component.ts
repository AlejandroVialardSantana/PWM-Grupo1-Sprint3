import { Component, OnInit } from '@angular/core';
import { OpenOverlayService } from 'src/app/services/open-overlay.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  constructor(public openOverlayService: OpenOverlayService){}

  ngOnInit(): void {

  }
}