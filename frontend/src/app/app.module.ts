import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { YouTubePlayerModule } from "@angular/youtube-player";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { UserModeComponent } from './page/user-mode/user-mode.component';
import { StatusStudentClassroomComponent } from './page/teacher/status-student-classroom/status-student-classroom.component';
import { DatetimeComponent } from './page/teacher/datetime/datetime.component';
import { UserClassroomComponent } from './page/teacher/user-classroom/user-classroom.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { TeacherHomeComponent } from './page/teacher/teacher-home/teacher-home.component';
import { StudentHomeComponent } from './page/student/student-home/student-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListClassroomComponent } from './page/teacher/list-classroom/list-classroom.component';
import { EditClassroomComponent } from './page/teacher/edit-classroom/edit-classroom.component';
import { ListStudentComponent } from './page/student/list-student/list-student.component';
import { SettingLessonComponent } from './page/teacher/setting-lesson/setting-lesson.component';
import { QuizComponent } from './page/teacher/quiz/quiz.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserModeComponent,
    TeacherHomeComponent,
    StudentHomeComponent,
    ListClassroomComponent,
    EditClassroomComponent,
    StatusStudentClassroomComponent,
    DatetimeComponent,
    UserClassroomComponent,
    ListStudentComponent,
    SettingLessonComponent,
    QuizComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatCardModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
