import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { SHARED_MATERIAL_MODULES } from '../../shared/shared-material-modules';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { CapitalizeFirstDirective } from '../../directives/capitalize-first.directive';
import { NumberFormatDirective } from '../../directives/number-format.directive';

@Component({
  selector: 'app-student-reg-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SHARED_MATERIAL_MODULES,CapitalizeFirstDirective, NumberFormatDirective],
  templateUrl: './student-reg-form.component.html',
  styleUrl: './student-reg-form.component.scss'
})
export class StudentRegFormComponent {


  studentRegistrationForm! :FormGroup
  isInEditMode: boolean = false; 

  constructor(
    private _fb: FormBuilder,
    private _studentService: StudentService,
    private dialogRef: MatDialogRef<StudentRegFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
   this.createStudentRegistrationForm();
   
    this._studentService.isStudentFormEditModeAsObs$.subscribe((isEditMode: boolean) => {
      this.isInEditMode = isEditMode;
      if (this.isInEditMode && this.data && this.data.student) {
        this.studentRegistrationForm.patchValue({
          firstName: this.data.student.firstName,
          lastName: this.data.student.lastName,
          mobileNumber: this.data.student.mobileNumber
        });
      }
    });

  }

  createStudentRegistrationForm() {
    this.studentRegistrationForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: [this.getDateMinusThreeYears(), [Validators.required]]
    });
  }

  getDateMinusThreeYears(): Date {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 3);
    return today;
  }

  formatToDDMMYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(0);
    console.log(year)

    return `${year}-${month}-${day}`;
  }


  onStudentFormSubmit() {
    if (this.studentRegistrationForm.valid) {
      const rawNumber = this.studentRegistrationForm.value.mobileNumber.replace(/\D/g, '');
      const dob: Date = this.studentRegistrationForm.value.dateOfBirth;
      const formattedDob = this.formatToDDMMYY(dob);
      const payLoad = { ...this.studentRegistrationForm.value, mobileNumber: rawNumber, dateOfBirth:formattedDob };
      if (this.isInEditMode) {
        this.updateStudent(this.data.student._id, payLoad);
      } else {
        this.registerStudent(payLoad);
      }
    }
  }

  registerStudent(payLoad:any) {

    this._studentService.registerStudent(payLoad).subscribe({
      next: (res: any) => {
        if (!res.success) {
          this._snackbarService.show(res.message, 'warn');
        } else {
          this.studentRegistrationForm.reset();
          this.dialogRef.close();
          this._snackbarService.show(res.message, 'success');
        }
      }
    });
  }

  updateStudent(studentId: any, studentData: any) {
    this._studentService.updateStudent(studentId, studentData).subscribe({
      next: (res: any) => {
        if (res.success) {
          this._studentService.sendUpdateStudent$.next(res.data);
          this.studentRegistrationForm.reset();
          this.dialogRef.close();
          this._snackbarService.show(res.message, 'success');
        }
      },
      error: (error: any) => {
        console.error('Error updating student:', error);
      }
    });
  }

  onClose() {
    this.studentRegistrationForm.reset();
    this.dialogRef.close(); // Close the dialog
  }
}
