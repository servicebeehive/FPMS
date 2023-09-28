import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-dualist-dialog',
  templateUrl: './dualist-dialog.component.html',
  styleUrls: ['./dualist-dialog.component.scss'],
  standalone:true,
  imports: [MatButtonModule, MatDialogModule],
})

export class DualistDialogComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<DualistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }


  onsavedata(){
    let labordata={laberlist:'fasdf'}
    this.matDialogRef.close(labordata)
  }

}
