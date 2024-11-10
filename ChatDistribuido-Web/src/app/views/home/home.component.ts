import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as signalR from '@microsoft/signalr';
import { MatDialog } from '@angular/material/dialog';
import { NameDialogComponent } from '../../shared/name-dialog/name-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatSnackBar} from '@angular/material/snack-bar';
//import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    //MatSnackBarModule
  ],
   
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  messages: Message[] = [];
  messageControl = new FormControl('');
  userName! : string;

  connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7122/chat', {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .build();

  constructor(public dialog: MatDialog, 
              /*public snackBar: MatSnackBar*/) {
    this.openDialog();
  }

  ngOnInit(): void {}
   
  
 /* openSnackBar(userName: string) {
    const message = this.userName == this.userName ? 'Você entrou na sala' : '${userName} entrou na sala';
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }*/
  
  openDialog(){
    const dialogRef = this.dialog.open(NameDialogComponent, {
      width: '250px',
      data: this.userName,
      disableClose: true,
      hasBackdrop: true,
    });
   
    
    dialogRef.backdropClick().subscribe(() => {
      const backdrop = document.querySelector('.cdk-overlay-backdrop');
      if (backdrop) {
        backdrop.addEventListener('mousedown', (event) => {
          event.stopPropagation();
        });  
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.userName = result;
      this.startConnection();
      /*this.openSnackBar(result)*/;
    });
  }
  startConnection() {
    this.connection.on('newMessage', (userName: string, text: string) => {
      this.messages.push({
        text: text,
        userName: userName,
      });
    });

    /*this.connection.on('newUser', (userName: string) => {
      this.openSnackBar(userName);
    });*/

    this.connection.start();
  }

  sendMessage() {
    this.connection
      .send('newMessage', this.userName, this.messageControl.value)
      .then(() => {
        this.messageControl.setValue('');
      });
  }
}

interface Message {
  userName: string;
  text: string;
}
