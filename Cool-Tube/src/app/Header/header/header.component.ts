import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: false,
})
export class HeaderComponent {
  @Output() categorySelected = new EventEmitter<string>();


categories = {
  Nature: 'nature',
  Animals: 'animals',
  Travel: 'travel',
  Sports: 'sports',
  Music: 'music'
};
selectCategory(category: string) {
  console.log('Selected category:', category); // 'nature', 'sports', etc.
  this.categorySelected.emit(category);
}

}
