import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newmsglimit.dialog',
  templateUrl: '../../dialogs/newmsglimit/newmsglimit.dialog.html',
  styleUrls: ['../../dialogs/newmsglimit/newmsglimit.dialog.scss'],
})

export class newmsglimitDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<newmsglimitDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}

  submit(){
  	console.log('Submitted');
  }
}
