import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { SangueAmigoService } from '../../services/sangue-amigo';
import { SessaoService } from '../../services/sessao';
import { Hemocentro } from '../../models/hemocentro';
import { Icon } from '../shared/icon/icon';

@Component({
  selector: 'app-agendar',
  imports: [FormsModule, Icon],
  templateUrl: './agendar.html',
  styleUrl: './agendar.css',
})
export class Agendar implements OnInit {
  private service = inject(SangueAmigoService);
  private sessao = inject(SessaoService);
  private router = inject(Router);

  hemocentros = signal<Hemocentro[]>([]);
  hemocentroSelecionado: number | null = null;
  horario = '';

  horariosFixos = ['08:00', '08:30', '09:00', '10:30', '14:00', '15:30'];

  enviando = signal(false);
  erro = signal('');
  sucesso = signal('');

  ngOnInit(): void {
    this.service.listarHemocentros().subscribe(d => this.hemocentros.set(d));
  }

  agendar(): void {
    this.erro.set('');
    this.sucesso.set('');
    const idPaciente = this.sessao.usuario()?.id ?? 1;

    if (!this.hemocentroSelecionado || !this.horario) {
      this.erro.set('Selecione o hemocentro e o horário.');
      return;
    }
    const hemo = this.hemocentros().find(h => h.id === this.hemocentroSelecionado);
    if (!hemo) {
      this.erro.set('Hemocentro inválido.');
      return;
    }

    this.enviando.set(true);
    this.service.criarAgendamento({
      id_paciente: idPaciente,
      nome_hospital: hemo.nome,
      data_hora: this.horario
    }).subscribe({
      next: () => {
        this.enviando.set(false);
        this.sucesso.set('Agendamento criado com sucesso!');
        setTimeout(() => this.router.navigate(['/agendamentos']), 800);
      },
      error: (e) => {
        this.enviando.set(false);
        this.erro.set(e?.error?.erro ?? 'Falha ao agendar. Verifique se a API Flask está rodando.');
      }
    });
  }
}
