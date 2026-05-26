import { Component, inject, OnInit, signal } from '@angular/core';
import { Icon } from '../shared/icon/icon';
import { EmptyAnim } from '../shared/empty-anim/empty-anim';
import { SangueAmigoService } from '../../services/sangue-amigo';
import { SessaoService } from '../../services/sessao';
import { Notificacao } from '../../models/notificacao';

@Component({
  selector: 'app-notificacoes',
  imports: [Icon, EmptyAnim],
  templateUrl: './notificacoes.html',
  styleUrl: './notificacoes.css',
})
export class Notificacoes implements OnInit {
  private service = inject(SangueAmigoService);
  private sessao = inject(SessaoService);

  notificacoes = signal<Notificacao[]>([]);
  erro = signal('');

  ngOnInit(): void {
    const id = this.sessao.usuario()?.id;
    if (id == null) {
      this.erro.set('Você precisa estar logado para ver suas notificações.');
      return;
    }
    this.service.listarNotificacoes(id).subscribe({
      next: ns => this.notificacoes.set(ns),
      error: () => this.erro.set('Não foi possível carregar as notificações.')
    });
  }
}
