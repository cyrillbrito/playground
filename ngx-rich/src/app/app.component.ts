import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
<nb-sqrt-svg-tall [fontSize]="fontSize"></nb-sqrt-svg-tall>


<br>
<br>
<label> font
<input type="number" step="1" [(ngModel)]="fontSize">
</label>
`,
  styles: [`
  
`]
})
export class AppComponent {
  title = 'ngx-rich';

  fontSize = 16;
}
