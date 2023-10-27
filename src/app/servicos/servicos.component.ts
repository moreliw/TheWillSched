import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
})
export class ServicosComponent implements OnInit {
  services = [
    {
      name: 'Limpeza',
      description:
        'A limpeza de dentes, também chamada de profilaxia, envolve a remoção de placa bacteriana.',
      price: 60,
      creationDate: '1985-05-15',
      updateDate: '1985-05-15',
    },
    {
      name: 'Canal',
      description:
        'A limpeza de dentes, também chamada de profilaxia, envolve a remoção de placa bacteriana.',
      price: 60,
      creationDate: '1985-05-15',
      updateDate: '1985-05-15',
    },
    {
      name: 'Obturação',
      description:
        'A limpeza de dentes, também chamada de profilaxia, envolve a remoção de placa bacteriana.',
      price: 60,
      creationDate: '1985-05-15',
      updateDate: '1985-05-15',
    },
  ];

  pageSize = 5;
  currentPage = 1;

  ngOnInit(): void {}
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
  }
}
