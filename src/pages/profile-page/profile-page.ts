import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html',
})
export class ProfilePage {

  user =
  {
    name: 'Cosima Niehaus',
    coverImage: 'assets/img/background/background-5.jpg',
    profileImage: '',
    occupation: 'Computer Science',
    location: 'Seattle, WA',
    description: '',
    address: '27 King\'s College Cir, Toronto, ON M5S, Canada',
    phone: '555 555 555',
    email: 'cosima@niehaus.com',
    whatsapp: '555 555 555',
  };


  constructor(public navCtrl: NavController, public http: HttpClient) { 

    var usern: any;
    usern = localStorage.getItem("stud-showProfile");
    localStorage.setItem("stud-showProfile",localStorage.getItem("stud-username"));

    this.http.get('/api/users/'+usern, { responseType: 'text'} ).pipe().subscribe(res => {
      var jes = JSON.parse(res);
      this.user.profileImage = jes.profilePic;
      this.user.name = jes.name;
      this.user.email = jes.username + "@etu.edu.tr";
    });
    
  }


  ionViewDidLoad() {
  }

}
