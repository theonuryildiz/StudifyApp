import { Component } from '@angular/core';
import { NavParams, ViewController, IonicPage, NavController } from 'ionic-angular';
import { ProfilePage } from '../../profile-page/profile-page';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-groupinfo-modal',
  templateUrl: 'groupinfo-modal.html'
})
export class GroupInfoModalPage {
  items: any;
  rootPage: any;
  getUserList(){
    
    var usern = localStorage.getItem("stud-username");
    var userId = localStorage.getItem("stud-showTeam");
    if(userId != "-1"){
      var head = new HttpHeaders();
      this.http.get('/api/team', {headers: {'userId': userId}, responseType: 'text'} ).pipe().subscribe(res => {
        var jes = JSON.parse(res);
        console.log(jes);
        this.items = jes.members;
      });
    }
    else
    {
      this.items = JSON.parse(localStorage.getItem("stud-showTeamInfo"));
    }

  }

  constructor(
    public viewCtrl: ViewController, params: NavParams, public navCtrl: NavController, public http: HttpClient
  ) {
    this.getUserList();
    /*
    let items2:any = [];
    group = group.users;
    for(var i = 0; i < group.length; i++)
      for(var j = 0; j < users.length; j++)
      {
        if(users[j].userId == group[i]){
          items2.push(users[j]);
          break;
        }
      }
    
    this.items = items2;
    */
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  userClicked(item){
    localStorage.setItem("stud-showProfile", item.username);
    this.navCtrl.push(ProfilePage);
  }

}
