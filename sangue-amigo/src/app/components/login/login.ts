import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { SessaoService } from '../../services/sessao';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private sessao = inject(SessaoService);
  private router = inject(Router);

  cpf = '';
  senha = '';
  erro = signal('');

  entrar(): void {
    this.erro.set('');
    if (!this.cpf || !this.senha) {
      this.erro.set('Preencha CPF e senha.');
      return;
    }
    // TODO: backend nao tem autenticacao real — login mockado pelo SessaoService
    this.sessao.login(this.cpf, this.senha);
    this.router.navigate(['/home']);
  }
}
