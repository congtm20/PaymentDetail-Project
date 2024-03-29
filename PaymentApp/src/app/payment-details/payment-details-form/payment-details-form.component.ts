import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [],
})
export class PaymentDetailsFormComponent implements OnInit {
  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  public onSubmit(form: NgForm) {
    if (this.service.formData.paymentDetailId == 0) this.insertRecord(form);
    else this.updateRecord(form);
  }
  public insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      (result) => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success(
          'Submitted Successfully',
          'Payment Detail Register'
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  public updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      (result) => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated Successfully', 'Payment Detail Register');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  

  public resetForm(form: NgForm): void {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
}
