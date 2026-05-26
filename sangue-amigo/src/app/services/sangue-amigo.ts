import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Doador, TipoSanguineo } from '../models/doador';
import { Bolsa, FiltroBolsa } from '../models/bolsa';
import { Agendamento } from '../models/agendamento';
import { Doacao } from '../models/doacao';
import { Hemocentro } from '../models/hemocentro';
import { Notificacao } from '../models/notificacao';

@Injectable({ providedIn: 'root' })
export class SangueAmigoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  // ============================================================
  // DOADORES (pacientes)
  // ============================================================

  cadastrarDoador(doador: Doador): Observable<{ mensagem: string; paciente: Doador }> {
    // peso/altura precisam chegar como float no Python; JS perde o ".0" em
    // JSON.stringify, então serializamos o body manualmente.
    const body = this.serializarPaciente(doador);
    return this.http.post<{ mensagem: string; paciente: Doador }>(
      `${this.apiUrl}/pacientes`,
      body,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  private serializarPaciente(d: Doador): string {
    const obj: Record<string, unknown> = { ...d };
    delete obj['peso'];
    delete obj['altura'];
    const base = JSON.stringify(obj);
    const partes: string[] = [];
    if (d.peso !== undefined && d.peso !== null) {
      partes.push(`"peso":${Number(d.peso).toFixed(2)}`);
    }
    if (d.altura !== undefined && d.altura !== null) {
      partes.push(`"altura":${Number(d.altura).toFixed(2)}`);
    }
    if (partes.length === 0) return base;
    const sep = base === '{}' ? '' : ',';
    return base.slice(0, -1) + sep + partes.join(',') + '}';
  }

  // FAKE: backend nao tem rota GET /pacientes (listar todos). Mock local ate
  // que a rota exista no back.
  listarDoadores(): Observable<Doador[]> {
    return of(this.doadoresMock);
  }

  getDoador(id: number): Observable<Doador> {
    return this.http.get<Doador>(`${this.apiUrl}/pacientes/${id}`);
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
    return this.http.get<Bolsa>(`${this.apiUrl}/bolsas/${id}`);
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
      `${this.apiUrl}/agendamentos`,
      ag
    );
  }

  listarAgendamentosDoUsuario(idPaciente: number): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/agendamentos/${idPaciente}`);
  }

  // ============================================================
  // NOTIFICACOES
  // ============================================================

  listarNotificacoes(idPaciente: number): Observable<Notificacao[]> {
    return this.http.get<Notificacao[]>(`${this.apiUrl}/notificacoes/${idPaciente}`);
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

  // FAKE: backend so expoe POST /doacoes, nao tem GET. Mock local ate que
  // a rota de leitura exista no back.
  listarDoacoesDoUsuario(idPaciente: number): Observable<Doacao[]> {
    return of(this.doacoesMock.filter(x => x.id_paciente === idPaciente));
  }

  // ============================================================
  // HEMOCENTROS
  // FAKE: a entidade Hemocentro nao existe no backend. Toda a secao abaixo
  // depende de mock local ate que o back exponha as rotas.
  // ============================================================

  listarHemocentros(): Observable<Hemocentro[]> {
    return of(this.hemocentrosMock);
  }

  getHemocentro(id: number): Observable<Hemocentro | undefined> {
    return of(this.hemocentrosMock.find(h => h.id === id));
  }

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
