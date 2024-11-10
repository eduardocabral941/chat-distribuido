import { Component } from '@angular/core';
import { HomeComponent } from './views/home/home.component'; // Ensure this path is correct and the file exists
import { CommonModule } from '@angular/common';
// import { MatSnackBarModule } from '@angular/material/snack-bar';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, CommonModule /*, MatSnackBarModule*/],
  template: '<app-home></app-home>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ChatDistribuido-Web';
}
