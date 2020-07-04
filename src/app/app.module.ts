import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import Arweave from 'arweave/web';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: Arweave, useFactory: () => Arweave.init(undefined) }],
  bootstrap: [AppComponent],
})
export class AppModule {}
