import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { unsavedChangesGuard } from './unsaved-changes-guard';
import { ReactiveEnrollmentFormComponent } from '../pages/reactive-enrollment-form/reactive-enrollment-form';

describe('unsavedChangesGuard', () => {
  const executeGuard = (component: any) =>
    TestBed.runInInjectionContext(() =>
      unsavedChangesGuard(
        component as ReactiveEnrollmentFormComponent,
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
        {} as RouterStateSnapshot
      )
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created and allow navigation when form is clean', () => {
    const mockComponent = { enrollForm: { dirty: false }, submitted: false };
    expect(executeGuard(mockComponent)).toBeTrue();
  });
});
