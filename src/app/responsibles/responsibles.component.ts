import { Component, OnInit } from '@angular/core';
import { Responsible } from '../models/responsible';
import { ResponsibleService } from './responsibles.component.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-responsibles',
  templateUrl: './responsibles.component.html',
  styleUrls: ['./responsibles.component.scss'],
})
export class ResponsiblesComponent implements OnInit {
  responsibles: Responsible[] = [];
  loading = false;

  page = {
    limit: 10,
    count: 0,
    offset: 0,
    descricao: '',
    ativo: true,
  };

  constructor(
    private responsibleService: ResponsibleService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadResponsibles();
  }

  loadResponsibles() {
    this.loading = true;

    this.responsibleService.getAll(this.page).subscribe({
      next: (responsible: any) => {
        console.log(responsible);

        this.responsibles = responsible;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Erro ao carregar clientes.', 'Erro');
      },
    });
  }

  newResponsible() {
    this.router.navigate(['./new'], { relativeTo: this.route });
  }

  formatarNumeroTelefone(numero: number): string {
    return `(${numero.toString().substring(0, 2)}) ${numero
      .toString()
      .substring(2, 3)} ${numero.toString().substring(3, 7)}-${numero
      .toString()
      .substring(7)}`;
  }

  editResponsible(responsible: Responsible) {
    console.log(responsible);
  }

  deleteResponsible(responsible: Responsible) {
    console.log(responsible);
  }
}
