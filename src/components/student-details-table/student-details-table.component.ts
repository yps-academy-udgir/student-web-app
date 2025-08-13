import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { signalUpdateFn } from '@angular/core/primitives/signals';
import { SHARED_MATERIAL_MODULES } from '../../shared/shared-material-modules';
import { MatDialog } from '@angular/material/dialog';
import { StudentRegFormComponent } from '../student-reg-form/student-reg-form.component';
import { IStudent } from '../../models/student';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { SnackbarService } from '../../services/snackbar.service';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { IConfirmDialogConfig } from '../../models/confirm-dialog';
import { StudDetailViewDialogComponent } from '../stud-detail-view-dialog/stud-detail-view-dialog.component';

@Component({
  selector: 'app-student-details-table',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatTableModule, MatIconModule, SHARED_MATERIAL_MODULES],
  templateUrl: './student-details-table.component.html',
  styleUrl: './student-details-table.component.scss'
})
export class StudentDetailsTableComponent implements OnInit {

  private _liveAnnouncer = inject(LiveAnnouncer);



  displayedColumns: string[] = ['Sr No', 'firstName', 'lastName','mobileNumber','action'];
  // dataSource: any[] = []; 


  dataSource = new MatTableDataSource<IStudent>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  itemsPerPageOptions: number[] = [5, 10, 15, 20];

  constructor(
    private _studentService: StudentService,
    private _matDialog: MatDialog,
    private paginatorIntl: MatPaginatorIntl,
    private _snackBar: SnackbarService,
    private _confirmDialogService: ConfirmDialogService
  ) {
    this.paginatorIntl.itemsPerPageLabel = 'Students per page:';
  }

  ngOnInit(): void {
    this.getAllStudents();
    this._studentService.sendNewStudentAsObs$.subscribe((newStudent: any) => {
      this.dataSource.data = [...this.dataSource.data, newStudent];
    });
    this._studentService.sendUpdateStudentAsObs$.subscribe((updatedStudent: any) => {
      const index = this.dataSource.data.findIndex(student => student._id === updatedStudent._id);
      if (index !== -1) {
        this.dataSource.data[index] = updatedStudent;
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllStudents() {
    this._studentService.getAllStudents().subscribe((students: any) => {
      this.dataSource.data = students.data;
    }, error => {
      console.error('Error fetching students:', error);
    });
  }

  deleteStudent(studentId: any) {

    const dialogConfig: IConfirmDialogConfig = {
      title: 'Delete Student',
      message: 'Are you sure you want to delete this student? ',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    }

    this._confirmDialogService.openConfirmDialog(dialogConfig).subscribe((confirmed: boolean) => {
      if (confirmed) {
        this._studentService.deleteStudent(studentId).subscribe({
          next: (res: any) => {
            if (res && res['success']) {
              this._snackBar.show(res['message'], 'success');
              this.getAllStudents();
            } else {
              this._snackBar.show(res['message'], 'warn');
            }
          },
        });
      } else {
        this._snackBar.show('Student deletion cancelled', 'info');
      }
    });



  }

  updateStudent(studentId: any, studentData: any) {

    const dialogConfig: IConfirmDialogConfig = {
      title: 'Update Student',
      message: `Are you sure you want to Update ${studentData.firstName} `,
      confirmText: 'Yes',
      cancelText: 'No',
    }

    this._confirmDialogService.openConfirmDialog(dialogConfig).subscribe((confirmed: boolean) => {
      if (confirmed) {

        this._studentService.isStudentFormEditMode$.next(true);

        const dialogRef = this._matDialog.open(StudentRegFormComponent, {
          width: '500px',
          data: {
            student: studentData
          }
        });
        dialogRef.afterClosed().subscribe(() => {
          this._studentService.isStudentFormEditMode$.next(false);
        });
      } else {
        this._snackBar.show('Student update cancelled', 'info');
        return;
      }
    });

  }

  viewStudent(student: any) {
    
    const dialogRef = this._matDialog.open(StudDetailViewDialogComponent, {
      width: '500px',
      data: {
        student: student,
        isViewMode: true
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this._studentService.isStudentFormEditMode$.next(false);
    });
  }

  onSearchStudent(e: Event) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}




