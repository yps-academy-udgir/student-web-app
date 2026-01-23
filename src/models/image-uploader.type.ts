export type ImageMode = 'view' | 'edit' | 'upload';
export type ImageShape = 'circle' | 'rect';
export type ImageSize = 'sm' | 'md' | 'lg';

export type ImageUploader = {
  imageMode: ImageMode;
  imageShape: ImageShape;
  imageSize: ImageSize;
};
