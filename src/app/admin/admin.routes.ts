import { Routes } from "@angular/router";
import { AdminCourseListComponent } from "./admin-course-list/admin-course-list.component";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { AdminCourseCreateComponent } from './admin-course-create/admin-course-create.component';
import { AdminCourseEditComponent } from './admin-course-edit/admin-course-edit.component';
import { AdminCourseDeleteComponent } from './admin-course-delete/admin-course-delete.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import { AdminTrackListComponent } from "./admin-track-list/admin-track-list.component";
import { AdminTrackCreateComponent } from './admin-track-create/admin-track-create.component';
import { AdminTrackEditComponent } from './admin-track-edit/admin-track-edit.component';
import { AdminTrackDeleteComponent } from './admin-track-delete/admin-track-delete.component';
import { AdminSkillListComponent } from "./admin-skill-list/admin-skill-list.component";
import { AdminSkillCreateComponent } from './admin-skill-create/admin-skill-create.component';
import { AdminSkillEditComponent } from './admin-skill-edit/admin-skill-edit.component';
import { AdminSkillDeleteComponent } from './admin-skill-delete/admin-skill-delete.component';
import { AdminQuestionListComponent } from "./admin-question-list/admin-question-list.component";
import { AdminQuestionFormComponent } from './admin-question-form/admin-question-form.component';
import { AdminQuestionEditComponent } from './admin-question-edit/admin-question-edit.component';
import { AdminQuestionDeleteComponent } from './admin-question-delete/admin-question-delete.component';

import { AdminHouseListComponent } from "./admin-house-list/admin-house-list.component";
import { AdminHouseCreateComponent } from './admin-house-create/admin-house-create.component';
import { AdminHouseEditComponent } from './admin-house-edit/admin-house-edit.component';
import { AdminHouseDeleteComponent } from './admin-house-delete/admin-house-delete.component';

import { AdminFieldListComponent } from "./admin-field-list/admin-field-list.component";
import { AdminFieldCreateComponent } from './admin-field-create/admin-field-create.component';
import { AdminFieldEditComponent } from './admin-field-edit/admin-field-edit.component';
import { AdminFieldDeleteComponent } from './admin-field-delete/admin-field-delete.component';

import { AdminTypeListComponent } from "./admin-type-list/admin-type-list.component";
import { AdminTypeCreateComponent } from './admin-type-create/admin-type-create.component';
import { AdminTypeEditComponent } from './admin-type-edit/admin-type-edit.component';
import { AdminTypeDeleteComponent } from './admin-type-delete/admin-type-delete.component';

import { AdminUnitListComponent } from "./admin-unit-list/admin-unit-list.component";
import { AdminUnitCreateComponent } from './admin-unit-create/admin-unit-create.component';
import { AdminUnitEditComponent } from './admin-unit-edit/admin-unit-edit.component';
import { AdminUnitDeleteComponent } from './admin-unit-delete/admin-unit-delete.component';

export const adminRoutes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'courses', component: AdminCourseListComponent },
  { path: 'courses/create', component: AdminCourseCreateComponent },
  { path: 'courses/edit/:id', component: AdminCourseEditComponent },
  { path: 'courses/delete/:id', component: AdminCourseDeleteComponent },
  { path: 'tracks', component: AdminTrackListComponent },
  { path: 'tracks/create', component: AdminTrackCreateComponent },
  { path: 'tracks/edit/:id', component: AdminTrackEditComponent },
  { path: 'tracks/delete/:id', component: AdminTrackDeleteComponent },
  { path: 'skills', component: AdminSkillListComponent },
  { path: 'skills/create', component: AdminSkillCreateComponent },
  { path: 'skills/edit/:id', component: AdminSkillEditComponent },
  { path: 'skills/delete/:id', component: AdminSkillDeleteComponent },

  { path: 'houses', component: AdminHouseListComponent },
  { path: 'houses/create', component: AdminHouseCreateComponent },
  { path: 'houses/edit/:id', component: AdminHouseEditComponent },
  { path: 'houses/delete/:id', component: AdminHouseDeleteComponent },

  { path: 'fields', component: AdminFieldListComponent },
  { path: 'fields/create', component: AdminFieldCreateComponent },
  { path: 'fields/edit/:id', component: AdminFieldEditComponent },
  { path: 'fields/delete/:id', component: AdminFieldDeleteComponent },

  { path: 'types', component: AdminTypeListComponent },
  { path: 'types/create', component: AdminTypeCreateComponent },
  { path: 'types/edit/:id', component: AdminTypeEditComponent },
  { path: 'types/delete/:id', component: AdminTypeDeleteComponent },

  { path: 'units', component: AdminUnitListComponent },
  { path: 'units/create', component: AdminUnitCreateComponent },
  { path: 'units/edit/:id', component: AdminUnitEditComponent },
  { path: 'units/delete/:id', component: AdminUnitDeleteComponent },

  { path: 'questions', component: AdminQuestionListComponent },
  { path: 'questions/create', component: AdminQuestionFormComponent },
  { path: 'questions/edit/:id', component: AdminQuestionFormComponent },
  { path: 'questions/delete/:id', component: AdminQuestionDeleteComponent },
  { path: 'users', component: AdminUserListComponent },
  { path: 'users/edit/:id', component: AdminUserEditComponent },
];