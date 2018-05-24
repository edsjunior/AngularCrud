import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../shared/produto.service';
import { Produto } from '../shared/produto.model';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css']
})
export class ProdutoListaComponent implements OnInit {

  constructor(private produtoService: ProdutoService, private toastr: ToastrService) { }

  ngOnInit() {
    this.produtoService.getListaProdutos();
  }

  Editar(prod: Produto) {
    this.produtoService.selectedProduto = Object.assign({}, prod);
  }

  Deletar(codProduto: number) {
    if (confirm('Deseja realmente excluir o produto?') == true) {
      this.produtoService.deleteProduto(codProduto)
        .subscribe(x => {
          this.produtoService.getListaProdutos();
          this.toastr.warning('Excluido com sucesso', 'Cadastro de Produto')
        })
    }
  }
}