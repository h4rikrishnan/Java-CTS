import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout';
import { CourseListComponent } from './pages/course-list/course-list';
import { CourseDetailComponent } from './pages/course-detail/course-detail';
import { StudentProfileComponent } from './pages/student-profile/student-profile';
import { EnrollmentFormComponent } from './pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentFormComponent } from './pages/reactive-enrollment-form/reactive-enrollment-form';
import { NotFoundComponent } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  // Step 72: Nested routes under /courses layout with child routes '' and ':id'
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      { path: '', component: CourseListComponent },
      // Step 69: Route parameter :id mapping to CourseDetailComponent
      { path: ':id', component: CourseDetailComponent }
    ]
  },

  // Step 76: CanActivate AuthGuard protecting /profile route
  { 
    path: 'profile', 
    canActivate: [authGuard], 
    component: StudentProfileComponent 
  },

  // Template-Driven enrollment route
  { path: 'enroll', component: EnrollmentFormComponent },

  // Step 77: CanDeactivate UnsavedChangesGuard protecting reactive enrollment form route
  { 
    path: 'enroll-reactive', 
    canDeactivate: [unsavedChangesGuard], 
    component: ReactiveEnrollmentFormComponent 
  },

  // Step 68: Wildcard route matching 404 page (must be last route entry)
  { path: '**', component: NotFoundComponent }
];
