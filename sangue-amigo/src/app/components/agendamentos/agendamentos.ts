import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SangueAmigoService } from '../../services/sangue-amigo';
import { SessaoService } from '../../services/sessao';
import { Agendamento } from '../../models/agendamento';
import { Icon } from '../shared/icon/icon';

@Component({
  selector: 'app-agendamentos',
  imports: [RouterLink, Icon],
  templateUrl: './agendamentos.html',
  styleUrl: './agendamentos.css',
})
export class Agendamentos implements OnInit {
  private service = inject(SangueAmigoService);
  private sessao = inject(SessaoService);

  agendamentos = signal<Agendamento[]>([]);

  ngOnInit(): void {
    const id = this.sessao.usuario()?.id ?? 1;
    this.service.listarAgendamentosDoUsuario(id).subscribe(d => this.agendamentos.set(d));
  }
}
