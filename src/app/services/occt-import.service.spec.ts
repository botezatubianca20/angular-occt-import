import { TestBed } from '@angular/core/testing';

import { OcctImportService } from './occt-import.service';

describe('OcctImportService', () => {
  let service: OcctImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcctImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
