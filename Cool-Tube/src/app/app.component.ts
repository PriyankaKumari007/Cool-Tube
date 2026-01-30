import { Component } from '@angular/core';
import { PexelsService } from './services/services/pexels.service';
import { PixabayService } from './services/services/pixabay-services/pixabay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cool-Tube';
  videos:any[] = [];
 photos: any[] = [];
  constructor(public pexelsService: PexelsService,
    private pixabayService: PixabayService
  ) { }

  ngOnInit(): void {
    this.pexelsService.getVideos().subscribe((response: any) => {
      this.videos = response.videos;
      console.log(this.videos);
    });

    //  this.pixabayService.getPhotos('nature').subscribe((data: any) => {
    //   this.photos = data.hits; // 'hits' contains the array of photos
    // });
     this.loadAllPhotos('nature');
  }
    loadAllPhotos(query: string): void {
    const totalPages = 3; // Fetch up to 3 pages (adjust as needed)
    for (let page = 1; page <= totalPages; page++) {
      this.pixabayService.getPhotos(query, 200, page).subscribe((data: any) => {
        this.photos = [...this.photos, ...data.hits]; // Combine results
      });
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
    container.scrollBy({ left: event.deltaY < 0 ? -300 : 300, behavior: 'smooth' });
  }
}
