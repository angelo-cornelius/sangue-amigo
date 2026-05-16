import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { SangueAmigoService } from '../../services/sangue-amigo';
import { SessaoService } from '../../services/sessao';
import { Doador, TipoSanguineo, TIPOS_SANGUINEOS, Sexo } from '../../models/doador';

@Component({
  selector: 'app-cadastro-doador',
  imports: [FormsModule, RouterLink],
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
    if (!this.nome || !this.CPF || !this.tipo_sanguineo) {
      this.erro.set('Nome, CPF e tipo sanguíneo são obrigatórios.');
      return;
    }
    const doador: Doador = {
      nome: this.nome,
      CPF: this.CPF,
      email: this.email || undefined,
      telefone: this.telefone || undefined,
      cidade: this.cidade || undefined,
      bairro: this.bairro || undefined,
      logradouro: this.logradouro || undefined,
      tipo_sanguineo: this.tipo_sanguineo,
      sexo: this.sexo || undefined,
      idade: this.idade ?? undefined,
      peso: this.peso ?? undefined,
      altura: this.altura ?? undefined
    };

    this.enviando.set(true);
    this.service.cadastrarDoador(doador).subscribe({
      next: () => {
        this.enviando.set(false);
        this.sucesso.set('Cadastro realizado com sucesso!');
        this.sessao.setUsuario({ ...doador, id: 1 });
        setTimeout(() => this.router.navigate(['/home']), 800);
      },
      error: (e) => {
        this.enviando.set(false);
        this.erro.set(e?.error?.erro ?? 'Falha ao cadastrar. Verifique se a API Flask está rodando em localhost:5000.');
      }
    });
  }
}
