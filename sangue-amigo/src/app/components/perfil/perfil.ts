import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SessaoService } from '../../services/sessao';
import { SangueAmigoService } from '../../services/sangue-amigo';
import { Doacao } from '../../models/doacao';

interface Conquista {
  id: number;
  titulo: string;
  descricao: string;
  conquistada: boolean;
}

@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  sessao = inject(SessaoService);
  private service = inject(SangueAmigoService);

  doacoes = signal<Doacao[]>([]);
  metaTotal = 3;

  totalRealizadas = computed(() => this.doacoes().length);

  vidasImpactadas = computed(() => this.totalRealizadas() * 4);

  ultimaDoacao = computed(() => {
    const lista = this.doacoes();
    if (lista.length === 0) return null;
    return [...lista].sort((a, b) => b.ultima_doacao.localeCompare(a.ultima_doacao))[0].ultima_doacao;
  });

  proximaData = computed(() => {
    const u = this.ultimaDoacao();
    if (!u) return null;
    const d = new Date(u);
    if (isNaN(d.getTime())) return null;
    const dias = this.sessao.usuario()?.sexo === 'F' ? 90 : 60;
    d.setDate(d.getDate() + dias);
    return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  });

  conquistas: Conquista[] = [
    { id: 1, titulo: 'Saúde em dia', descricao: 'Realize seu primeiro exame', conquistada: true },
    { id: 2, titulo: 'Primeira gota', descricao: 'Realize sua primeira doação de sangue', conquistada: true },
    { id: 3, titulo: 'Doador frequente', descricao: 'Atinja 5 doações', conquistada: false }
  ];

  ngOnInit(): void {
    const id = this.sessao.usuario()?.id ?? 1;
    this.service.listarDoacoesDoUsuario(id).subscribe(d => this.doacoes.set(d));
  }
}
