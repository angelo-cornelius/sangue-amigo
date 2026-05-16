import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SangueAmigoService } from '../../services/sangue-amigo';
import { SessaoService } from '../../services/sessao';
import { Doacao } from '../../models/doacao';

@Component({
  selector: 'app-historico-doacoes',
  imports: [FormsModule],
  templateUrl: './historico-doacoes.html',
  styleUrl: './historico-doacoes.css',
})
export class HistoricoDoacoes implements OnInit {
  private service = inject(SangueAmigoService);
  private sessao = inject(SessaoService);

  doacoes = signal<Doacao[]>([]);
  dataNova = '';
  enviando = signal(false);
  erro = signal('');
  sucesso = signal('');

  ngOnInit(): void {
    this.recarregar();
  }

  recarregar(): void {
    const id = this.sessao.usuario()?.id ?? 1;
    this.service.listarDoacoesDoUsuario(id).subscribe(d => this.doacoes.set(d));
  }

  registrar(): void {
    this.erro.set('');
    this.sucesso.set('');
    if (!this.dataNova) {
      this.erro.set('Informe a data da doação.');
      return;
    }
    const usuario = this.sessao.usuario();
    if (!usuario) {
      this.erro.set('Faça login para registrar doações.');
      return;
    }
    this.enviando.set(true);
    this.service.registrarDoacao({
      id_paciente: usuario.id ?? 1,
      tipo_sanguineo: usuario.tipo_sanguineo,
      ultima_doacao: this.dataNova
    }).subscribe({
      next: () => {
        this.enviando.set(false);
        this.sucesso.set('Doação registrada com sucesso!');
        this.dataNova = '';
        this.recarregar();
      },
      error: (e) => {
        this.enviando.set(false);
        this.erro.set(e?.error?.erro ?? 'Falha ao registrar doação.');
      }
    });
  }
}
