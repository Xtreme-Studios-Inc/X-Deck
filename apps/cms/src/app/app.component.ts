import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemManagerComponent } from './Item-manager/Item-manager.component';
import { ButtonComponent } from '@xtreme-studios/x-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemManagerComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cms';
}
