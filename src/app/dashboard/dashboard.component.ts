import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private router: Router,
    private modalService: NgbModal) {}

  navigateToServicosPage(): void {
    this.router.navigate(['/servicos']);
  }

  goTo(path: string){
    this.router.navigate(['/'+path]);
  }

  openModal(): void {
    const modalRef = this.modalService.open(CustomerFormComponent, {
      size: 'sm',
    });
        modalRef.result.then(result => {
      }).catch(reason => {
    });
  }

}
