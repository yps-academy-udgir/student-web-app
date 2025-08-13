import { Component } from '@angular/core';
// import { StudentRegFormComponent } from "../student-reg-form/student-reg-form.component";
import { StudentDetailsTableComponent } from "../student-details-table/student-details-table.component";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [StudentDetailsTableComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent {

}
// StudentRegFormComponent