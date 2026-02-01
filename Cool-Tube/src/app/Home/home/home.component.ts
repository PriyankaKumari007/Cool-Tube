import { Component, Input } from '@angular/core';
import { HeaderComponent } from 'src/app/Header/header/header.component';
import { PexelsService } from 'src/app/services/services/pexels.service';
import { PixabayService } from 'src/app/services/services/pixabay-services/pixabay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent {
  category: string = 'nature';
  title = 'Cool-Tube';
  videos: any[] = [];
  photos: any[] = []; // all fetched photos
  visiblePhotos: any[] = []; // shown in UI
  showProfile = false;
  pageSize = 80;
  currentIndex = 0;
  categories = {
    Nature: 'nature',
    Animals: 'animals',
    Travel: 'travel',
    Sports: 'sports',
    Music: 'music',
    Feelings: 'feelings',
    Health: 'health',
    People: 'people',
  };
  constructor(
    public pexelsService: PexelsService,
    private pixabayService: PixabayService,
  ) {}

  ngOnInit(): void {
    this.pexelsService.getVideos().subscribe((response: any) => {
      this.videos = response.videos;
      console.log(this.videos);
    });
    console.log('Home received category:', this.category);
    this.loadAllPhotos(this.category);
  }

  selectCategory(category: string) {
    if (this.category === category) return; // optional optimization

    this.category = category;
    console.log('Category changed to:', this.category);

    // RESET state
    this.photos = [];
    this.visiblePhotos = [];
    this.currentIndex = 0;

    // FETCH new data
    this.loadAllPhotos(this.category);
  }

  loadAllPhotos(query: string) {
    console.log('Loading photos for category:', query);
    this.pixabayService.getPhotos(query, 200, 1).subscribe((data: any) => {
      this.photos = data.hits;
      this.loadMorePhotos(); // initial load
    });
  }

  loadMorePhotos() {
    const nextChunk = this.photos.slice(
      this.currentIndex,
      this.currentIndex + this.pageSize,
    );

    this.visiblePhotos.push(...nextChunk);
    this.currentIndex += this.pageSize;
  }

  onHorizontalScroll(event: Event) {
    const element = event.target as HTMLElement;

    const nearEnd =
      element.scrollLeft + element.clientWidth >= element.scrollWidth - 100;

    if (nearEnd) {
      this.loadMorePhotos();
    }
  }

 

  toggleProfile() {
  this.showProfile = !this.showProfile;
}
}
