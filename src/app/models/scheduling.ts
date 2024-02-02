import { ESchedulingStatus } from '../enum/ESchedulingStatus';
import { Customer } from './customer';
import { Responsible } from './responsible';

export class Scheduling {
  id: number;
  idCliente: number;
  cliente: Customer;
  idResponsavel: number;
  responsavel: Responsible;
  dataConsulta: string;
  horaConsulta: string;
  status: ESchedulingStatus;
  observacoes: string;
  dataCadastro: string;
  dataAtualizacao: string;
}
