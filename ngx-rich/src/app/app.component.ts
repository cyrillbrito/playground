import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
<!-- <nb-sqrt [fontSize]="fontSize"></nb-sqrt>


<br>
<br> -->
<label> font
<input type="number" step="1" [(ngModel)]="fontSize">
</label>

<br><br>
<nb-editor></nb-editor>
`,
  styles: [`
  
`]
})
export class AppComponent {
  title = 'ngx-rich';

  @HostBinding('style.font-size.px')
  fontSize = 16;
}
