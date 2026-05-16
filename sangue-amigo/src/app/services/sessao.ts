import { Injectable, signal, computed } from '@angular/core';
import { Doador } from '../models/doador';

@Injectable({ providedIn: 'root' })
export class SessaoService {
  private _usuario = signal<Doador | null>(null);

  usuario = this._usuario.asReadonly();
  logado = computed(() => this._usuario() !== null);

  // TODO: backend nao tem rota de autenticacao — login eh totalmente mockado
  login(cpf: string, _senha: string): Doador | null {
    const mock: Doador = {
      id: 1,
      nome: 'Visitante',
      CPF: cpf || '000.000.000-00',
      tipo_sanguineo: 'O+',
      cidade: 'Toledo',
      sexo: 'M',
      ultima_doacao: '2025-08-28'
    };
    this._usuario.set(mock);
    return mock;
  }

  logout(): void {
    this._usuario.set(null);
  }

  setUsuario(d: Doador): void {
    this._usuario.set(d);
  }
}
