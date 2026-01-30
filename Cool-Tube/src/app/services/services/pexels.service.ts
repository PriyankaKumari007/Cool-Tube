import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PexelsService {
 private apiUrl = 'https://api.pexels.com/videos/popular';
  private apiKey = 'VDNFd05QGzZocQggYPOQUcnw9TmLHKMUEjq9qsHI8Z4fS8phSzr6wQrr';

  constructor(public http: HttpClient) { }
getVideos(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.apiKey
    });

    return this.http.get(this.apiUrl, { headers });
  }
  
}
