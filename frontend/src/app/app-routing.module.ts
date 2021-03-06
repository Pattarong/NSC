import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { LearnLessonComponent } from './page/student/learn-lesson/learn-lesson.component';
import { LessonStuComponent } from './page/student/lesson-stu/lesson-stu.component';
import { StudentHomeComponent } from './page/student/student-home/student-home.component';
import { EditClassroomComponent } from './page/teacher/edit-classroom/edit-classroom.component';
import { SettingLessonComponent } from './page/teacher/setting-lesson/setting-lesson.component';
import { TeacherHomeComponent } from './page/teacher/teacher-home/teacher-home.component';
import { UserModeComponent } from './page/user-mode/user-mode.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"user-mode/:id",component:UserModeComponent},
  {path:"teacher/home/:id",component:TeacherHomeComponent},
  {path:"student/home/:id",component:StudentHomeComponent},
  {path :"edit/lesson/:clid/:uid",component:EditClassroomComponent},
  {path : "setting/lesson/:clid/:lid/:uid", component:SettingLessonComponent},
  {path : "lesson/stu/:uid/:clid",component:LessonStuComponent},
  {path : "learn/lesson/:uid/:clid/:lid",component:LearnLessonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
