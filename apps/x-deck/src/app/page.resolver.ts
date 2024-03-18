import type { ResolveFn } from '@angular/router';

export const pageResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
