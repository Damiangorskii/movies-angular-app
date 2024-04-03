import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Movie } from '../movie.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatChipsModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie!: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  editMovie() {
    this.router.navigate(['/movies/edit', this.movie._id], {
      state: { movie: this.movie }
    });
  }

  deleteMovie(): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(this.movie._id).subscribe({
        next: () => {
          this.router.navigate(['/movies']);
        },
        error: error => {
          console.error('There was an error deleting the movie', error);
        }
      });
    }
  }

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieById(movieId).subscribe({
        next: (response) => {
          this.movie = response.data;
        },
        error: (error) => {
          console.error('Error fetching movie', error);
        }
      });
    }
  }
}
