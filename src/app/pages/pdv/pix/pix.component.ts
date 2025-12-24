import { Component } from '@angular/core';

@Component({
  selector: 'app-pix',
  imports: [],
  templateUrl: './pix.component.html',
  styleUrl: './pix.component.css',
})
export class PixComponent {
  pixQrCode: string | null = null;

  ngOnInit() {
    this.pixQrCode = localStorage.getItem('pixQrCode');
  }
}
