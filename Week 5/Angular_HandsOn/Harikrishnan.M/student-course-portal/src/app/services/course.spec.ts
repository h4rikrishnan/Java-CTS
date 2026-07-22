import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService (Hands-On 10 Task 2)', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Web Dev', code: 'CS202', credits: 3, gradeStatus: 'pending' }
  ];

  beforeEach(() => {
    // Step 106: Configure TestBed with provideHttpClient and provideHttpClientTesting
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Step 107: Verify no unexpected outstanding requests
    httpMock.verify();
  });

  // Step 107: Test getCourses() HTTP GET request
  it('should retrieve courses via GET from endpoint', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses[0].name).toBe('Algorithms');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  // Step 108: Test HTTP error handling and fallback
  it('should handle HTTP error gracefully and return fallback dataset', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses).toBeTruthy();
      expect(courses.length).toBeGreaterThan(0);
    });

    // Handle initial request + 2 retries (from retry(2) operator)
    const req1 = httpMock.expectOne('http://localhost:3000/courses');
    req1.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    const req2 = httpMock.expectOne('http://localhost:3000/courses');
    req2.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    const req3 = httpMock.expectOne('http://localhost:3000/courses');
    req3.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });
});
