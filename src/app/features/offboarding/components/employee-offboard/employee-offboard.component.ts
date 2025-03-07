import { Component, inject, input, model, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { EmployeesStore } from '../../store/employees.store';

@Component({
  selector: 'app-employee-offboard',
  standalone: false,
  templateUrl: './employee-offboard.component.html',
  styleUrl: './employee-offboard.component.scss'
})
export class EmployeeOffboardComponent implements OnDestroy {

  employeeId = input.required<string>();
  opened = model.required<boolean>();

  private readonly dialog = inject(MatDialog);
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(EmployeesStore);

  offBoardForm = this.formBuilder.group({
    address: this.formBuilder.group({
      streetLine1: this.formBuilder.nonNullable.control('', [ Validators.required, Validators.minLength(3) ]),
      country: this.formBuilder.nonNullable.control('', [ Validators.required, Validators.minLength(3) ]),
      postalCode: this.formBuilder.nonNullable.control('', [ Validators.required, Validators.pattern(/^[A-Za-z0-9\s\-]{3,10}$/) ]),
      receiver: this.formBuilder.nonNullable.control('', [ Validators.required, Validators.minLength(3) ])
    }),
    email: this.formBuilder.nonNullable.control('', [ Validators.required, Validators.email ]),
    phone: this.formBuilder.nonNullable.control('', [ Validators.required, Validators.pattern(/^\+?[1-9]\d{0,2}[\s-]?\d{3,4}[\s-]?\d{3,4}[\s-]?\d{0,4}$/) ]),
    city: this.formBuilder.control('', [ Validators.required, Validators.minLength(3) ]),
    notes: this.formBuilder.control('')
  });

  get addressGroup() {
    return this.offBoardForm.get('address') as FormGroup<{
      streetLine1: FormControl<string>,
      country: FormControl<string>,
      postalCode: FormControl<string>,
      receiver: FormControl<string>
    }>;
  }

  private unsubscribe$ = new Subject<void>();

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  close() {
    this.offBoardForm.reset();
    this.opened.set(false);
  }

  save() {
    if (this.offBoardForm.invalid) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(result => {
      if (result) {
        const { city, ...responseData } = this.offBoardForm.getRawValue();
        this.store.doFlips({
          id: this.employeeId(),
          employee: { status: 'OFFBOARDED' },
          requestData: responseData
        })
      }
    });
  }
}
