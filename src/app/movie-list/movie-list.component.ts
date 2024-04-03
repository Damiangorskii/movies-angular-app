import { trigger, state, style, transition, animate } from '@angular/animations';
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
  styleUrls: ['./movie-list.component.css'],
  animations: [
    trigger('buttonState', [
      state('default', style({
        backgroundColor: '#424242'
      })),
      state('hover', style({
        backgroundColor: '#535353'
      })),
      state('active', style({
        backgroundColor: '#333',
        transform: 'scale(0.95)'
      })),
      transition('default <=> hover', animate('300ms ease-in-out')),
      transition('hover <=> active', animate('100ms ease-in-out'))
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 }))
      ]),
    ]),
  ]
})

export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  buttonState = 'default';

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