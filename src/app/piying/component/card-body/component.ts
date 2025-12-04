import { Component, input, OnInit, viewChild } from '@angular/core';

@Component({
  selector: 'div',
  templateUrl: './component.html',
})
export class CardBodyDemoNFCC {
  author = input();
  format = input();
  genre = input();
  publisher = input();
  series = input();
}
