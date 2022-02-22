import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiServer = "https://localhost:7121/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  adicionar(produtoForm: FormData): Observable<Produto> {
    return this.httpClient.post<Produto>(this.apiServer + '/produto/', produtoForm)
  }
  obterPorId(id: any): Observable<Produto> {
    return this.httpClient.get<Produto>(this.apiServer + '/produto/' + id);
  }

  obterTodos(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(this.apiServer + '/produto/');
  }

  atualizar(id: string, produtoForm: FormData): Observable<Produto> {
    return this.httpClient.put<Produto>(this.apiServer + '/produto/' + id, produtoForm);
  }

  excluir(id: string) {
    return this.httpClient.delete<Produto>(this.apiServer + '/produto/' + id, this.httpOptions);
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Erro Code: ${error.status}\nMenssagen: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
