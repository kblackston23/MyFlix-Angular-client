import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { DetailsViewComponent } from '../details-view/details-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any [] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

ngOnInit(): void {
  this.getMovies();
  this.getCurrentUser();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

getDirector(name: string, bio: string, birthdate: string): void {
  this.dialog.open(DirectorViewComponent, {
    data: {
      Name: name,
      Bio: bio,
      Birthdate: birthdate,
    },
    width: '500px',
   });
  }

getGenre(name: string, description: string): void {
  this.dialog.open(GenreViewComponent, {
    data: {
      Name: name,
      Description: description,
    },
    width: '500px'
    });
  }

getDetails(title: string, imagePath: any, description: string): void {
  this.dialog.open(DetailsViewComponent, {
    data: {
      Title: title,
      ImagePath: imagePath,
      Description: description,
    },
    width: '500px'
   });
  }

getCurrentUser(): void {
  const username = localStorage.getItem('user');
  this.fetchApiData.getUserProfile().subscribe((resp: any) => { 
      console.log(resp)
      const currentUser=resp.Username
      console.log(currentUser)
      const currentFavs=resp.FavoriteMovies
      console.log(currentFavs)
    });
  }

addFavoriteMovie(id: string, title: string): void {
  this.fetchApiData.addFavoriteMovies(id).subscribe((resp: any) => {
    this.snackBar.open(`${title} has been added to your favourites!`, 'OK', {
      duration: 3000,
      });
    this.ngOnInit();
    });
  }

removeFavoriteMovie(id: string, title: string): void {
  this.fetchApiData.deleteFavoriteMovie(id).subscribe((resp: any) => {
    console.log(resp);
    this.snackBar.open(
      `${title} has been removed from your favourites!`,
      'OK',
      {
        duration: 3000,
      });
      this.ngOnInit();
    });
  }
}
