import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
oo<nb-sqrt-svg-tall [width]="width" [height]="height"></nb-sqrt-svg-tall>

<label> width
<input [(ngModel)]="width">
</label>

<label> width
<input [(ngModel)]="height">
</label>
`,
  styles: [`
  
`]
})
export class AppComponent {
  title = 'ngx-rich';

  width = 200;
  height = 200;
}
