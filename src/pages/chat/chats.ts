import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'chats.html',
})

export class ChatsPage {

  chats;

  constructor(public navCtrl: NavController) {
    this.chats = JSON.parse(localStorage.getItem("stud-chats"));
  }

  ionViewDidEnter(){
    this.chats = JSON.parse(localStorage.getItem("stud-chats"));
  }
  viewMessages(chat) {
    localStorage.setItem("stud-showchat",JSON.stringify(chat));
    this.navCtrl.push('MessagesPage', { chatId: chat.id });
  }
}
