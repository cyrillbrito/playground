import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./a.css', './b.scss']
})
export class AppComponent {
  title = 'ngx-rich';

  @HostBinding('style.font-size.px')
  fontSize = 16;
}
