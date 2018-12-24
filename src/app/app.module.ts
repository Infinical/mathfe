import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseListComponent } from './dashboard/course-list/course-list.component';
import { CourseComponent } from './dashboard/course-list/course.component';
import { CourseService } from './services/course.service';
import { QuestionService } from './services/question.service';
import { TrackService } from './services/track.service';
import { SkillService } from './services/skill.service';
import { HouseTrackService } from './services/house-track.service';
import { SkillTrackService } from './services/skill-track.service';
import { UserService } from './services/user.service';
import { DashboardService } from './services/dashboard.service';
import { CourseDetailComponent } from './dashboard/course-detail/course-detail.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { routes } from './app.routes';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { AdminCourseListComponent } from './admin/admin-course-list/admin-course-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminCourseCreateComponent } from './admin/admin-course-create/admin-course-create.component';
import { AdminCourseEditComponent } from './admin/admin-course-edit/admin-course-edit.component';
import { AdminCourseDeleteComponent } from './admin/admin-course-delete/admin-course-delete.component';
import { AdminUserListComponent } from './admin/admin-user-list/admin-user-list.component';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth-guard.service';
import { LandingComponent } from './landing/landing.component';
import { MemberComponent } from './member/member.component';
import { HouseComponent } from './member/house/house.component';
import { FooterComponent } from './footer.component';
import { HouseListComponent } from './member/house-list/house-list.component';
import { HouseDetailComponent } from './member/house-detail/house-detail.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { TeachListComponent } from './member/teach-list/teach-list.component';
import { TeachComponent } from './member/teach-list/teach.component';
import { TeachDetailComponent } from './member/teach-list/teach-detail/teach-detail.component';
import { TrackPassedComponent } from './member/teach-list/track-passed/track-passed.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './member/teach-list/teach-detail/chart/chart.component';
import { BarchartComponent } from './member/teach-list/teach-detail/barchart/barchart.component';
import { StudentradarComponent } from './member/house-detail/studentradar/studentradar.component';
import { UserinfoComponent } from './member/userinfo/userinfo.component';
import { VideoComponent } from './member/video/video.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RouterModule } from '@angular/router';
import { QuizComponent } from './member/quiz/quiz.component';
import { MemberDashboardComponent } from './member/member-dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './pagenotfound.component';
import { UserProfileComponent } from './member/user-profile/user-profile.component';
import { TrackCreateComponent } from './member/track-create/track-create.component';
import { TrackEditComponent } from './member/track-edit/track-edit.component';
import { TrackDeleteComponent } from './member/track-delete/track-delete.component';
import { SkillCreateComponent } from './member/skill-create/skill-create.component';
import { SkillEditComponent } from './member/skill-edit/skill-edit.component';
import { SkillDeleteComponent } from './member/skill-delete/skill-delete.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AdminUserEditComponent } from './admin/admin-user-edit/admin-user-edit.component';
import { AdminTrackListComponent } from './admin/admin-track-list/admin-track-list.component';
import { AdminTrackEditComponent } from './admin/admin-track-edit/admin-track-edit.component';
import { AdminTrackCreateComponent } from './admin/admin-track-create/admin-track-create.component';
import { AdminSkillEditComponent } from './admin/admin-skill-edit/admin-skill-edit.component';
import { AdminSkillCreateComponent } from './admin/admin-skill-create/admin-skill-create.component';
import { AdminSkillListComponent } from './admin/admin-skill-list/admin-skill-list.component';
import { AdminQuestionListComponent } from './admin/admin-question-list/admin-question-list.component';
import { AdminSkillDeleteComponent } from './admin/admin-skill-delete/admin-skill-delete.component';
import { AdminTrackDeleteComponent } from './admin/admin-track-delete/admin-track-delete.component';
import { AdminQuestionFormComponent } from './admin/admin-question-form/admin-question-form.component';
import { AdminQuestionEditComponent } from './admin/admin-question-edit/admin-question-edit.component';
import { AdminQuestionDeleteComponent } from './admin/admin-question-delete/admin-question-delete.component';
import { DynamicContentComponent } from './admin/admin-question-list/dynamicContent/dynamicContent.component';
import { DialogDeleteCourse } from './admin/admin-course-list/admin-course-list.component';
import { DialogDeleteQuestion } from './admin/admin-question-list/admin-question-list.component';
import { ModalComponent } from './member/modal.component';
import { ModalService } from './services/modal.service';

import { LandingPageComponent } from './member/landing-page/landing-page.component';
import { ClassManagementComponent } from './member/class-management/class-management.component';
import { StudentManagementComponent } from './member/student-management/student-management.component';
import { CourseManagementComponent } from './member/course-management/course-management.component';
import { TeachDetailStudentComponent } from './member/teach-list/teach-detail-student/teach-detail-student.component';
import { TeachDetailCourseComponent } from './member/teach-list/teach-detail-course/teach-detail-course.component';
import { RecommendedCoursesComponent } from './member/recommended-courses/recommended-courses.component';
import { ClassManagementSharedComponent } from './member/class-management-shared/class-management-shared.component';
import { EnrolledClassComponent } from './member/enrolled-class/enrolled-class.component'

//Angular Material
import { AngularMaterialModule } from './angularmaterial.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { NgxPayPalModule } from 'ngx-paypal';
import { DataTableModule } from "angular-6-datatable";

import { KatexModule } from 'ng-katex';


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    CourseListComponent,
    CourseComponent,
    CourseDetailComponent,
    ContactComponent,
    AboutComponent,
    AdminComponent,
    AdminDashboardComponent,
    AdminCourseListComponent,
    AdminCourseCreateComponent,
    AdminCourseEditComponent,
    AdminCourseDeleteComponent,
    AdminUserListComponent,
    LandingComponent,
    MemberComponent,
    HouseComponent,
    FooterComponent,
    HouseListComponent,
    HouseDetailComponent,
    DropdownDirective,
    TeachListComponent,
    TeachComponent,
    TeachDetailComponent,
    TrackPassedComponent,
    ChartComponent,
    BarchartComponent,
    StudentradarComponent,
    UserinfoComponent,
    VideoComponent,
    LeaderboardComponent,
    QuizComponent,
    MemberDashboardComponent,
    LoginComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    TrackCreateComponent,
    TrackEditComponent,
    TrackDeleteComponent,
    SkillCreateComponent,
    SkillEditComponent,
    SkillDeleteComponent,
    PrivacyComponent,
    AdminUserEditComponent,
    AdminTrackListComponent,
    AdminTrackEditComponent,
    AdminTrackCreateComponent,
    AdminSkillEditComponent,
    AdminSkillCreateComponent,
    AdminSkillListComponent,
    AdminQuestionListComponent,
    AdminSkillDeleteComponent,
    AdminTrackDeleteComponent,
    AdminQuestionFormComponent,
    AdminQuestionEditComponent,
    AdminQuestionDeleteComponent,
    DynamicContentComponent,
    DialogDeleteCourse,
    DialogDeleteQuestion,
    ModalComponent,
    LandingPageComponent,
    ClassManagementComponent,
    StudentManagementComponent,
    CourseManagementComponent,
    TeachDetailStudentComponent,
    TeachDetailCourseComponent,
    RecommendedCoursesComponent,
    ClassManagementSharedComponent,
    EnrolledClassComponent
  ],
  imports: [
    routes,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    HttpModule,
    ChartsModule,
    NgxPayPalModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          'localhost:4200', 'localhost', 'devapi.pamelalim.me', 'localhost:8000', 'quiz.pamelalim.me', 'api.pamelalim.me', 'math.pamelalim.me', 'quiz.all-gifted.com']
      }
    }),
    AngularMaterialModule,
    BrowserAnimationsModule,
    AngularEditorModule,
    NgMasonryGridModule,
    DataTableModule,
    KatexModule
  ],
  entryComponents: [DialogDeleteCourse, DialogDeleteQuestion],
  providers: [TrackService, CourseService, QuestionService, DashboardService, UserService, AuthService, AuthGuardService, HouseTrackService, SkillService, SkillTrackService, ModalService],
  bootstrap: [AppComponent]
})

export class AppModule { }



