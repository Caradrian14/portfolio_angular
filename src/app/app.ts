import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './nav/nav'
import { Aboutme } from './aboutme/aboutme'
import { Landing } from './landing/landing'
import { Contact } from './contact/contact'
import { Skills } from './skills/skills'
import { Portfolio } from './portfolio/portfolio'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Landing, Aboutme, Skills, Portfolio, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio_angular_test');
}
