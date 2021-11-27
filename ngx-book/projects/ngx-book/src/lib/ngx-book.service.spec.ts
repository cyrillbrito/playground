import { TestBed } from '@angular/core/testing';

import { NgxBookService } from './ngx-book.service';

describe('NgxBookService', () => {
  let service: NgxBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
