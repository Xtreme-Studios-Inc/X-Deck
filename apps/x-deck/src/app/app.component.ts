import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeckItemComponent } from './deck-item/deck-item.component';
import { DeckItemService } from './services/deck-item.service';
import { Item } from './types/x-deck-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, DeckItemComponent],
  providers: [DeckItemService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'X-Deck';

  currentItem: Item | undefined;
  subItems: Item[] = [];

  constructor(private deckItemService: DeckItemService) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems() {
    this.deckItemService.getData().subscribe((data) => {
      this.currentItem = data as Item;
      if (this.currentItem.items?.length)
        this.subItems = this.currentItem.items;
    });
  }

  onItemClicked(item: Item) {
    if (item.name)
      this.deckItemService
        .exec(
          this.currentItem?.name && !this.currentItem?.name?.match(item.name)
            ? this.currentItem?.name + '/' + item.name
            : item.name
        )
        .subscribe((data) => {
          if (!data?.items) return;

          this.currentItem = data;
          this.subItems = this.currentItem.items ?? [];
        });
  }
}
