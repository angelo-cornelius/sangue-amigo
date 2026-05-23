import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SangueAmigoService } from '../../services/sangue-amigo';
import { Hemocentro } from '../../models/hemocentro';
import { TipoSanguineo, TIPOS_SANGUINEOS } from '../../models/doador';
import { Icon } from '../shared/icon/icon';
import { MapaHemocentros } from '../shared/mapa-hemocentros/mapa-hemocentros';
import { EmptyAnim } from '../shared/empty-anim/empty-anim';

@Component({
  selector: 'app-hemocentros',
  imports: [RouterLink, FormsModule, Icon, MapaHemocentros, EmptyAnim],
  templateUrl: './hemocentros.html',
  styleUrl: './hemocentros.css',
})
export class Hemocentros implements OnInit {
  private service = inject(SangueAmigoService);
  private route = inject(ActivatedRoute);

  tipos: TipoSanguineo[] = TIPOS_SANGUINEOS;
  todos = signal<Hemocentro[]>([]);
  filtroTipo = signal<TipoSanguineo | ''>('');
  filtroCidade = signal('');
  distanciaMax = signal<number | null>(null);

  filtrados = computed(() => {
    const tipo = this.filtroTipo();
    const cidade = this.filtroCidade().trim().toLowerCase();
    return this.todos().filter(h => {
      const tipoOk = !tipo || (h.estoque ?? []).some(e =>
        e.tipo_sanguineo === tipo && (e.unidades_disponiveis ?? 0) > 0
      );
      const cidadeOk = !cidade || h.cidade.toLowerCase().includes(cidade);
      return tipoOk && cidadeOk;
    });
  });

  ngOnInit(): void {
    this.service.listarHemocentros().subscribe(d => this.todos.set(d));
    const d = this.route.snapshot.queryParamMap.get('distancia');
    if (d) {
      const n = Number(d);
      if (Number.isFinite(n)) this.distanciaMax.set(n);
    }
  }

  selecionarTipo(t: TipoSanguineo | ''): void {
    this.filtroTipo.set(t);
  }
}
