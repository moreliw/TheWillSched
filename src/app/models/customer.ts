export class Customer {
  id: string;
  nome: string;
  dataNascimento: string;
  email: string;
  telefone: number;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  dataCadastro: string;
  dataUltimaAtualizacao: string;
  dataDesativacao: string;
  ativo: boolean;
  constructor() {
    this.id = '';
    this.nome = '';
    this.dataNascimento = '';
    this.email = '';
    this.telefone = 0;
    this.endereco = '';
    this.cidade = '';
    this.estado = '';
    this.cep = '';
    this.dataCadastro = '';
    this.dataUltimaAtualizacao = '';
    this.dataDesativacao = '';
    this.ativo = true;
  }
}
