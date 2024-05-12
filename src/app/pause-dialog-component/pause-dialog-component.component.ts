import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pause-dialog',
  templateUrl: 'pause-dialog-component.component.html',
})
export class PauseDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PauseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
