import { Component, computed, input, output, signal } from '@angular/core';
import { ImageUploader } from '../../models/image-uploader.type';
import { SHARED_MATERIAL_MODULES } from '../../shared/shared-material-modules';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [SHARED_MATERIAL_MODULES],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent {

  // Inputs
  imageUrl = input<string | null>(null);
  mode = input<ImageUploader['imageMode']>('upload');
  shape = input<ImageUploader['imageShape']>('rect');
  size = input<ImageUploader['imageSize']>('md');

  // Internal Signals
  previewUrl = signal<string | null>(null);
  selectedFile = signal<File | null>(null);

  // Outputs
  fileChange = output<File | null>();

  displayImageUrl = computed(() => {
    return this.previewUrl() || this.imageUrl();
  });

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) {
    return;
  }

  const file = input.files[0];

  this.selectedFile.set(file);
  this.previewUrl.set(URL.createObjectURL(file));
  this.fileChange.emit(file);
}


}
