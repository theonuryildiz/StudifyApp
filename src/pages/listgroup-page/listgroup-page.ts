import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, ModalController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule, ResponseType } from '@angular/http';
import { map } from 'rxjs/operators';
import { CreateGroupPage } from '../creategroup-page/creategroup-page';

@IonicPage()
@Component({
  selector: 'page-listgroup',
  templateUrl: 'listgroup-page.html'
})
export class ListGroupPage {
  items;
  items2;

  getGroupList(){

    var userId = localStorage.getItem("stud-userId");
    var location = localStorage.getItem("stud-location");
    var topic = JSON.parse(localStorage.getItem("stud-topicClicked"));
    console.log(topic);
    var head = new HttpHeaders();
    this.http.get('/api/topics/'+ topic.id + '/teams', {headers: {'userId': userId}, responseType: 'text'} ).pipe().subscribe(res => {
      var jes = JSON.parse(res);
      console.log(jes);
      this.items = jes;
    });
    
  }

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController,
              public modalCtrl: ModalController) {
}

  ionViewDidEnter(){
    
    this.getGroupList();
  }

  viewKatil(item) {
    let al = this.alertCtrl.create({
      title: 'Studify',
      subTitle: 'Gruba katılma isteğiniz gönderildi. Onaylandığında bildirim alacaksınız.',
      buttons: ['Tamam']
    });

    al.present();
  }

  viewBilgi(item) {
    localStorage.setItem("stud-showTeam", "-1");
    localStorage.setItem("stud-showTeamInfo",JSON.stringify(item.members));
    this.modalCtrl.create('GroupInfoModalPage', null, { cssClass: 'inset-modal' })
    .present();
  }

  createGroupClicked(){
    this.navCtrl.push(CreateGroupPage);
  }
}


/*
    var head = new HttpHeaders();
    head.append('Access-Control-Allow-Origin' , '*');
    head.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    head.append('Accept','application/json');
    head.append('content-type','application/json');
    this.items2 = this.items;
//    http.get('http://localhost:8100/#/home', {headers: head, responseType: 'text'} ).pipe().subscribe(res => console.log(res.toString()));
  */