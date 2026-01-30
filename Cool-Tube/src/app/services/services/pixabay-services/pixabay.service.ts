import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PixabayService {
  private apiUrl = 'https://pixabay.com/api/';
  private apiKey = '54426253-0b4e64721c7b71db5ca8cf30d'; // Replace with your actual API key

  constructor(private http: HttpClient) {}

  // Fetch photos based on a query
  getPhotos(query: string, perPage: number = 305, page: number = 1): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;
    return this.http.get(url);
  }
}