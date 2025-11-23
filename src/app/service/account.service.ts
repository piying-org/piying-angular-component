import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  router = inject(Router);
  login() {
    return this.router.navigateByUrl('/main/component');
  }
}
