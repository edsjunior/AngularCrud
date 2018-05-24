import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../shared/produto.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor(private produtoService: ProdutoService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm (form?: NgForm ) {
    if(form != null)
    form.reset();
    this.produtoService.selectedProduto = {
      cod_Produto: null,
      nom_Produto: '',
      vlr_Compra: null,
      vlr_Venda: null,
      qtd_EstoqueMinimo: null,
      dta_Cadastro: null
    }
  }

  onSubmit(form: NgForm){
    if(form.value.cod_Produto == null){
    this.produtoService.postProduto(form.value)
      .subscribe(data =>{
      this.resetForm(form);
      this.produtoService.getListaProdutos();
      this.toastr.success('Cadastro efetuado com Sucesso!','Cadastro de Produtos')
    })
  }else{
    this.produtoService.putProduto(form.value.cod_Produto, form.value)
      .subscribe(data =>{
      this.resetForm(form);
      this.produtoService.getListaProdutos();
      this.toastr.info('Atualizado com Sucesso!','Cadastro de Produtos')
      })
    }
  }
}
