import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse<T> {
  data: T;
}

export interface Movie {
  _id: string;
  title: string;
  director: string;
  genre: string,
  releaseYear: number,
  runtime: number,
  cast: string,
  rating: number,
  boxOffice: number,
  language: string,
  country: string,
  awards: string,
  posterImage: string
}


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8080/movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<ApiResponse<Movie[]>> {
    return this.http.get<ApiResponse<Movie[]>>(this.apiUrl);
  }
}