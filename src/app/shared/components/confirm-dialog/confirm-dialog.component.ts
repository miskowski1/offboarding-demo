import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  imports: [
    MatButtonModule, MatDialogModule
  ],
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
}
