import { Component, input } from '@angular/core';

interface ListItem {
  id: string;
  name: string;
  subtitle: string;
  avatar: string;
}

@Component({
  selector: 'app-list-demo',
  templateUrl: './component.html',
})
export class ListDemoNFCC {
  data = input<ListItem[]>();


}
