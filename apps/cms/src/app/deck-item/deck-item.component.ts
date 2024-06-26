import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item } from '../types/x-deck-types';
import { IconComponent } from '@xtreme-studios/x-components';
import { env } from '../../environments/env';

@Component({
  selector: 'x-deck-item',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './deck-item.component.html',
  styleUrl: './deck-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckItemComponent {
  @Input()
  item: Item | null = null;

  populateEnv(url: string) {
    return url.replace('${apiUrl}', env.apiUrl);
  }
}
