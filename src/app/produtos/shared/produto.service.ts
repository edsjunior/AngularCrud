import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions,RequestMethod} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Produto } from'./produto.model'

@Injectable({  providedIn: 'root' })
export class ProdutoService {
  selectedProduto: Produto;
  listaProduto: Produto[];
  constructor( private http: Http) { }

  postProduto(prod: Produto){
    alert('Testee')
    let body = JSON.stringify(prod);
    alert(prod)
    const headerOptions = new Headers({'Content-type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions})
    return this.http.post("http://localhost:15292/api/Produto",body, requestOptions).map(x => x.json())

  }

  getListaProdutos(){
    this.http.get("http://localhost:15292/api/Produto")
      .map((data: Response)=>{
        return data.json() as Produto[];
      }).toPromise().then(x =>{
        this.listaProduto = x;
      })
  }
}
