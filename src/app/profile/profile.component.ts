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
  constructor() { }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("userProfile"));
    this.currentUser = this.userProfile;
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
