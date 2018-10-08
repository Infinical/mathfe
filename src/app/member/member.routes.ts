import { Routes } from "@angular/router";
import { MemberDashboardComponent } from "./member-dashboard.component";
import { ContactComponent } from "../contact/contact.component";
import { AboutComponent } from "../about/about.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { TrackCreateComponent } from "./track-create/track-create.component";
import { VideoComponent } from "./video/video.component";

export const memberRoutes: Routes = [
  { path: '', component: MemberDashboardComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: 'tracks/create', component: TrackCreateComponent},
  { path: 'video/:id', component: VideoComponent}
];