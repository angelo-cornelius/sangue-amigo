import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { SangueAmigoService } from '../../services/sangue-amigo';
import { SessaoService } from '../../services/sessao';
import { Doador, TipoSanguineo, TIPOS_SANGUINEOS, Sexo } from '../../models/doador';
import { Icon } from '../shared/icon/icon';

@Component({
  selector: 'app-cadastro-doador',
  imports: [FormsModule, RouterLink, Icon],
  templateUrl: './cadastro-doador.html',
  styleUrl: './cadastro-doador.css',
})
export class CadastroDoador {
  private service = inject(SangueAmigoService);
  private sessao = inject(SessaoService);
  private router = inject(Router);

  tipos: TipoSanguineo[] = TIPOS_SANGUINEOS;

  nome = '';
  CPF = '';
  email = '';
  telefone = '';
  estado = '';
  cidade = '';
  bairro = '';
  logradouro = '';
  tipo_sanguineo: TipoSanguineo | '' = '';
  sexo: Sexo | '' = '';
  idade: number | null = null;
  peso: number | null = null;
  altura: number | null = null;

  enviando = signal(false);
  erro = signal('');
  sucesso = signal('');

  cadastrar(): void {
    this.erro.set('');
    this.sucesso.set('');

    const faltando: string[] = [];
    if (!this.nome) faltando.push('nome');
    if (!this.CPF) faltando.push('CPF');
    if (!this.email) faltando.push('e-mail');
    if (!this.telefone) faltando.push('telefone');
    if (!this.cidade) faltando.push('cidade');
    if (!this.bairro) faltando.push('bairro');
    if (!this.logradouro) faltando.push('logradouro');
    if (!this.tipo_sanguineo) faltando.push('tipo sanguíneo');
    if (this.idade == null) faltando.push('idade');
    if (this.peso == null) faltando.push('peso');
    if (this.altura == null) faltando.push('altura');

    if (faltando.length > 0) {
      this.erro.set(`Preencha os campos obrigatórios: ${faltando.join(', ')}.`);
      return;
    }

    const doador: Doador = {
      nome: this.nome,
      CPF: this.CPF,
      email: this.email,
      telefone: this.telefone,
      cidade: this.cidade,
      bairro: this.bairro,
      logradouro: this.logradouro,
      tipo_sanguineo: this.tipo_sanguineo as TipoSanguineo,
      idade: Math.trunc(Number(this.idade)),
      peso: parseFloat(String(this.peso)),
      altura: parseFloat(String(this.altura)),
      ...(this.sexo ? { sexo: this.sexo as Sexo } : {})
    };

    this.enviando.set(true);
    this.service.cadastrarDoador(doador).subscribe({
      next: (res) => {
        this.enviando.set(false);
        this.sucesso.set('Cadastro realizado com sucesso!');
        this.sessao.setUsuario(res.paciente);
        setTimeout(() => this.router.navigate(['/home']), 800);
      },
      error: (e) => {
        this.enviando.set(false);
        this.erro.set(e?.error?.erro ?? 'Falha ao cadastrar. Verifique se a API Flask está rodando em localhost:5000.');
      }
    });
  }
}
