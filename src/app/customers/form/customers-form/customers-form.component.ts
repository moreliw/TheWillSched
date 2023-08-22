import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ViaCepModel } from 'src/app/shared/models/viaCepModel';
import { ViaCepService } from 'src/app/shared/services/viacepapi.service';
import { CustomerService } from '../../customers.component.service';
import { ToastrService } from 'ngx-toastr';
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
  public customersForm!: FormGroup;
  public loading = false;

  constructor(
    public modal: NgbActiveModal,
    private viaCepService: ViaCepService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.isEdit) {
      this.updateForm(this.data.cliente);
      this.title = 'Atualizar Cliente';
      this.buttonTitle = 'ATUALIZAR';
    } else {
      this.initForm();
    }
  }

  updateForm(data?: any) {
    this.customersForm = this.formBuilder.group({
      nome: new FormControl(data.nome, [Validators.required]),
      sobrenome: new FormControl(data.sobrenome, [Validators.required]),
      dataNascimento: new FormControl(
        new Date(data.dataNascimento).toISOString().split('T')[0],
        [Validators.required]
      ),
      telefone: new FormControl(data.telefone, [Validators.required]),
      email: new FormControl(data.email, [Validators.required]),
      endereco: new FormControl(data.endereco, [Validators.required]),
      cidade: new FormControl(data.cidade, [Validators.required]),
      estado: new FormControl(data.estado, [Validators.required]),
      cep: new FormControl(data.cep, [Validators.required]),
      dataCadastro: new FormControl(data.dataCadastro, [Validators.required]),
      dataUltimaAtualizacao: new FormControl(data.dataUltimaAtualizacao, [
        Validators.required,
      ]),
    });
  }

  initForm() {
    this.customersForm = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      sobrenome: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      endereco: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      dataCadastro: new FormControl('', [Validators.required]),
      dataUltimaAtualizacao: new FormControl('', [Validators.required]),
    });
  }

  formData() {
    this.customersForm.patchValue({
      nome: this.customersForm.value.nome,
      sobrenome: this.customersForm.value.sobrenome,
      dataNascimento: formatDate(
        this.customersForm.value.dataNascimento,
        'yyyy-MM-dd',
        'en-US'
      ),
      telefone: this.customersForm.value.telefone,
      email: this.customersForm.value.email,
      endereco: this.customersForm.value.endereco,
      cidade: this.customersForm.value.cidade,
      estado: this.customersForm.value.estado,
      cep: this.customersForm.value.cep.toString(),
      dataCadastro: !this.isEdit
        ? new Date().toISOString()
        : formatDate(
            this.customersForm.value.dataCadastro,
            'yyyy-MM-dd',
            'en-US'
          ),
      dataUltimaAtualizacao: new Date().toISOString(),
    });

    this.isEdit
      ? this.updateCustomer(this.data.cliente.id, this.customersForm.value)
      : this.addCustomer();
  }

  cepValue(event: any) {
    return event.target.value;
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
        this.loading = false;
        this.closeModal(true);
      },
      error: () => {
        this.loading = false;
        this.toastr.success('Cliente adicionado com sucesso!', 'Sucesso');
      },
    });
  }

  updateCustomer(id: number, cliente: any) {
    cliente.id = id;

    this.loading = true;
    this.customerService.updateCustomer(id, cliente).subscribe({
      next: () => {
        this.toastr.success('Cliente atualizado com sucesso!', 'Sucesso');
        this.loading = false;
        this.closeModal(true);
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

  closeModal(success: boolean): void {
    this.modal.close(success);
  }
}
