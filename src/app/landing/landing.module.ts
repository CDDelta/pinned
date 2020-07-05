import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinGridModule } from '../shared/components/pin-grid/pin-grid.module';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, PinGridModule, LandingRoutingModule],
})
export class LandingModule {}
