import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Movie, MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  navigateToDetail(movieId: string) {
    this.router.navigate(['/movies', movieId]);
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe(
      response => {
        this.movies = response.data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
}