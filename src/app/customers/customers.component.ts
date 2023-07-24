import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  pacientes = [
    { nome: 'João Silva', dataNascimento: '1985-05-15', endereco: 'Rua A, 123Rua A, 123Rua A, 123Rua A, 123Rua A, 123', telefone: '(11) 1234-5678', email: 'joao@example.com' },
    { nome: 'Maria Souza', dataNascimento: '1990-10-20', endereco: 'Rua B, 456', telefone: '(22) 9876-5432', email: 'maria@example.com' },
    { nome: 'João Silva', dataNascimento: '1985-05-15', endereco: 'Rua A, 123', telefone: '(11) 1234-5678', email: 'joao@example.com' },
    { nome: 'Maria Souza', dataNascimento: '1990-10-20', endereco: 'Rua B, 456', telefone: '(22) 9876-5432', email: 'maria@example.com' },
    { nome: 'João Silva', dataNascimento: '1985-05-15', endereco: 'Rua A, 123', telefone: '(11) 1234-5678', email: 'joao@example.com' },
    { nome: 'William', dataNascimento: '1990-10-20', endereco: 'Rua B, 456', telefone: '(22) 9876-5432', email: 'maria@example.com' },
    { nome: 'William', dataNascimento: '1985-05-15', endereco: 'Rua A, 123', telefone: '(11) 1234-5678', email: 'joao@example.com' },
    { nome: 'William', dataNascimento: '1990-10-20', endereco: 'Rua B, 456', telefone: '(22) 9876-5432', email: 'maria@example.com' },
    { nome: 'William', dataNascimento: '1985-05-15', endereco: 'Rua A, 123', telefone: '(11) 1234-5678', email: 'joao@example.com' },
    { nome: 'William', dataNascimento: '1990-10-20', endereco: 'Rua B, 456', telefone: '(22) 9876-5432', email: 'maria@example.com' },
  ];

  pageSize = 5;
  currentPage = 1;

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
  }
}
