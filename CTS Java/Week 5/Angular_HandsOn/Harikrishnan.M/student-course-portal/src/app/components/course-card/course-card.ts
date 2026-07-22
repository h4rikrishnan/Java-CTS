import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { HighlightDirective } from '../../directives/highlight';
import { Course } from '../../models/course.model';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import * as EnrollmentSelectors from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Input() highlightColor: string = '#fef9c3';
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded: boolean = false;
  enrolledIds$: Observable<number[]>;
  isEnrolled$: Observable<boolean> | undefined;

  // Step 100: Inject NgRx Store in CourseCardComponent
  constructor(private store: Store) {
    this.enrolledIds$ = this.store.select(EnrollmentSelectors.selectEnrolledIds);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course'] && this.course) {
      console.log('CourseCardComponent ngOnChanges - Current value:', this.course);
      // Step 100: Derive boolean observable checking if course.id is in enrolledIds$
      this.isEnrolled$ = this.enrolledIds$.pipe(
        map(ids => ids.includes(this.course.id))
      );
    }
  }

  get cardClasses() {
    return {
      'card--full': (this.course?.credits ?? 0) >= 4,
      'expanded': this.isExpanded
    };
  }

  getBorderColor(): string {
    switch (this.course?.gradeStatus) {
      case 'passed':
        return '#22c55e';
      case 'failed':
        return '#ef4444';
      case 'pending':
      default:
        return '#94a3b8';
    }
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  // Step 100: Dispatch NgRx actions when Enroll button is clicked
  onEnroll(currentlyEnrolled: boolean): void {
    if (currentlyEnrolled) {
      this.store.dispatch(EnrollmentActions.unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(EnrollmentActions.enrollInCourse({ courseId: this.course.id }));
    }
    this.enrollRequested.emit(this.course.id);
  }
}

export { CourseCardComponent as CourseCard };
