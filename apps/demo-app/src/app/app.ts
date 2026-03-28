import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoComponent } from './demo.component';

@Component({
  imports: [RouterModule, DemoComponent],
  selector: 'app-root',
  template: `<app-demo></app-demo>`,
  styles: [`:host { display: block; }`],
})
export class App {}
