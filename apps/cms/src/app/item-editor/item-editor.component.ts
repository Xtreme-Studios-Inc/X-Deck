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
import { ActivatedRoute } from '@angular/router';
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
      title: 'Edit Item',
      titleBarLink: '/',
    },
    actionItems: [
      {
        label: 'Save',
        onClick: () => {
          // this.updateItem(this.form?.form);
        },
        icon: {
          name: 'plus',
          size: 'md',
        },
      },
    ],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
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

  updateItem(form: FormSubmitEvent) {
    this.itemManager.updateItem(form as Item).subscribe((item) => {
      this.item = item;
      this.cd.markForCheck();
    });
  }
}
