import { TipoSanguineo } from './doador';

export type NivelEstoque = 'critico' | 'baixo' | 'normal' | 'alto';

export interface EstoqueItem {
  tipo_sanguineo: TipoSanguineo;
  nivel: NivelEstoque;
  unidades_disponiveis: number;
}

export interface Hemocentro {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
  endereco: string;
  horario_funcionamento: string;
  latitude?: number;
  longitude?: number;
  estoque?: EstoqueItem[];
}
