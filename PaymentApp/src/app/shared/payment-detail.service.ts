import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http: HttpClient) { }
  formData: PaymentDetail = new PaymentDetail();
  readonly baseURL='http://localhost:14523/api/PaymentDetail';
  
  list: PaymentDetail[];

  postPaymentDetail() {
    return this.http.post(this.baseURL,this.formData);
  }
  putPaymentDetail() {
    return this.http.put(this.baseURL+'/'+this.formData.paymentDetailId,this.formData);
  }
  removePaymentDetail(id:number) {
    return this.http.delete(this.baseURL+'/'+id);
  }

  refreshList() {
    this.http.get(this.baseURL)
    .toPromise()
    .then(response => this.list = response as PaymentDetail[]);
  }
}
