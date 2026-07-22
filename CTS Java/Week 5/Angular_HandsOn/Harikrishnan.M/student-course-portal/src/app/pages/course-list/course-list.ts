import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseCardComponent } from '../../components/course-card/course-card';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget';
import { NotificationComponent } from '../../components/notification/notification';
import { Course } from '../../models/course.model';
import * as CourseActions from '../../store/course/course.actions';
import * as CourseSelectors from '../../store/course/course.selectors';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import * as EnrollmentSelectors from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CourseCardComponent, 
    CourseSummaryWidgetComponent, 
    NotificationComponent
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {
  // Step 96: NgRx Store selectors and Observables
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  enrolledIds$: Observable<number[]>;

  selectedCourseId: number | null = null;
  searchTerm: string = '';

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Step 96: Select course state slices from NgRx Store
    this.courses$ = this.store.select(CourseSelectors.selectAllCourses);
    this.isLoading$ = this.store.select(CourseSelectors.selectCoursesLoading);
    this.error$ = this.store.select(CourseSelectors.selectCoursesError);
    this.enrolledIds$ = this.store.select(EnrollmentSelectors.selectEnrolledIds);
  }

  ngOnInit(): void {
    const querySearch = this.route.snapshot.queryParamMap.get('search');
    if (querySearch) {
      this.searchTerm = querySearch;
    }

    // Step 96: Dispatch loadCourses action on component initialization
    this.store.dispatch(CourseActions.loadCourses());
  }

  onSearchChange(): void {
    this.router.navigate(['/courses'], {
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
  }

  navigateToDetail(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  // Step 100: Dispatch NgRx enrollment actions
  onEnroll(courseId: number): void {
    this.selectedCourseId = courseId;
  }
}

export { CourseListComponent as CourseList };
