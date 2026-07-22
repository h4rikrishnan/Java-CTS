import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';
import { Course } from '../../models/course.model';

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state: EnrollmentState) => state?.enrolledCourseIds || []
);

/**
 * Step 99: Cross-slice selector combining course state and enrollment state.
 * Cross-slice selectors are a powerful NgRx pattern — use createSelector with multiple input selectors
 * to derive joined data dynamically without duplicating state across slices.
 */
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses: Course[], enrolledIds: number[]) => {
    return courses.filter((course) => enrolledIds.includes(course.id));
  }
);
