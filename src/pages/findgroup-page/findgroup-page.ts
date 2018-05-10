import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule, ResponseType } from '@angular/http';
import { map } from 'rxjs/operators';
import { CreateTopicPage } from '../createtopic-page/createtopic-page';
import { EnterTalentsPage } from '../entertalents-page/entertalents-page';

@IonicPage()
@Component({
  selector: 'page-findgroup',
  templateUrl: 'findgroup-page.html'
})
export class FindGroupPage {
  items;
  items2;

  getTopicList(){

    var userId = localStorage.getItem("stud-userId");
    var location = localStorage.getItem("stud-location");
    var head = new HttpHeaders();
    this.http.get('/api/locations/'+ location + '/topics', {headers: {'userId': userId}, responseType: 'text'} ).pipe().subscribe(res => {
      var jes = JSON.parse(res);
      console.log(jes);
      localStorage.setItem("stud-topiclist",JSON.stringify(jes));
      this.items = jes;
      this.items2 = jes;
    });

  }

  constructor(public navCtrl: NavController, public http: HttpClient) {

  }

  ionViewDidEnter(){
    this.getTopicList();
  }

  delete(item) {
    alert('Deleted ' + item.title);
  }

  viewComments(item) {
    alert('Viewing comments of ' + item.title);
  }

  viewPlayers(item) {
    alert('Viewing players of ' + item.title);
  }


  getItems(ev:any){
    
    let val = ev.target.value;

    this.items2 = JSON.parse(localStorage.getItem("stud-topiclist"));
    this.items = this.items2.filter((item) => {
      return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });

  }

  itemTapped(event, item) {
    
    localStorage.setItem("stud-topicClicked",JSON.stringify(item));
    this.navCtrl.push(EnterTalentsPage);
  }

  createTopicClicked(){
    this.navCtrl.push(CreateTopicPage);
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
