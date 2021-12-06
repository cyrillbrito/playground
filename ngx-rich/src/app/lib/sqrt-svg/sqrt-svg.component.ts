
import { Component, Input, OnChanges } from '@angular/core';
import { sqrtPath } from './sqrt-all';


@Component({
  selector: 'nb-sqrt-svg',
  template: `
<svg width="4em" [attr.height]="height + 'em'" [attr.viewBox]="'0 0 4000 ' + height * 1000" preserveAspectRatio="xMinYMin slice">
  <path [attr.d]="points"></path>
</svg>
  `
})
export class SqrtSvgComponent implements OnChanges {

  @Input() height: number = 20;
  // @Input() viewBoxHeight: number = 20;
  @Input() sqrtName: 'sqrtMain' | 'sqrtSize1' | 'sqrtSize2' | 'sqrtSize3' | 'sqrtSize4' | 'sqrtTall' = 'sqrtMain';
  
  points: string;

  private show: boolean;

  constructor() { }

  ngOnChanges(): void {
    // this.show = true;
    this.points = sqrtPath(this.sqrtName, this.height * 1000);
    console.log(this.points);

    // setTimeout(() => {
    //   this.show = true;
    // }, 50);
  }

}

