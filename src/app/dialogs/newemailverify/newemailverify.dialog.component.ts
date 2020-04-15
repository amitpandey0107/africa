import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newemailverify.dialog',
  templateUrl: '../../dialogs/newemailverify/newemailverify.dialog.html',
  styleUrls: ['../../dialogs/newemailverify/newemailverify.dialog.scss'],
})

export class newemailverifyDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<newemailverifyDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}

  submit(){
  	console.log('Submitted');
  }
}
