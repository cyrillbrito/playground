
import { Component, Input, OnChanges } from '@angular/core';
import { makeSqrtImage } from './sqrt-tall-only';


@Component({
  selector: 'nb-sqrt-svg-tall',
  template: `
<svg width="4em" [attr.height]="height + 'em'" [attr.viewBox]="'0 0 4000 ' + height * 1000" preserveAspectRatio="xMinYMin slice">
  <path [attr.d]="points"></path>
</svg>
  `
})
export class SqrtSvgTallComponent implements OnChanges {

  @Input() height: number = 20;

  points: string;

  private show: boolean;

  constructor() { }

  ngOnChanges(): void {
    // this.show = false;
    this.points = makeSqrtImage(this.height);


    // setTimeout(() => {
    //   this.show = true;
    // }, 50);
  }

}

