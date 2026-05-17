import { Component, signal } from '@angular/core';
import { Icon } from '../shared/icon/icon';

interface Notificacao {
  id: number;
  titulo: string;
  data: string;
  lida: boolean;
}

@Component({
  selector: 'app-notificacoes',
  imports: [Icon],
  templateUrl: './notificacoes.html',
  styleUrl: './notificacoes.css',
})
export class Notificacoes {
  notificacoes = signal<Notificacao[]>([
    { id: 1, titulo: 'Os resultados do seu exame estão prontos!', data: '24 de agosto de 2025', lida: false },
    { id: 2, titulo: 'Estoque de O+ em estado crítico próximo a você', data: '18 de agosto de 2025', lida: true }
  ]);
}
