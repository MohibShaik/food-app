import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLayoutComponent } from './components/custom-layout/custom-layout.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomOrdersListComponent } from './components/custom-orders-list/custom-orders-list.component';

@NgModule({
  declarations: [CustomLayoutComponent, CustomOrdersListComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CoreModule],
  exports: [CustomLayoutComponent, CustomOrdersListComponent],
})
export class SharedModule {}
