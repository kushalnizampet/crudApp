import { TestBed } from '@angular/core/testing';

import { StudentManagemetService } from './student-managemet.service';

describe('StudentManagemetService', () => {
  let service: StudentManagemetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentManagemetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
