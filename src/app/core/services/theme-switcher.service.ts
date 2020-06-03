import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcherService {
  private _isDark = true;
  public isDark$ = new BehaviorSubject<boolean>(this._isDark);

  constructor() {
    this.isDark$.subscribe(isDark => {
      if (isDark) {
        document.querySelector('body').classList.add('dark-mode');
      } else {
        document.querySelector('body').classList.remove('dark-mode');
      }
    });
  }

  public setThemeState(isDark: boolean) {
    this._isDark = isDark;
    this.isDark$.next(this._isDark);
  }
}
