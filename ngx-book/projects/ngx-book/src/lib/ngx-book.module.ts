import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { SqrtSvgTallComponent } from './sqrt-svg/sqrt-svg-tall.component';
import { SqrtSvgComponent } from './sqrt-svg/sqrt-svg.component';


@NgModule({
  declarations: [
    EditorComponent,
    SqrtSvgComponent,
    SqrtSvgTallComponent,
  ],
  imports: [
  ],
  exports: [
    EditorComponent
  ]
})
export class NgxBookModule { }
