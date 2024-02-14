import { Component, OnInit } from '@angular/core';
import { Responsible } from '../models/responsible';
import { ResponsibleService } from './responsibles.component.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmModalComponent } from '../shared/components/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadResponsibles();
  }

  loadResponsibles() {
    this.loading = true;

    this.responsibleService.getAll(this.page).subscribe({
      next: (responsible: any) => {
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

  editResponsible(responsible: Responsible) {
    this.router.navigate(['./edit/' + responsible.id], {
      relativeTo: this.route,
    });
  }

  deleteResponsible(id: number) {
    this.responsibleService.deleteResponsible(id).subscribe({
      next: () => {
        this.toastr.warning('Responsável excluído com sucesso!', 'Sucesso');
        this.loadResponsibles();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error(
          'Erro ao excluir responsável',
          'Não foi possível exluir'
        );
      },
    });
  }

  openConfirmationModal(customerId: number) {
    const modalRef = this.modalService.open(ConfirmModalComponent);

    modalRef.result
      .then((result) => {
        this.loading = true;
        if (result === 'confirm') {
          this.deleteResponsible(customerId);
        }
      })
      .catch(() => {});
    this.loading = false;
    modalRef.componentInstance.message =
      'Tem certeza de que deseja excluir este responsável?';
  }

  formatarNumeroTelefone(numero: number): string {
    return `(${numero.toString().substring(0, 2)}) ${numero
      .toString()
      .substring(2, 3)} ${numero.toString().substring(3, 7)}-${numero
      .toString()
      .substring(7)}`;
  }
}
