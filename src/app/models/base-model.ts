export interface BaseModel<T> {
  itens: T[];
  totalItens: number;
  tamanhoPagina: number;
  totalPaginas: number;
  paginaAtual: number;
  data?: T;
  // file: string;
  messages?: string[];
  statusCode?: number;
  success?: boolean;

  // TODO Remover
  message?: string;
  value?: T;
  errors?: string[];
  hasError?: boolean;
}
