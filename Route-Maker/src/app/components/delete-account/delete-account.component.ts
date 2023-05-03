import { Component, OnInit } from '@angular/core';
import { OpenOverlayService } from 'src/app/services/open-overlay.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {
  constructor(public openOverlayService: OpenOverlayService){}

  ngOnInit(): void {

  }
}
