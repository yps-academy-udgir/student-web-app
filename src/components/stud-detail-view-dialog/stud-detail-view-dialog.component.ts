import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SHARED_MATERIAL_MODULES } from '../../shared/shared-material-modules';
import { CommonModule } from '@angular/common';
import { IStudent } from '../../models/student';
import { NumberFormatPipe } from '../../pipe/number-format.pipe';

@Component({
  selector: 'app-stud-detail-view-dialog',
  standalone: true,
  imports: [SHARED_MATERIAL_MODULES, CommonModule, NumberFormatPipe],
  templateUrl: './stud-detail-view-dialog.component.html',
  styleUrl: './stud-detail-view-dialog.component.scss'
})
export class StudDetailViewDialogComponent {

  student: IStudent = {} as IStudent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.student) {
      this.student = data.student;
    }
  }

}
