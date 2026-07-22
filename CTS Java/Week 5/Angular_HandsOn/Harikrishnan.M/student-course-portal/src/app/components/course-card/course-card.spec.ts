import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CourseCardComponent } from './course-card';
import { Course } from '../../models/course.model';

describe('CourseCardComponent (Hands-On 10 Task 1)', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let store: MockStore;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
    description: 'Fundamentals of algorithms.',
    instructor: 'Dr. Turing'
  };

  beforeEach(async () => {
    // Step 101: Configure TestBed with provideMockStore
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [
        provideMockStore({
          initialState: {
            enrollment: { enrolledCourseIds: [] }
          }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  // Step 102: Verifies component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 103: Tests @Input rendering in DOM
  it('should render course name in template heading', () => {
    component.course = { ...mockCourse, name: 'Advanced Algorithms' };
    fixture.detectChanges();
    const headingEl = fixture.debugElement.query(By.css('h3.course-title')).nativeElement;
    expect(headingEl.textContent).toContain('Advanced Algorithms');
  });

  // Step 104: Tests @Output event emission on button click
  it('should emit enrollRequested event when button is clicked', () => {
    spyOn(component.enrollRequested, 'emit');
    const button = fixture.debugElement.query(By.css('button.btn-primary')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  // Step 105: Tests ngOnChanges with spy on console.log
  it('should log previous and current values in ngOnChanges', () => {
    spyOn(console, 'log');
    component.ngOnChanges({
      course: new SimpleChange(null, mockCourse, true)
    });
    expect(console.log).toHaveBeenCalledWith(
      'CourseCardComponent ngOnChanges - Current value:',
      mockCourse
    );
  });
});
