import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidgetComponent implements OnInit {
  coursesCount: number = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.refreshCount();
  }

  refreshCount(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.coursesCount = courses.length;
    });
  }

  addDemoCourse(): void {
    const newId = 100 + Math.floor(Math.random() * 900);
    const demoCourse: Course = {
      id: newId,
      name: `Specialized Elective #${newId}`,
      code: `CS${newId}`,
      credits: 3,
      gradeStatus: 'pending',
      description: 'Dynamically added elective to verify singleton service instance.',
      instructor: 'Visiting Professor'
    };
    this.courseService.addCourse(demoCourse);
    this.refreshCount();
  }
}
