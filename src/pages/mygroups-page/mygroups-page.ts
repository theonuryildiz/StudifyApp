import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, ModalController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule, ResponseType } from '@angular/http';
import { map } from 'rxjs/operators';
import { ChatsPage } from '../chat/chats';
import { MessagesPage } from '../chat/messages/messages';


@IonicPage()
@Component({
  selector: 'page-mygroups',
  templateUrl: 'mygroups-page.html'
})
export class MyGroupsPage {
  items;
  items2;
  group;
  hasGroup;
  locked;
  unlockButtonName;
  unlockButtonIcon;
  constructor(public navCtrl: NavController, http: HttpClient, public alertCtrl: AlertController,public modalCtrl: ModalController) {
  }

  ionViewDidEnter(){
    
    var userId = localStorage.getItem("stud-userId");
    if(!localStorage.getItem("stud-currentTeam") || localStorage.getItem("stud-currentTeam") == ""){
      var item = {
        name: "Group Not Found",
      }
      
      var st2:any = [];
      st2.push(item);
      this.items = st2;
      this.hasGroup = false;
      return;
    }
    this.hasGroup = true;
    this.group = JSON.parse(localStorage.getItem("stud-currentTeam"));
    if(this.group.locked){
      this.group.lockedd = "Locked";
      this.unlockButtonName = "Unlock";
      this.unlockButtonIcon = "unlock";
      this.locked = true;
    }
    else{
      this.group.lockedd = "Unlocked";
      this.unlockButtonName = "Lock";
      this.unlockButtonIcon = "lock";
      this.locked = false;
    } 
    var st2:any = [];
    st2.push(this.group);

    console.log(st2);
    this.items = st2;
  }

  viewTerket(item) {
    let al = this.alertCtrl.create({
      title: 'Studify',
      subTitle: 'Grubu başarıyla terkettiniz.',
      buttons: ['Tamam']
    });

    al.present();

    var userId = localStorage.getItem("stud-userId");

    localStorage.setItem("stud-currentTeam","");
    this.ionViewDidEnter();
  }

  viewBilgi(item) {
    localStorage.setItem("stud-showTeam",localStorage.getItem("stud-userId"));
    this.modalCtrl.create('GroupInfoModalPage', null, { cssClass: 'inset-modal' })
    .present();
  }

  viewLock(item){
    if(this.unlockButtonName == "Lock"){
      this.unlockButtonName = "Unlock";
      this.group.lockedd = "Locked";
      this.unlockButtonIcon = "unlock";
      this.locked = true;
    }
    else{
      this.unlockButtonName = "Lock";
      this.group.lockedd = "Unlocked";
      this.unlockButtonIcon = "lock";
      this.locked = false;
    }
  }

  viewChat(item) {
    localStorage.setItem("stud-showchat", JSON.stringify(item));
    this.navCtrl.push(MessagesPage);
  }
}


/*

    var head = new HttpHeaders();
    head.append('Access-Control-Allow-Origin' , '*');
    head.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    head.append('Accept','application/json');
    head.append('content-type','application/json');
    this.items2 = this.items;
    http.get('http://localhost:8100/#/home', {headers: head, responseType: 'text'} ).pipe().subscribe(res => console.log(res.toString()));
  */