import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsible } from 'src/app/models/responsible';
import { ResponsibleService } from '../responsibles.component.service';
import { formatDate } from '@angular/common';
import { ViaCepService } from 'src/app/shared/services/viacepapi.service';
import { ViaCepModel } from 'src/app/shared/models/viaCepModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-responsible-form',
  templateUrl: './responsible-form.component.html',
  styleUrls: ['./responsible-form.component.scss'],
})
export class ResponsibleFormComponent implements OnInit {
  @Input() isEdit = false;
  responsibleForm: FormGroup;
  responsible: Responsible;
  id: any;
  title = 'Cadastro de Responsável';
  buttonTitle = 'CADASTRAR';
  geners = ['Masculiuno', 'Feminino', 'Não binário'];
  public loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private responsibleService: ResponsibleService,
    private viaCepService: ViaCepService,
    private toastr: ToastrService
  ) {
    this.responsible = new Responsible();
  }

  ngOnInit(): void {
    this.responsibleForm = this.formBuilder.group({
      nome: ['', Validators.nullValidator],
      dataNascimento: [
        '',
        [Validators.required, Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)],
      ],
      sexo: ['', Validators.nullValidator],
      email: ['', Validators.nullValidator],
      endereco: ['', Validators.nullValidator],
      cidade: ['', Validators.nullValidator],
      estado: ['', Validators.nullValidator],
      cep: ['', Validators.nullValidator],
      telefone: ['', Validators.nullValidator],
    });

    this.getData();
  }

  private getData() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id !== undefined && this.id != null) {
      this.loading = true;
      this.responsibleService.getById(this.id).subscribe((result: any) => {
        if (result) {
          this.responsible = result.data;
          this.isEdit = true;
          this.title = 'Editar Cliente';
          this.buttonTitle = 'ATUALIZAR';

          const dataNascimentoFormatted = new Date(
            this.responsible.dataNascimento
          )
            .toISOString()
            .split('T')[0];

          const formValues = {
            nome: this.responsible.nome,
            dataNascimento: dataNascimentoFormatted,
            sexo: this.responsible.sexo,
            email: this.responsible.email,
            endereco: this.responsible.endereco,
            cidade: this.responsible.cidade,
            estado: this.responsible.estado,
            cep: this.responsible.cep,
            telefone: this.responsible.telefone,
          };

          this.responsibleForm.patchValue(formValues);
        }
      });

      this.loading = false;
    }
  }

  addResponsible() {
    this.loading = true;
    const responsibleData = this.responsibleForm.value;

    this.responsibleService.addResponsible(responsibleData).subscribe({
      next: () => {
        this.toastr.success('Reponsável cadastrado com sucesso!', 'Sucesso');
        this.goBack();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Ago deu errado!', 'Não foi possível cadastrar');
      },
    });
  }

  updateResponsible(id: number, responsible: any) {
    responsible.id = id;

    this.loading = true;
    this.responsibleService.updateResponsible(id, responsible).subscribe({
      next: () => {
        this.toastr.success('Responsável atualizado com sucesso!', 'Sucesso');
        this.goBack();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error(
          'Erro ao atualizar responsável',
          'Não possível adicionar'
        );
      },
    });
  }

  goBack() {
    const currentUrl = this.route.snapshot.url;
    if (currentUrl[currentUrl.length - 1].path === 'new') {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
  }

  dateFormated(data: string): string {
    if (data !== undefined) {
      return formatDate(data, 'dd/MM/yyyy', 'en-US');
    }

    return '';
  }

  getAdressCep(cep: any): void {
    if (cep && cep.length === 8) {
      this.viaCepService.getAdress(cep).subscribe({
        next: (data: ViaCepModel | any) => {
          if (data) {
            this.responsibleForm.patchValue({
              cidade: data.localidade,
              estado: data.uf,
            });
          }
        },
        error: () => {},
      });
    }
  }
}
