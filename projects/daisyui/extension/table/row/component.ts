import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';

import { PiyingViewGroupBase } from '@piying/view-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tr',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet, FormsModule],
  providers: [],
})
export class TableRowFGC extends PiyingViewGroupBase {}
