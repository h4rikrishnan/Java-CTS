import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  courseId: number | null = null;

  // Step 69: Inject ActivatedRoute to access route parameters
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.courseId = Number(idParam);
      this.courseService.getCourseById(this.courseId).subscribe(c => {
        this.course = c;
      });
    }
  }

  get isEnrolled(): boolean {
    return this.courseId ? this.enrollmentService.isEnrolled(this.courseId) : false;
  }

  toggleEnrollment(): void {
    if (!this.courseId) return;
    if (this.isEnrolled) {
      this.enrollmentService.unenroll(this.courseId);
    } else {
      this.enrollmentService.enroll(this.courseId);
    }
  }
}

export { CourseDetailComponent as CourseDetail };
