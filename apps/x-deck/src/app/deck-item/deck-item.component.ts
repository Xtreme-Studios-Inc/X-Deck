import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { env } from '../../environments/env';

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
  item: any = null;

  populateEnv(url: string) {
    return url.replace('${apiUrl}', env.apiUrl);
  }
}
