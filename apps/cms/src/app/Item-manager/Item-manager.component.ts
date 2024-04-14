import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ItemManagerService } from '../services/item-manager.service';
import {
  BaseComponentModule,
  NavBarConfig,
} from '@xtreme-studios/x-components';
import { DeckItemComponent } from '../deck-item/deck-item.component';
import { Item } from '../types/x-deck-types';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'x-item-manager',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    BaseComponentModule,
    DeckItemComponent,
    RouterModule,
  ],
  templateUrl: './Item-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'x-item-manager',
  },
})
export class ItemManagerComponent implements OnInit {
  @Input()
  items: Item[] = [];

  navConfig: NavBarConfig = {
    navBarTitle: {
      title: 'X-Deck Item Manager',
    },
    actionItems: [
      {
        label: 'Create Item',
        onClick: () => {
          this.createItem();
        },
        icon: {
          name: 'plus',
          size: 'sm',
        },
      },
    ],
  };

  constructor(
    private itemManagerService: ItemManagerService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  createItem() {
    this.router.navigate(['/new']);
  }

  getAllItems() {
    this.itemManagerService.getAllItems().subscribe((data) => {
      const currentItem = data as Item;
      if (currentItem.items?.length) this.items = currentItem.items;
      this.cd.markForCheck();
    });
  }

  onItemClicked(item: Item) {
    if (Array.isArray(item.items)) {
      this.items = item.items;
      return;
    }

    this.itemManagerService.setCurrentItem(item);
    this.router.navigate(['/item', item.name]);
  }
}
