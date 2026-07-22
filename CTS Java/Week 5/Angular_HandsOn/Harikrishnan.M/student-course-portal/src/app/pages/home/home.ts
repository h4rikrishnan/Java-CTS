import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  portalName: string = 'Student Course Portal';
  isPortalActive: boolean = true;
  message: string = '';
  searchTerm: string = '';

  availableCoursesCount: number = 0;
  enrolledCount: number = 4;
  gpa: number = 3.95;

  // Inject CourseService (Step 61)
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    this.courseService.getCourses().subscribe(courses => {
      this.availableCoursesCount = courses.length;
    });
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}

export { HomeComponent as Home };
