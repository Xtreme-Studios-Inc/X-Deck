import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemManagerComponent } from './Item-manager/item-manager.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemManagerComponent, HttpClientModule],
  templateUrl: './app.component.html',
  host: {
    class: 'app-root',
  },
})
export class AppComponent {
  title = 'X-Deck';
}
