import { TipoSanguineo } from './doador';

export type StatusBolsa = 'disponivel' | 'reservada' | 'utilizada' | 'vencida';

export interface Bolsa {
  id: number;
  idUsuario?: number;
  iddoacao_sangue?: number;
  idcentro_doacao?: number;
  tipo_sanguineo: TipoSanguineo;
  volume?: number;
  status?: StatusBolsa;
  data_expiracao?: string;
  hospital?: string;
}

export interface FiltroBolsa {
  tipo_sanguineo?: TipoSanguineo;
  status?: StatusBolsa;
  hospital?: string;
}
