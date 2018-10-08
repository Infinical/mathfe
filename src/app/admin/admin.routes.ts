import { Routes } from "@angular/router";
import { AdminCourseListComponent } from "./admin-course-list/admin-course-list.component";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import {AdminCourseCreateComponent} from './admin-course-create/admin-course-create.component';
import {AdminCourseEditComponent} from './admin-course-edit/admin-course-edit.component';
import {AdminCourseDeleteComponent} from './admin-course-delete/admin-course-delete.component';
import {AdminUserListComponent} from './admin-user-list/admin-user-list.component';
import {AdminUserEditComponent} from './admin-user-edit/admin-user-edit.component';
import { AdminTrackListComponent } from "./admin-track-list/admin-track-list.component";
import {AdminTrackCreateComponent} from './admin-track-create/admin-track-create.component';
import {AdminTrackEditComponent} from './admin-track-edit/admin-track-edit.component';
import {AdminTrackDeleteComponent} from './admin-track-delete/admin-track-delete.component';
import { AdminSkillListComponent } from "./admin-skill-list/admin-skill-list.component";
import {AdminSkillCreateComponent} from './admin-skill-create/admin-skill-create.component';
import {AdminSkillEditComponent} from './admin-skill-edit/admin-skill-edit.component';
import {AdminSkillDeleteComponent} from './admin-skill-delete/admin-skill-delete.component';
import { AdminQuestionListComponent } from "./admin-question-list/admin-question-list.component";
import {AdminQuestionCreateComponent} from './admin-question-create/admin-question-create.component';
import {AdminQuestionEditComponent} from './admin-question-edit/admin-question-edit.component';
import {AdminQuestionDeleteComponent} from './admin-question-delete/admin-question-delete.component';

export const adminRoutes: Routes = [
  { path: '', component: AdminDashboardComponent},
  { path: 'courses', component: AdminCourseListComponent},
  { path: 'courses/create', component: AdminCourseCreateComponent},
  { path: 'courses/edit/:id', component: AdminCourseEditComponent },
  { path: 'courses/delete/:id', component: AdminCourseDeleteComponent },
  { path: 'tracks', component: AdminTrackListComponent},
  { path: 'tracks/create', component: AdminTrackCreateComponent},
  { path: 'tracks/edit/:id', component: AdminTrackEditComponent },
  { path: 'tracks/delete/:id', component: AdminTrackDeleteComponent },
  { path: 'skills', component: AdminSkillListComponent},
  { path: 'skills/create', component: AdminSkillCreateComponent},
  { path: 'skills/edit/:id', component: AdminSkillEditComponent },
  { path: 'skills/delete/:id', component: AdminSkillDeleteComponent },
  { path: 'questions', component: AdminQuestionListComponent},
  { path: 'questions/create', component: AdminQuestionCreateComponent},
  { path: 'questions/edit/:id', component: AdminQuestionEditComponent },
  { path: 'questions/delete/:id', component: AdminQuestionDeleteComponent },
  { path: 'users', component: AdminUserListComponent},
  { path: 'users/edit/:id', component: AdminUserEditComponent },
];