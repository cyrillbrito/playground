import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BasicComponent } from './basic.component';
import { EditorComponent } from './editor.component';
import { SqrtComponent } from './sqrt-svg/sqrt.component';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    SqrtComponent,
    BasicComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
