import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBookComponent } from './ngx-book.component';

describe('NgxBookComponent', () => {
  let component: NgxBookComponent;
  let fixture: ComponentFixture<NgxBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
