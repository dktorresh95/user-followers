import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowersService } from '../services/followers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
})
export class FollowersComponent implements OnInit {
  followers$: Observable<any[]> | null = null;
  username: string = '';

  constructor(
    private followersService: FollowersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || '';
    if (this.username) {
      this.followers$ = this.followersService.getFollowers(this.username);
    }
  }
}
