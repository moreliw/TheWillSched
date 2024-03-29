import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViaCepModel } from 'src/app/shared/models/viaCepModel';
import { ViaCepService } from 'src/app/shared/services/viacepapi.service';
import { CustomerService } from '../../customers.component.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.scss'],
})
export class CustomersFormComponent implements OnInit {
  @Input() data: any;
  @Input() isEdit = false;

  title = 'Cadastro de Cliente';
  buttonTitle = 'CADASTRAR';
  customersForm: FormGroup;
  public loading = false;
  customer: Customer;
  id: any;
  constructor(
    private viaCepService: ViaCepService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.customer = new Customer();
  }

  ngOnInit() {
    this.customersForm = this.formBuilder.group({
      nome: ['', Validators.nullValidator],
      dataNascimento: [new Date(), [Validators.required]],
      telefone: ['', Validators.nullValidator],
      email: ['', Validators.nullValidator],
      endereco: ['', Validators.nullValidator],
      cidade: ['', Validators.nullValidator],
      estado: ['', Validators.nullValidator],
      cep: ['', Validators.nullValidator],
    });

    this.getData();
  }

  private getData() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id !== undefined && this.id != null) {
      this.loading = true;
      this.customerService.getById(this.id).subscribe((result: any) => {
        if (result) {
          this.customer = result.data;

          this.isEdit = true;
          this.title = 'Editar Cliente';
          this.buttonTitle = 'ATUALIZAR';

          const dataNascimentoFormatted = new Date(this.customer.dataNascimento)
            .toISOString()
            .split('T')[0];

          this.customersForm.patchValue({
            nome: this.customer.nome,
            dataNascimento: dataNascimentoFormatted,
            telefone: this.customer.telefone,
            email: this.customer.email,
            endereco: this.customer.endereco,
            cidade: this.customer.cidade,
            estado: this.customer.estado,
            cep: this.customer.cep,
          });
        }
      });

      this.loading = false;
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
            this.customersForm.patchValue({
              cidade: data.localidade,
              estado: data.uf,
            });
          }
        },
        error: () => {},
      });
    }
  }

  addCustomer() {
    this.loading = true;
    const customerData = this.customersForm.value;

    this.customerService.addCustomer(customerData).subscribe({
      next: () => {
        this.toastr.success('Cliente adicionado com sucesso!', 'Sucesso');
        this.goBack();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Ago deu errado!', 'Não foi possível adicionar');
      },
    });
  }

  updateCustomer(id: number, cliente: any) {
    cliente.id = id;

    this.loading = true;
    this.customerService.updateCustomer(id, cliente).subscribe({
      next: () => {
        this.toastr.success('Cliente atualizado com sucesso!', 'Sucesso');
        this.goBack();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error(
          'Erro ao atualizar cliente',
          'Não possível adicionar'
        );
      },
    });
  }

  formatPhoneNumber(numbers: any) {
    if (numbers.target.value.length === 11) {
      let cleanedNumber = numbers.target.value.replace(/\D/g, '');

      if (cleanedNumber.length > 0) {
        cleanedNumber =
          '(' +
          cleanedNumber.substring(0, 2) +
          ') ' +
          cleanedNumber.substring(2, 3) +
          ' ' +
          cleanedNumber.substring(3, 7) +
          '-' +
          cleanedNumber.substring(7, 11);
      }
      numbers.target.value = cleanedNumber;
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
}
