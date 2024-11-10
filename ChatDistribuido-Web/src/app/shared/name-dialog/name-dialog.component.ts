import { Component, Inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";


@Component({
  selector: 'app-name-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatDialogModule ],
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss']
})

export class NameDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public name: string,
    public dialogRef: MatDialogRef<NameDialogComponent>
  ) {}

  ngOnInit():void {

  }

}