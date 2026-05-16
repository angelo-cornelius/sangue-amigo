export type TipoSanguineo =
  | 'A+' | 'A-'
  | 'B+' | 'B-'
  | 'AB+' | 'AB-'
  | 'O+' | 'O-';

export const TIPOS_SANGUINEOS: TipoSanguineo[] = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

export type Sexo = 'M' | 'F';

export interface Doador {
  id?: number;
  nome: string;
  CPF: string;
  idade?: number;
  peso?: number;
  altura?: number;
  tipo_sanguineo: TipoSanguineo;
  cidade?: string;
  bairro?: string;
  logradouro?: string;
  telefone?: string;
  email?: string;
  sexo?: Sexo;
  ultima_doacao?: string;
}
