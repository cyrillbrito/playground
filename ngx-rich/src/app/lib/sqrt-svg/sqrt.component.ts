
import { Component, ElementRef, HostBinding, Input, OnChanges, ViewChild } from '@angular/core';
import { sqrtTall, sqrtMain } from './sqrt-paths';


@Component({
  selector: 'nb-sqrt',
  template: `
<svg [attr.width]="width" [attr.height]="height" [attr.viewBox]="'0 0 400000 ' + viewBoxHeight" preserveAspectRatio="xMinYMin slice">
  <path [attr.d]="points"></path>
</svg>
<span  #span contenteditable (input)="ngOnChanges()">123123123</span>
`,
  styles: [`
  
  :host {
    display: inline-flex;
    position: relative;
  }

  span {
    position: absolute;
    left: .8em;
    outline: none;
  }
  
  `]
})
export class SqrtComponent implements OnChanges {

  @HostBinding('style.font-size.px')
  @Input() fontSize: number = 16;

  @ViewChild('span') spanRef: ElementRef<HTMLElement>;

  width: string;
  height: string;
  viewBoxHeight: number;

  points: string;

  ngOnChanges(): void {

    setTimeout(() => {

      const contentW = this.spanRef.nativeElement.clientWidth / this.fontSize;
      const contentH = this.spanRef.nativeElement.clientHeight / this.fontSize;

      const sqrtW = .8 + contentW + .1;
      this.width = sqrtW + 'em';
      this.height = contentH + 'em';


      // Pixels to EM is /16 and the viewBox used by KaTex is em*1000
      this.viewBoxHeight = contentH * 1000;

      if (1250 < this.viewBoxHeight) {
        this.points = sqrtTall(this.viewBoxHeight);
      } else {
        this.points = sqrtMain();
      }

    })



  }

}

