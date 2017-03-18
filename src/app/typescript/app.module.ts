import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';

// Services
import { UrlBuilderService }    from  './services/urlBuilder.service';
import { MoviesService }    from  './services/rest/movies.service';
import { NavigatorService }    from  './shared/utils/navigator.service';
import { DeckOfCardsService }    from  './services/rest/deckOfCards.service';

// Components
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import { GameComponent } from './components/game/game.component';

// Shared
import { Logger } from './shared/logger.service';
import { LocalStorageService } from './shared/localStorage.service';
import { LogoComponent } from './shared/logo/logo.component';
import { NavigationComponent } from './shared/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    MainComponent,
    NavigationComponent,
    MovieInfoComponent,
    GameComponent
    // Libs
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [
    // Services
    UrlBuilderService,
    NavigatorService,
    MoviesService,
    DeckOfCardsService,
    // Shared
    Logger,
    LocalStorageService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
