import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SessaoService } from '../../../services/sessao';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  sessao = inject(SessaoService);
  private router = inject(Router);

  menuAberto = signal(false);

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.menuAberto.set(false));
  }

  alternarMenu(): void {
    this.menuAberto.update(v => !v);
  }

  sair(): void {
    this.sessao.logout();
    this.router.navigate(['/']);
  }
}
