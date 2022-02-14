import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./s-wolf.css', './s-tests.scss']
})
export class AppComponent {
  title = 'ngx-rich';

  @HostBinding('style.font-size.px')
  fontSize = 32;
}
