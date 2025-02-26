import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowersService {

  constructor(private httpClient: HttpClient) {}

  getFollowers(username: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${username}/followers`);
  }
}
