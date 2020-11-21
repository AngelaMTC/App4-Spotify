import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  resultados: any = [];
  loading: boolean;
  error: boolean;
  msgError: string;

  constructor(private spotify: SpotifyService) { }

  buscar(term){
    this.loading = true;
    this.error = true;
    this.spotify.getArtist(term).subscribe((data: any) => {
      // console.log(data.artists.items);
      this.resultados = data;
      this.loading = false;
    }, (errorServicio => {
      console.log('Error');
      this.loading = false;
      this.error = true;
      this.msgError = errorServicio.error.error.message;
    }));
  }

  ngOnInit(): void {
  }
}