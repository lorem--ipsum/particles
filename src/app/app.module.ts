import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MathValidatorDirective } from './validators/math-validator';
import { StageComponent } from './stage/stage.component';
import { EmitterRendererComponent } from './emitter-renderer/emitter-renderer.component';
import { AttractorRendererComponent } from './attractor-renderer/attractor-renderer.component';
import { AttractorDetailComponent } from './attractor-detail/attractor-detail.component';
import { EmitterDetailComponent } from './emitter-detail/emitter-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    StageComponent,
    EmitterRendererComponent,
    AttractorRendererComponent,
    AttractorDetailComponent,
    EmitterDetailComponent,
    MathValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
