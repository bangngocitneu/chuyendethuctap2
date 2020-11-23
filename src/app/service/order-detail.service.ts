import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  baseUrl;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.API +`/ordersDetail`;
  }
 
  get() {
    return new Promise((resolve, reject) =>{
      this.http.get(this.baseUrl).subscribe(response => {
        resolve(response);
      }), err => {
        reject(err);
      }
    });
  }

  getByOrderId(id) {
    return new Promise((resolve, rejects) => {
      this.http.get(this.baseUrl+`/getOrderDetailsByOrdersId/${id}`).subscribe(response => {
        resolve(response)
      }, err => {
        rejects(err)
      })
    })
  }

  add(arr) {
    return new Promise((resolve, rejects) => {
      this.http.post(this.baseUrl, arr).subscribe(response => {
        resolve(response)
      }, err => {
        rejects(err)
      })
    })
  }

  update(object){
    let url = this.baseUrl.concat('/', object.id);
    return new Promise((resolve, reject) => {
      this.http.put(url, object).subscribe((result) => {
        resolve(result)
      }, err => {
        reject(err)
      })
    });
  }

  delete(id){
    let url = this.baseUrl.concat('/', id);
    return new Promise((resolve, reject) => {
      this.http.delete(url).subscribe((res) => {
        resolve(res)
      }, err => {
        reject(err)
      })
    });
  }
}
