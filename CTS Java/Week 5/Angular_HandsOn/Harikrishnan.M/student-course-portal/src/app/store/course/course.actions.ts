import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

/**
 * Step 93: NgRx Action definitions for Course feature.
 * The [Course] prefix is a convention that groups actions by feature in Redux DevTools.
 */
export const loadCourses = createAction('[Course] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);
