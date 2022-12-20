import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  titulo: string = 'Sucesso!';
  descricao: string = 'Seu registro foi efetuado com sucesso.'
  btnSucesso: string = 'OK';
  btnCancelar: string = 'Cancelar';
  corBtn: string = 'primary';
  possuitBtnFechar: boolean = false;

  constructor(public dialogRef: MatDialogRef<AlertaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    debugger
    if(this.data) {
      this.titulo = this.data.titulo || this.titulo;
      this.descricao = this.data.descricao || this.descricao;
      this.btnSucesso = this.data.btnSucesso || this.btnSucesso;
      this.btnCancelar = this.data.btnCancelar || this.btnCancelar;
      this.corBtn = this.data.corBtn || this.corBtn;
      this.possuitBtnFechar = this.data.possuitBtnFechar || this.possuitBtnFechar;
    }
  }

}
