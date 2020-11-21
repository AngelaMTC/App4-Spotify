import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getTopTracks(id){
    return this.getQuery(`artists/${id}/top-tracks?market=MX`).pipe(map(data => data['tracks']));
  }

  routeArtist(id){
    return this.getQuery(`artists/${id}`).pipe(map(data => {
      return data;
    }));
  }

  getQuery(query: string){ 
    // aquí se declaran los headers para las peticiones
    const headers = new HttpHeaders({
      // Authorization : 'Bearer BQBiGX4iCZcHO-w3L-XdN_a5Rhp4cZi4mqeV54m2sHRox78XHMZPonSlC5E3TorPUEkBfZrMrj8rssD3UxM'
    });

    const url = `https://api.spotify.com/v1/${query}`;
    return this.http.get(url, {headers});
  }

  getNewReleases(){
    // const headers = new HttpHeaders({
    //   Authorization : 'Bearer BQD0NhawDjr2jHu0iajnOy8pcmJ_QnDUX47CKixkPPeJo2eQ4mEG5PC_f84JszZJXq5uhTyEoo0EU8QMVhY'
    // });

    return this.getQuery('browse/new-releases').pipe(map(data => {
      return data['albums'].items;
    }));

    // return this.http.get('https://api.spotify.com/v1/browse/new-releases', {headers}).pipe(map(data =>{
    //   return data['albums'].items;
    // }));
  }

  getArtist(term){
    // const headers = new HttpHeaders({
    //   Authorization : 'Bearer BQAEPfMYTahL7fCMsS_pkU-J3TrGTn0O7y62X1jy4bKRhxceleNyV-wIorcSw58h7wUP_YaMCxFPd8kAW8c'
    // });

    return this.getQuery(`search?q=${term}&type=artist`).pipe(map(data => {
      return data['artists'].items;
    }));

    // return this.http.get(`https://api.spotify.com/v1/search?q=${term}&type=artist`, {headers}).pipe(map(data => {
    //   return data['artists'].items;
    // }));
  }
}