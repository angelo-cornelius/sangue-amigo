import { Component, inject, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SessaoService } from '../../services/sessao';
import { Icon } from '../shared/icon/icon';

@Component({
  selector: 'app-elegibilidade',
  imports: [RouterLink, Icon],
  templateUrl: './elegibilidade.html',
  styleUrl: './elegibilidade.css',
})
export class Elegibilidade {
  private sessao = inject(SessaoService);

  hoje = signal(new Date());

  private intervaloDias = computed(() => {
    const sx = this.sessao.usuario()?.sexo;
    return sx === 'F' ? 90 : 60;
  });

  private diasDesdeUltima = computed<number | null>(() => {
    const ultima = this.sessao.usuario()?.ultima_doacao;
    if (!ultima) return null;
    const d = new Date(ultima);
    if (isNaN(d.getTime())) return null;
    const diff = this.hoje().getTime() - d.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  });

  percentual = computed<number>(() => {
    const d = this.diasDesdeUltima();
    const total = this.intervaloDias();
    if (d === null) return 100;
    if (d >= total) return 100;
    return Math.round((d / total) * 100);
  });

  elegivel = computed(() => this.percentual() >= 100);

  mensagem = computed(() => {
    if (this.elegivel()) return 'Você está pronto para doar!';
    const restante = (this.intervaloDias() - (this.diasDesdeUltima() ?? 0));
    return `Faltam ${restante} dia${restante === 1 ? '' : 's'} para sua próxima doação.`;
  });

  raio = 80;
  circunferencia = computed(() => 2 * Math.PI * this.raio);
  offset = computed(() => this.circunferencia() * (1 - this.percentual() / 100));
}
