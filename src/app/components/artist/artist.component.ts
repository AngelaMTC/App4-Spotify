import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artista: any = {};
  loading: boolean;
  tracks: any = [];

  constructor( private AR: ActivatedRoute, private Spotify: SpotifyService) {
    this.loading = true;
    this.AR.params.subscribe(params => {
      this.getArtist(params ["id"]);
      this.getTopTracks(params["id"]);
      // this.Spotify.routeArtist(params['id']).subscribe(data => {
      //   this.artista = data;
      //   console.log(this.artista);
      //   this.loading = false;
      // });
    });
   }
   getTopTracks(id){
     this.Spotify.getTopTracks(id).subscribe(data => this.tracks = data);
     console.log(this.tracks);
   }

   getArtist(id){
    this.Spotify.routeArtist([id]).subscribe(data => {
      this.artista = data;
      this.loading = false;
      console.log(this.artista.images);
   });
  }


  ngOnInit(): void {
  }

}
