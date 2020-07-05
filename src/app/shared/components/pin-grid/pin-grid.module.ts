import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxMasonryModule } from 'ngx-masonry';
import { PinGridComponent } from './pin-grid.component';

@NgModule({
  declarations: [PinGridComponent],
  imports: [CommonModule, RouterModule, NgxMasonryModule],
  exports: [PinGridComponent],
})
export class PinGridModule {}
