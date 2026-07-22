import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentFormComponent {
  // Submission success tracking boolean
  submitted: boolean = false;

  // Form model fields initialized
  studentName: string = '';
  studentEmail: string = '';
  courseId: number | null = null;
  preferredSemester: string = 'Odd';
  agreeToTerms: boolean = false;

  // Step 40: onSubmit logging form value and validity state
  onSubmit(form: NgForm): void {
    console.log('Template-Driven Form Submitted!');
    console.log('Form Value:', form.value);
    console.log('Form Valid:', form.valid);

    if (form.valid) {
      this.submitted = true;
    }
  }

  // Step 47: Reset button handler resetting form state
  onReset(form: NgForm): void {
    form.resetForm({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.submitted = false;
  }
}

export { EnrollmentFormComponent as EnrollmentForm };
