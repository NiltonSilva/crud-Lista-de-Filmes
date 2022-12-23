import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filme } from 'src/app/shared/models/filme';
import { Alerta } from 'src/app/shared/models/alerta';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';
import { FilmesService } from './../../core/filmes.service';
import { AlertaComponent } from './../../shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})

export class CadastroFilmesComponent implements OnInit {

  id: number;
  cadastro!: FormGroup;
  generos: Array<string>;

  constructor(
    public validacao: ValidarCamposService,   // nesse caso minha injeção de dependência fica pública porque será acessada do HTML
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id) {
      this.filmeService.visualizar(this.id).subscribe((filme: Filme) => this.criarFormulario(filme));
    } else {
      this.criarFormulario(this.criarFilmeEmBranco());
    }

    this.generos = ['Ação', 'Animação', 'Aventura', 'Comédia', 'Drama', 'Ficção', 'Romance',  'Terror'];

  }


  submit(): void {
    console.log(this.cadastro);

    this.cadastro.markAllAsTouched();

    if(this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]
    });
  }

  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      titulo: null,
      dtLancamento: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      urlIMDb: null,
      genero: null
    } as Filme
  }

  private salvar(filme: Filme): void {
    this.filmeService.salvar(filme).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir par a listagem',
          btnCancelar: 'Cadastrar um novo filme',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      }
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if(opcao) {
          this.router.navigateByUrl('filmes');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao fechar o registro!',
          descricao: 'Não conseguimos salvar seu registro. Por favor, tentar novamente mais tarde!',
          corBtnSucesso: 'warn',
          btnSucesso:'Fechar'
        } as Alerta
      }
      this.dialog.open(AlertaComponent, config);
    });
  }

}
