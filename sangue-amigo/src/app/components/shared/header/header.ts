import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

import { SessaoService } from '../../../services/sessao';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  sessao = inject(SessaoService);
  private router = inject(Router);

  sair(): void {
    this.sessao.logout();
    this.router.navigate(['/']);
  }
}
