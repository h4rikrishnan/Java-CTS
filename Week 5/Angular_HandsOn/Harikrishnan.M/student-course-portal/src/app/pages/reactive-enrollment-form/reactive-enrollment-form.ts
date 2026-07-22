import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

/**
 * Step 53: Custom Synchronous Validator
 * Validates that course code / course ID does not start with 'XX' (disallowed prefix).
 */
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value || '').trim();
  if (value.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentFormComponent implements OnInit {
  enrollForm!: FormGroup;
  submitted: boolean = false;
  isCheckingEmail: boolean = false;

  // Step 49: Inject FormBuilder in constructor
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Step 49: Build reactive form structure with sync & async validators
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      // Step 55: Async validator simulateEmailCheck passed as 3rd parameter
      studentEmail: ['', [Validators.required, Validators.email], [this.simulateEmailCheck.bind(this)]],
      // Step 53: Custom sync validator noCourseCode applied to courseId
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      // Validators.requiredTrue specifically validates that a checkbox is checked
      agreeToTerms: [false, Validators.requiredTrue],
      // Step 56: FormArray for dynamic repeating course fields
      additionalCourses: this.fb.array([])
    });
  }

  /**
   * Step 57: Typed getter for additionalCourses FormArray.
   * Why this getter is better than casting in the template:
   * 1. Keeps templates clean and free of complex TypeScript type casts (e.g. $any).
   * 2. Provides full IDE autocomplete and strong compile-time type checking in the component class.
   */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  /**
   * Step 55: Async validator function simulateEmailCheck.
   * Returns a Promise that resolves after 800ms.
   * If email contains 'test@', returns { emailTaken: true }, otherwise null.
   */
  simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
    this.isCheckingEmail = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isCheckingEmail = false;
        const email = String(control.value || '').toLowerCase();
        if (email.includes('test@')) {
          resolve({ emailTaken: true });
        } else {
          resolve(null);
        }
      }, 800);
    });
  }

  // Step 56: Add new FormControl to FormArray
  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  // Step 56: Remove FormControl at index from FormArray
  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  /**
   * Step 51 & 52: Submit handler
   * Difference between enrollForm.value and enrollForm.getRawValue():
   * - enrollForm.value returns an object containing values of enabled controls only (disabled fields are omitted).
   * - enrollForm.getRawValue() returns an object containing values of all controls including disabled ones.
   */
  onSubmit(): void {
    console.log('Reactive Form Submitted!');
    console.log('enrollForm.value (excludes disabled controls):', this.enrollForm.value);
    console.log('enrollForm.getRawValue() (includes all controls):', this.enrollForm.getRawValue());

    if (this.enrollForm.valid) {
      this.submitted = true;
    }
  }

  onReset(): void {
    this.enrollForm.reset({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.additionalCourses.clear();
    this.submitted = false;
  }
}

export { ReactiveEnrollmentFormComponent as ReactiveEnrollmentForm };
