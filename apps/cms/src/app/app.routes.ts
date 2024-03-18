import { Routes } from '@angular/router';
import { ItemManagerComponent } from './Item-manager/Item-manager.component';

export const routes: Routes = [
  {
    path: 'items/edit',
    component: ItemManagerComponent,
  },
];
