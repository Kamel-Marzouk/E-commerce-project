import { Component, OnInit } from '@angular/core';
import { TranslationService } from './shared/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'E-commerce-project';

  constructor(public translation: TranslationService) { }

  ngOnInit(): void {
    this.translation.setDefaultLang();
  }
}
