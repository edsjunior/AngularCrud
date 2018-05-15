import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../shared/produto.service';
import { Produto } from '../shared/produto.model';


@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css']
})
export class ProdutoListaComponent implements OnInit {

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produtoService.getListaProdutos();
  }

  Editar(prod: Produto){
    this.produtoService.selectedProduto = Object.assign({}, prod);
  }
}
