import { TestBed } from '@angular/core/testing';

import { PinResolverService } from './pin-resolver.service';

describe('PinResolverService', () => {
  let service: PinResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
