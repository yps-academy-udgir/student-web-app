export interface IConfirmDialogConfig {
  title?: string;
  message?: string;
  confirmText?: string;   // e.g., "Yes", "Delete"
  cancelText?: string;    // e.g., "No", "Cancel"
  color?: 'primary' | 'warn' | 'accent'; // for confirm button

  showConfirm?: boolean; // default true
  showCancel?: boolean;  // default true


   stdNum?: number;
  student?: {
    firstName: string;
    lastName: string;
    [key: string]: any; // optional: allows extra student fields without error
  };
}