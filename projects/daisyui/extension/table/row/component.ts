import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tr',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    NgTemplateOutlet,
    PurePipe,
    SelectorlessOutlet,
    StrOrTemplateComponent,
    JsonPipe,
    FormsModule,
  ],
  providers: [],
})
export class TableRowFGC extends PiyingViewGroupBase {}
