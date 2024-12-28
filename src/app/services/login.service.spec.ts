import { TestBed } from '@angular/core/testing';

import { formService } from './form.service';

describe('formService', () => {
  let service: formService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(formService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
