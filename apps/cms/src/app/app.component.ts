import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemManagerComponent } from './Item-manager/Item-manager.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '@xtreme-studios/x-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ItemManagerComponent,
    HttpClientModule,
    ButtonComponent,
  ],
  templateUrl: './app.component.html',
  host: {
    class: 'app-root',
  },
})
export class AppComponent {
  title = 'X-Deck';
}
