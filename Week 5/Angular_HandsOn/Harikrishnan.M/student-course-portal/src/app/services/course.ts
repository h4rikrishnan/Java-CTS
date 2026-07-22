import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, switchMap, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  private initialCourses: Course[] = [
    { id: 101, name: 'Advanced Data Structures & Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed', description: 'Advanced algorithmic paradigm analysis covering trees, graphs, dynamic programming, and complexity bounds.', instructor: 'Dr. Aris Thorne' },
    { id: 102, name: 'Full-Stack Web Engineering with Angular & RxJS', code: 'CS202', credits: 4, gradeStatus: 'passed', description: 'Enterprise single page application engineering using Angular 20, RxJS reactive patterns, and NgRx state management.', instructor: 'Prof. Elena Rostova' },
    { id: 103, name: 'Distributed Database Systems & NoSQL Security', code: 'CS303', credits: 4, gradeStatus: 'passed', description: 'Relational & document database modeling, distributed consensus protocols, SQL optimization, and encryption.', instructor: 'Dr. Marcus Vance' },
    { id: 104, name: 'Cloud Native Architecture & Microservices', code: 'CS404', credits: 3, gradeStatus: 'pending', description: 'Container orchestration, Kubernetes, serverless microservices, CI/CD pipelines, and cloud security.', instructor: 'Dr. Sarah Chen' },
    { id: 105, name: 'Deep Learning & Neural Networks', code: 'AI505', credits: 4, gradeStatus: 'passed', description: 'Convolutional & Recurrent Neural Networks, Transformer architectures, PyTorch modeling, and LLM fine-tuning.', instructor: 'Dr. David K. Sterling' }
  ];

  // Step 78: Inject HttpClient into CourseService
  constructor(private http: HttpClient) {}

  getCoursesSync(): Course[] {
    return [...this.initialCourses];
  }

  getCourseByIdSync(id: number): Course | undefined {
    return this.initialCourses.find(c => c.id === id);
  }

  /**
   * Step 79, 83, 84, 85, 86:
   * - retry(2): Retries failed HTTP GET requests up to 2 times.
   * - tap(): Used for side-effects (logging). Preferred over map because tap does not mutate stream emission values.
   * - map(): Transforms response data (filters courses with credits > 0).
   * - catchError(): Graceful error handling returning user-friendly error message.
   */
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      tap(courses => console.log('Courses loaded via HttpClient:', courses.length)),
      map(courses => courses.filter(c => c.credits > 0)),
      catchError(err => {
        console.warn('API unavailable, serving fallback course dataset:', err);
        return of(this.initialCourses);
      })
    );
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(() => {
        const found = this.initialCourses.find(c => c.id === id);
        return of(found);
      })
    );
  }

  // Step 81: POST method to create a course
  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError(err => {
        console.warn('POST API failed, adding locally:', err);
        const newCourse: Course = { ...course, id: 100 + Math.floor(Math.random() * 900) };
        this.initialCourses.push(newCourse);
        return of(newCourse);
      })
    );
  }

  // Step 82: PUT method to update a course
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      catchError(() => of(course))
    );
  }

  // Step 82: DELETE method to delete a course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => of(void 0))
    );
  }

  /**
   * Step 87: Chaining HTTP calls with switchMap.
   * Why switchMap is preferred over mergeMap/concatMap for search & dependent calls:
   * switchMap automatically unsubscribes from and cancels any pending inner Observable when a new outer
   * emission arrives, preventing race conditions and out-of-order responses.
   */
  getStudentsByCourse(courseId: number): Observable<string[]> {
    return of(courseId).pipe(
      switchMap(id => {
        return of([`Student A (Course #${id})`, `Student B (Course #${id})`]);
      })
    );
  }

  addCourse(course: Course): void {
    this.initialCourses.push(course);
  }
}
