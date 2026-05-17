import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SangueAmigoService } from '../../services/sangue-amigo';
import { Hemocentro } from '../../models/hemocentro';
import { Icon } from '../shared/icon/icon';

type Nivel = 'critico' | 'baixo' | 'normal' | 'alto' | string;

@Component({
  selector: 'app-hemocentro-detalhe',
  imports: [RouterLink, Icon],
  templateUrl: './hemocentro-detalhe.html',
  styleUrl: './hemocentro-detalhe.css',
})
export class HemocentroDetalhe implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(SangueAmigoService);

  hemocentro = signal<Hemocentro | undefined>(undefined);

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id') ?? '';
    const id = Number(idStr);
    if (!Number.isFinite(id)) return;
    this.service.getHemocentro(id).subscribe(h => this.hemocentro.set(h));
  }

  percentual(nivel: Nivel): number {
    switch (nivel) {
      case 'critico': return 15;
      case 'baixo':   return 38;
      case 'normal':  return 68;
      case 'alto':    return 92;
      default:        return 50;
    }
  }
}
