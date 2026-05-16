import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Doador, TipoSanguineo } from '../models/doador';
import { Bolsa, FiltroBolsa } from '../models/bolsa';
import { Agendamento } from '../models/agendamento';
import { Doacao } from '../models/doacao';
import { Hemocentro } from '../models/hemocentro';

@Injectable({ providedIn: 'root' })
export class SangueAmigoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  // ============================================================
  // DOADORES (pacientes)
  // ============================================================

  cadastrarDoador(doador: Doador): Observable<{ mensagem: string; paciente: Doador }> {
    return this.http.post<{ mensagem: string; paciente: Doador }>(
      `${this.apiUrl}/pacientes`,
      doador
    );
  }

  // TODO: backend ainda nao expoe GET /pacientes — usando mock local
  listarDoadores(): Observable<Doador[]> {
    return of(this.doadoresMock);
  }

  // TODO: backend ainda nao expoe GET /pacientes/:id — usando mock local
  getDoador(id: number): Observable<Doador | undefined> {
    return of(this.doadoresMock.find(d => d.id === id));
  }

  // ============================================================
  // BOLSAS DE SANGUE
  // ============================================================

  listarBolsas(filtros?: FiltroBolsa): Observable<Bolsa[]> {
    let params = new HttpParams();
    if (filtros?.tipo_sanguineo) params = params.set('tipo_sanguineo', filtros.tipo_sanguineo);
    if (filtros?.status) params = params.set('status', filtros.status);
    if (filtros?.hospital) params = params.set('hospital', filtros.hospital);
    return this.http.get<Bolsa[]>(`${this.apiUrl}/bolsas`, { params });
  }

  getBolsa(id: number): Observable<Bolsa> {
    return this.http.get<Bolsa>(`${this.apiUrl}/bolsa/${id}`);
  }

  criarBolsa(bolsa: Bolsa): Observable<{ mensagem: string; bolsas: Bolsa }> {
    return this.http.post<{ mensagem: string; bolsas: Bolsa }>(
      `${this.apiUrl}/bolsas`,
      bolsa
    );
  }

  atualizarBolsa(id: number, dados: Partial<Bolsa>): Observable<Bolsa> {
    return this.http.put<Bolsa>(`${this.apiUrl}/bolsas/${id}`, dados);
  }

  deletarBolsa(id: number): Observable<{ mensagem: string }> {
    return this.http.delete<{ mensagem: string }>(`${this.apiUrl}/bolsas/${id}`);
  }

  // ============================================================
  // AGENDAMENTOS
  // ============================================================

  criarAgendamento(ag: Agendamento): Observable<{ mensagem: string; agendamento: Agendamento }> {
    return this.http.post<{ mensagem: string; agendamento: Agendamento }>(
      `${this.apiUrl}/agendamento`,
      ag
    );
  }

  // TODO: backend ainda nao expoe GET /agendamentos — usando mock local
  listarAgendamentosDoUsuario(idPaciente: number): Observable<Agendamento[]> {
    return of(this.agendamentosMock.filter(a => a.id_paciente === idPaciente));
  }

  // ============================================================
  // DOACOES
  // ============================================================

  registrarDoacao(d: Doacao): Observable<{ mensagem: string; doacao: Doacao }> {
    return this.http.post<{ mensagem: string; doacao: Doacao }>(
      `${this.apiUrl}/doacoes`,
      d
    );
  }

  // TODO: backend ainda nao expoe GET /doacoes — usando mock local
  listarDoacoesDoUsuario(idPaciente: number): Observable<Doacao[]> {
    return of(this.doacoesMock.filter(x => x.id_paciente === idPaciente));
  }

  // ============================================================
  // HEMOCENTROS (entidade nao existe no backend — 100% mock)
  // ============================================================

  // TODO: backend nao tem rotas de hemocentros — toda a secao abaixo eh mock
  listarHemocentros(): Observable<Hemocentro[]> {
    return of(this.hemocentrosMock);
  }

  // TODO: backend nao tem rotas de hemocentros — mock
  getHemocentro(id: number): Observable<Hemocentro | undefined> {
    return of(this.hemocentrosMock.find(h => h.id === id));
  }

  // TODO: backend nao tem rotas de hemocentros — mock
  getEstoqueHemocentro(id: number): Observable<Hemocentro['estoque']> {
    const h = this.hemocentrosMock.find(x => x.id === id);
    return of(h?.estoque ?? []);
  }

  // ============================================================
  // MOCKS (dados estaticos enquanto o backend nao tem GETs prontos)
  // ============================================================

  private doadoresMock: Doador[] = [
    {
      id: 1,
      nome: 'Visitante',
      CPF: '000.000.000-00',
      tipo_sanguineo: 'O+',
      cidade: 'Toledo',
      bairro: 'Centro',
      sexo: 'M',
      ultima_doacao: '2025-08-28'
    }
  ];

  private agendamentosMock: Agendamento[] = [];

  private doacoesMock: Doacao[] = [
    { id: 1, id_paciente: 1, tipo_sanguineo: 'O+', ultima_doacao: '2025-08-28' },
    { id: 2, id_paciente: 1, tipo_sanguineo: 'O+', ultima_doacao: '2025-04-15' }
  ];

  private hemocentrosMock: Hemocentro[] = [
    {
      id: 1,
      nome: 'Hemocentro Hemepar - Toledo',
      cidade: 'Toledo',
      estado: 'PR',
      endereco: 'R. Eugenio Gustavo Keler, 1612',
      horario_funcionamento: '08:00 - 11:00 / 13:00 - 15:00',
      latitude: -24.7246,
      longitude: -53.7412,
      estoque: this.gerarEstoque(['A-', 'B+', 'O+'])
    },
    {
      id: 2,
      nome: 'Hemocentro CISCOPAR',
      cidade: 'Toledo',
      estado: 'PR',
      endereco: 'R. Rodrigues Alves, 500',
      horario_funcionamento: '07:30 - 12:00 / 14:00 - 17:00',
      latitude: -24.7290,
      longitude: -53.7430,
      estoque: this.gerarEstoque(['AB-'])
    },
    {
      id: 3,
      nome: 'Hemepar Cascavel',
      cidade: 'Cascavel',
      estado: 'PR',
      endereco: 'Av. Brasil, 8500',
      horario_funcionamento: '08:00 - 17:00',
      latitude: -24.9555,
      longitude: -53.4552,
      estoque: this.gerarEstoque(['O-', 'B-'])
    }
  ];

  private gerarEstoque(criticos: TipoSanguineo[]) {
    const todos: TipoSanguineo[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    return todos.map(tipo => {
      const critico = criticos.includes(tipo);
      return {
        tipo_sanguineo: tipo,
        nivel: critico ? ('critico' as const) : ('normal' as const),
        unidades_disponiveis: critico ? Math.floor(Math.random() * 5) : 20 + Math.floor(Math.random() * 30)
      };
    });
  }
}
