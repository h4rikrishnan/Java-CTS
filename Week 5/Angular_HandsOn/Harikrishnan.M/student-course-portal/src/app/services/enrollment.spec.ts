import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Enrollment } from './enrollment';

describe('Enrollment', () => {
  let service: Enrollment;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(Enrollment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
