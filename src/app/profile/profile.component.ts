import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userProfile;
  currentUser;
  userId;
  interest;
  constructor() { }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("userProfile"));
    this.currentUser = this.userProfile;
    this.interest = this.currentUser.interest.map(item => {
      return item.display;
    }).join(",");
  }
  handleFileInput(file){
    const reader = new FileReader();

    reader.readAsDataURL(file[0]);

    reader.onload = (event) => {
      this.currentUser.imageUrl = event.target['result'];
      this.userProfile['imageUrl'] = event.target['result'];
      localStorage.removeItem('userProfile');
      localStorage.setItem('userProfile',JSON.stringify(this.userProfile));
    };
  }
}
