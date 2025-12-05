import { Component, input, OnInit, viewChild } from '@angular/core';

@Component({
  selector: 'div',
  templateUrl: './component.html',
})
export class CardBodyDemoNFCC {
  data = input<any>();
}
