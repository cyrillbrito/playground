import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EditorComponent } from './lib/editor.component';
import { SqrtComponent } from './lib/sqrt-svg/sqrt.component';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    SqrtComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
