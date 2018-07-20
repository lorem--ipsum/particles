import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StageComponent } from './stage/stage.component';
import { EmitterRendererComponent } from './emitter-renderer/emitter-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    StageComponent,
    EmitterRendererComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
