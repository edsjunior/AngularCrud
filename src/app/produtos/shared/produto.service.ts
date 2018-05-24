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
    let body = JSON.stringify(prod);
    const headerOptions = new Headers({'Content-type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions})
    return this.http.post("https://crudangularapi.azurewebsites.net/api/Produto",body, requestOptions).map(x => x.json())

  }

  putProduto(codProduto, prod){
    let body = JSON.stringify(prod);
    const headerOptions = new Headers({'Content-type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions})
    return this.http.put("https://crudangularapi.azurewebsites.net/api/Produto/" + codProduto,
    body, requestOptions).map(x => x.json())

  }

  getListaProdutos(){
    this.http.get("https://crudangularapi.azurewebsites.net/api/Produto")
      .map((data: Response)=>{
        return data.json() as Produto[];
      }).toPromise().then(x =>{
        this.listaProduto = x;
      })
  }

  deleteProduto(codProduto: number){
    return this.http.delete("https://crudangularapi.azurewebsites.net/api/Produto/" + codProduto).map(resp => resp.json())
  }
}
