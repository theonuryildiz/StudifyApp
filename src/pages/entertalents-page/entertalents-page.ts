import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ListGroupPage } from '../listgroup-page/listgroup-page';
@IonicPage()
@Component({
  selector: 'page-entertalents-page',
  templateUrl: 'entertalents-page.html'
})
export class EnterTalentsPage {
  rootPage: any;
  topicId: any;
  allItems: any;
  topic: any;
  title: string;
  items:any;
  constructor(public navCtrl: NavController) {
    this.topic = JSON.parse(localStorage.getItem("stud-topicClicked"));
    this.title = this.topic.title;
    this.items = this.topic.subTopics;
  }

  findClicked(){
    console.log(this.items);
    localStorage.setItem("stud-scores",JSON.stringify(this.items));
    this.navCtrl.push(ListGroupPage);
  }
}
