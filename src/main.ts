import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { MovieListComponent } from './app/movie-list/movie-list.component';
import { HomeComponent } from './app/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MovieDetailComponent } from './app/movie-detail/movie-detail.component';
import { AddMovieComponent } from './app/add-movie/add-movie.component';
import { EditMovieComponent } from './app/edit-movie/edit-movie.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/add', component: AddMovieComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'movies/edit/:id', component: EditMovieComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(RouterModule.forRoot(routes)), provideAnimationsAsync(),
  ]
}).catch(err => console.error(err));
