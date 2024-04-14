import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
  type OnInit,
} from '@angular/core';
import { DeckItemComponent } from '../deck-item/deck-item.component';
import {
  BaseComponentModule,
  FormComponent,
  FormSubmitEvent,
  NavBarConfig,
} from '@xtreme-studios/x-components';
import { Item } from '../types/x-deck-types';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemManagerService } from '../services/item-manager.service';

@Component({
  selector: 'x-item-editor',
  standalone: true,
  imports: [CommonModule, DeckItemComponent, BaseComponentModule],
  templateUrl: './item-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'x-item-editor',
  },
})
export class ItemEditorComponent implements OnInit, AfterViewInit {
  item: Item | null = null;

  @ViewChild(FormComponent) form?: FormComponent;

  navConfig: NavBarConfig = {
    navBarTitle: {
      title: '< Edit Item',
      titleBarLink: '/',
    },
    actionItems: [
      {
        label: 'Save',
        onClick: () => {
          this.updateItem();
        },
        icon: {
          name: 'floppy-disk',
          size: 'sm',
          style: 'thin',
          color: 'green',
        },
      },
      {
        label: 'Delete',
        onClick: () => {
          this.deleteItem();
        },
        icon: {
          name: 'trash',
          size: 'sm',
          style: 'solid',
          color: 'red',
        },
      },
    ],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemManager: ItemManagerService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const itemId = params.get('id');
      if (itemId) {
        this.itemManager.getItem(itemId).subscribe((item) => {
          this.item = item;
        });
      }
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.form?.setFormValues(this.item ?? {});
  }

  updateItem(form?: FormSubmitEvent) {
    if (
      this.activatedRoute.snapshot.url
        .map((segment) => segment.path)
        .join('/') === 'new'
    ) {
      this.itemManager
        .createItem(this.form?.getFormValues() as Item)
        .subscribe((item) => {
          this.item = item;
          console.log(item);
          this.router.navigate(['/item', item.name]);
        });
    }

    let detail: Item;

    if (!form) {
      detail = this.form?.getFormValues() as Item;
    } else detail = form as Item;

    this.itemManager.updateItem(detail).subscribe((item) => {
      this.item = item;
      this.cd.markForCheck();
    });
  }

  deleteItem() {
    this.itemManager.deleteItem(this.item as Item).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
