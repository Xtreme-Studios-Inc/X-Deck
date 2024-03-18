import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-item-manager',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Item-manager.component.html',
  styleUrl: './Item-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemManagerComponent { }
