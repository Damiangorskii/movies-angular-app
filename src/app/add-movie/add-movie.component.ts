import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,MatCardModule,MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  movieForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private movieService: MovieService) {
    this.movieForm = this.fb.group({
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

  onSubmit(): void {
    if (this.movieForm.valid) {
      const formData = this.movieForm.value;
  
      formData.cast = formData.cast.split(',').map((actor: string) => actor.trim());
      if (formData.awards) {
        formData.awards = formData.awards.split(',').map((award: string) => award.trim());
      }
  
      this.movieService.addMovie(formData).subscribe({
        next: (response) => {
          const newMovieId = response.data._id;
          this.router.navigate(['/movies', newMovieId]);
        },
        error: (error) => {
          console.error('Error submitting form', error);
        }
      });
    }
  }
  
}
