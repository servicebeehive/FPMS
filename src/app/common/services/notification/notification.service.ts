import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReturnResult } from '../../models/return-result';

@Injectable({
  providedIn: 'root'
})
export class NotificationService<T> {

  constructor(
    private readonly snackBar: MatSnackBar,
  ) { }


  success(data: ReturnResult<T>) {
    this.openSnackBar(data.message, '', 'success-snackbar')
  }

  error(data: ReturnResult<T>) {
    this.openSnackBar(data.message, '', 'error-snackbar')
  }

  warning(data: ReturnResult<T>) {
    this.openSnackBar(data.message, '', 'warning-snackbar')
  }

  showNotification(data: ReturnResult<T>) {
    if (data.success) {
      this.success(data);
    }
    else {
      this.error(data);
    }
  }

  openSnackBar(
    message: string,
    action: string,
    className = '',
    duration = 5000
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: [className]
    });
  }
}

