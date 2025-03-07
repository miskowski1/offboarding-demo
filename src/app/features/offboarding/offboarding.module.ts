import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeOffboardComponent } from './components/employee-offboard/employee-offboard.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { OffboardingRoutingModule } from './offboarding-routing.module';
import { MainComponent } from './pages/main/main.component';
import { EmployeeEquipmentPipe } from './pipes/employee-equipment.pipe';

@NgModule({
  declarations: [
    MainComponent,
    EmployeesListComponent,
    EmployeeEquipmentPipe,
    EmployeeDetailsComponent,
    EmployeeOffboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OffboardingRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
  ],
  providers: [
    provideHttpClient()
  ]
})
export class OffboardingModule {
}
