import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item } from '../types/x-deck-types';

@Component({
  selector: 'x-deck-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deck-item.component.html',
  styleUrl: './deck-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckItemComponent {
  @Input()
  item: Item | null = null;
}
