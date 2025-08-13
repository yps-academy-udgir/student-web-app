import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SHARED_MATERIAL_MODULES } from '../../shared/shared-material-modules';
import { CommonModule } from '@angular/common';
import { IStudent } from '../../models/student';

@Component({
  selector: 'app-stud-detail-view-dialog',
  standalone: true,
  imports: [SHARED_MATERIAL_MODULES, CommonModule],
  templateUrl: './stud-detail-view-dialog.component.html',
  styleUrl: './stud-detail-view-dialog.component.scss'
})


export class StudDetailViewDialogComponent {
   @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  student: IStudent = {} as IStudent;
  stdNum!: string;

  selectedImage: string | ArrayBuffer | null = null; // for preview

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.student) {
      this.student = data.student;
    }
  }

  ngOnInit() {
    this.student = this.data.student;
    this.stdNum = this.data.stdNum;
    // If student already has a photo, show it
    if (this.student.profilePhoto) {
      this.selectedImage = this.student.profilePhoto;
    }
  }
 triggerFileUpload() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.selectedImage = reader.result;
      reader.readAsDataURL(file);
    }
  }
}


// export class StudDetailViewDialogComponent {

//   student: IStudent = {} as IStudent;
  

//   stdNum!: number;
//   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
//     if (data && data.student) {
//       this.student = data.student;
//     }
    
//   }

//   ngOnInit() {
//   this.student = this.data.student;
//   this.stdNum = this.data.stdNum;
// }

// }
