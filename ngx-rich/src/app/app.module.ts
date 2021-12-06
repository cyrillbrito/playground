import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EditorComponent } from './lib/editor.component';
import { SqrtSvgTallComponent } from './lib/sqrt-svg/sqrt-svg-tall.component';
import { SqrtSvgComponent } from './lib/sqrt-svg/sqrt-svg.component';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    SqrtSvgComponent,
    SqrtSvgTallComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
