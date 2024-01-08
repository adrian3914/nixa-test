import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sort} from "../shared/sort-list/sort-list.component";

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {
  urlBase = "http://localhost:4200"

  constructor(private http: HttpClient) { }

  fetchAll(): Observable<any> {
    return this.http.get(`${this.urlBase}/api/v1/clients`);
  }

  fetchById(id: string): Observable<any> {
    return this.http.get(`${this.urlBase}/api/v1/clients/${id}`);
  }

  deleteObjById(id: String): Observable<any> {
    return this.http.delete(`${this.urlBase}/api/v1/clients/${id}`, {
      responseType: "text"
    })
  }

  addNew(obj: { firstName: string; lastName: string; phoneNumber: string; contactDate: string }): Observable<any> {
    return this.http.post(`${this.urlBase}/api/v1/clients`,obj)
  }

  update(obj:  {id: string; firstName: string; lastName: string; phoneNumber: string; contactDate: string }): Observable<any> {
    return this.http.put(`${this.urlBase}/api/v1/clients`, obj);
  }

  fetchAllSorted(sort: Sort):Observable<any> {
    return this.http.get(`${this.urlBase}/api/v1/clients/sort/${sort.key}?sortDirection=${sort.sortDirection}`)
  }
}
