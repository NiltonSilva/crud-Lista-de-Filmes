import { FilmesService } from 'src/app/core/filmes.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {
  readonly semFoto: string = 'https://termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  filme: Filme;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private filmesService: FilmesService
  ) { }

  ngOnInit() {
    this.visualizar(this.ActivatedRoute.snapshot.params['id']);
  }

  private visualizar(id: number): void {
    this.filmesService.visualizar(id).subscribe((filme: Filme) => this.filme = filme);
    console.log(id)
  }


}
