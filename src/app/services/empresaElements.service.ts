import { EmpresaElement } from './../models/empresaelements';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EmpresaElementService {
  API_URL = 'assets/empresa.json';
  constructor(private http: HttpClient) { }


  getElements(): Observable<EmpresaElement[]> {
    return this.http.get<EmpresaElement[]>(this.API_URL);
  }

  createElements(element: EmpresaElement): Observable<EmpresaElement> {
    return this.http.post<EmpresaElement>(this.API_URL, element);
  }

  editElement(element: EmpresaElement): Observable<EmpresaElement> {
    return this.http.put<EmpresaElement>(this.API_URL, element);
  }

  deleteElement(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}?id=${id}`);
  }
}
