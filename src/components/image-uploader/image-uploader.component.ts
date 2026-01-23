import { Component, input, output, signal } from '@angular/core';
import { ImageUploader } from '../../models/image-uploader.type';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [],
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

}
