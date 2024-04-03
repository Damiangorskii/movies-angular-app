import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService, Movie } from '../movie.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  editMovieForm: FormGroup;
  movieId!: string;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editMovieForm = this.fb.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      releaseYear: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(1800),
          Validators.max(new Date().getFullYear()),
        ]),
      ],
      genre: ['', Validators.required],
      runtime: [null, Validators.required],
      cast: ['', Validators.required],
      rating: [
        null,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(10)]),
      ],
      boxOffice: [null, Validators.required],
      language: ['', Validators.required],
      country: ['', Validators.required],
      awards: [''],
      posterImage: [''],
    });
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const movie: Movie = navigation?.extras?.state?.['movie'];

    if (movie) {
      this.movieId = movie._id;
      this.editMovieForm.patchValue(movie);
    } else {
      this.movieId = this.route.snapshot.paramMap.get('id') as string;
      if (this.movieId) {
        this.movieService.getMovieById(this.movieId).subscribe({
          next: (response) => {
            this.editMovieForm.patchValue(response.data);
          },
          error: (error) => console.error(error)
        });
      }
    }
  }

  onSubmit(): void {
    if (this.editMovieForm.valid) {
      this.movieService.updateMovie(this.movieId, this.editMovieForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/movies', this.movieId]);
        },
        error: (error) => console.error('Error updating movie:', error)
      });
    }
  }
}
