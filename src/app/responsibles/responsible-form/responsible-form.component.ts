import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsible } from 'src/app/models/responsible';
import { ResponsibleService } from '../responsibles.component.service';
import { formatDate } from '@angular/common';
import { ViaCepService } from 'src/app/shared/services/viacepapi.service';
import { ViaCepModel } from 'src/app/shared/models/viaCepModel';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private responsibleService: ResponsibleService,
    private viaCepService: ViaCepService
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
      this.responsibleService.getById(this.id).subscribe((result: any) => {
        console.log(result);
        if (result) {
          this.responsible = result.data;
          this.isEdit = true;
          this.title = 'Editar Cliente';
          this.buttonTitle = 'ATUALIZAR';
        }
      });
    }
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
