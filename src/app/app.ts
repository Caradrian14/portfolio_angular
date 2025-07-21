import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { ContactComponent } from './components/contact/contact.component';
import { LandingComponent } from './components/landing/landing.component';
import { from } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, ContactComponent ,LandingComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Portfolio Adria Jorda';
}
