import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SessaoService } from '../../services/sessao';
import { SangueAmigoService } from '../../services/sangue-amigo';
import { Hemocentro, EstoqueItem } from '../../models/hemocentro';
import { Agendamento } from '../../models/agendamento';
import { TipoSanguineo } from '../../models/doador';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  sessao = inject(SessaoService);
  private service = inject(SangueAmigoService);

  hemocentros = signal<Hemocentro[]>([]);
  agendamentos = signal<Agendamento[]>([]);

  tiposCriticos = computed<TipoSanguineo[]>(() => {
    const set = new Set<TipoSanguineo>();
    for (const h of this.hemocentros()) {
      for (const e of (h.estoque ?? []) as EstoqueItem[]) {
        if (e.nivel === 'critico') set.add(e.tipo_sanguineo);
      }
    }
    return Array.from(set);
  });

  nome = computed(() => this.sessao.usuario()?.nome ?? 'Visitante');
  tipoUsuario = computed(() => this.sessao.usuario()?.tipo_sanguineo ?? 'O+');
  cidade = computed(() => this.sessao.usuario()?.cidade ?? 'Toledo, PR');

  ngOnInit(): void {
    this.service.listarHemocentros().subscribe(d => this.hemocentros.set(d));
    const id = this.sessao.usuario()?.id ?? 1;
    this.service.listarAgendamentosDoUsuario(id).subscribe(d => this.agendamentos.set(d));
  }
}
