import { CanDeactivateFn } from '@angular/router';
import { ReactiveEnrollmentFormComponent } from '../pages/reactive-enrollment-form/reactive-enrollment-form';

/**
 * Step 77: UnsavedChangesGuard prevents accidental data loss when navigating away from dirty form.
 */
export const unsavedChangesGuard: CanDeactivateFn<ReactiveEnrollmentFormComponent> = (component) => {
  if (component?.enrollForm?.dirty && !component?.submitted) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};

export { unsavedChangesGuard as UnsavedChangesGuard };
