
import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { makeSqrtImage } from './sqrt-tall-only';


@Component({
  selector: 'nb-sqrt-svg-tall',
  template: `
<svg *ngIf="show" [attr.width]="width + 'px'" [attr.height]="height + 'px'" [attr.viewBox]="'0 0 400000 ' + viewBoxHeight" preserveAspectRatio="xMinYMin slice">
  <path [attr.d]="points"></path>
</svg>
<span [style.width.px]="width" [style.height.px]="height" ></span>
  `,
  styles: [`
  
  :host {
    position: relative;
  }

  span {
    background-color: burlywood;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  
  `]
})
export class SqrtSvgTallComponent implements OnChanges {

  @Input() width: number = 200;
  @Input() height: number = 200;

  viewBoxHeight: number;

  points: string;

  show: boolean;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnChanges(): void {

    // Pixels to EM is /16 and the viewBox used by KaTex is em*1000
    this.viewBoxHeight = Math.floor(this.height / 16 * 1000);

    this.points = makeSqrtImage(this.viewBoxHeight);

    this.show = true;
    
this.ref.detectChanges();
debugger;
  }

}

