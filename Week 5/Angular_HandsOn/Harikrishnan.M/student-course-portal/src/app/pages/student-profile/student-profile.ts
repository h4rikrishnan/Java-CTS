import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course, Student } from '../../models/course.model';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import * as EnrollmentSelectors from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfileComponent implements OnInit {
  student: Student = {
    id: 'HK-94821',
    name: 'Harikrishnan M',
    email: 'harikrishnan.m@student.ac.in',
    major: 'Artificial Intelligence & Data Science',
    semester: '8th Semester',
    gpa: 3.95
  };

  // Step 99: Cross-slice selector Observable joining course and enrollment states
  enrolledCourses$: Observable<Course[]>;

  constructor(private store: Store) {
    this.enrolledCourses$ = this.store.select(EnrollmentSelectors.selectEnrolledCourses);
  }

  ngOnInit(): void {}

  unenroll(courseId: number): void {
    this.store.dispatch(EnrollmentActions.unenrollFromCourse({ courseId }));
  }
}

export { StudentProfileComponent as StudentProfile };
