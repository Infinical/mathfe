import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseListComponent } from './admin-course-list.component';

describe('AdminCourseListComponent', () => {
  let component: AdminCourseListComponent;
  let fixture: ComponentFixture<AdminCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCourseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
