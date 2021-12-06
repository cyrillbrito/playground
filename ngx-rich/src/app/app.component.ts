import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
<nb-sqrt [fontSize]="fontSize"></nb-sqrt>


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
