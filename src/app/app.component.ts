import { Component } from '@angular/core';
import { ThemeSwitcherService } from './core/services/theme-switcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDark$ = this.themeSwitcher.isDark$;

  constructor(private themeSwitcher: ThemeSwitcherService) {}
}
