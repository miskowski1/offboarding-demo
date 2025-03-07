import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'offboarding', pathMatch: 'full' },
  { path: 'offboarding', loadChildren: () => import('./features/offboarding/offboarding.module').then(m => m.OffboardingModule) }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
