import { Routes } from '@angular/router';
import { ItemManagerComponent } from './Item-manager/item-manager.component';
import { ItemEditorComponent } from './item-editor/item-editor.component';

export const routes: Routes = [
  {
    path: '',
    component: ItemManagerComponent,
  },
  {
    path: 'item/:id',
    component: ItemEditorComponent,
  },
  {
    path: 'new',
    component: ItemEditorComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
