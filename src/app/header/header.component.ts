import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('Header');
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; // true if user present else false
      console.log(!user);
    });
  }

  onSaveData() {
    console.log('onSaveData()');
    this.dataStorageService.storeRecipes();
    // setTimeout(() => {
    //   //<<<---using ()=> syntax
    //   this.chosenMod = 'none';
    // }, 3000);
  }
  onFetchData() {
    console.log('onFetchData()');
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  chosenMod: any = 'none';
  modo() {
    switch (this.chosenMod) {
      case 'save': {
        this.onSaveData();
        this.chosenMod = 'none';
        break;
      }
      case 'fetch': {
        this.onFetchData();
        this.chosenMod = 'none';
        break;
      }
    }
  }
}
