import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOffboardComponent } from './employee-offboard.component';

describe('EmployeeOffboardComponent', () => {
  let component: EmployeeOffboardComponent;
  let fixture: ComponentFixture<EmployeeOffboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeOffboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeOffboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
