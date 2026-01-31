import { Component } from '@angular/core';
import { PexelsService } from 'src/app/services/services/pexels.service';
import { PixabayService } from 'src/app/services/services/pixabay-services/pixabay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
   standalone:false
})
export class HomeComponent {
 title = 'Cool-Tube';
  videos: any[] = [];
  photos: any[] = []; // all fetched photos
  visiblePhotos: any[] = []; // shown in UI

  pageSize = 20;
  currentIndex = 0;

  constructor(
    public pexelsService: PexelsService,
    private pixabayService: PixabayService,
  ) {}

  ngOnInit(): void {
    this.pexelsService.getVideos().subscribe((response: any) => {
      this.videos = response.videos;
      console.log(this.videos);
    });

    this.loadAllPhotos('nature');
  }

  
  loadAllPhotos(query: string) {
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

  /* Added methods to handle carousel scrolling */
  scrollLeft() {
    const container = document.querySelector('.photo-container') as HTMLElement;
    container.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    const container = document.querySelector('.photo-container') as HTMLElement;
    container.scrollBy({ left: 300, behavior: 'smooth' });
  }

  /* Added method to handle mouse wheel scrolling for the carousel */
  onCarouselScroll(event: WheelEvent) {
    const container = document.querySelector('.photo-container') as HTMLElement;
    container.scrollBy({
      left: event.deltaY < 0 ? -300 : 300,
      behavior: 'smooth',
    });
  }
}
