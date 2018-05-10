import { Component } from '@angular/core';
import { NavController, IonicPage, Events, AlertController } from 'ionic-angular';
import { ValueTransformer } from '@angular/compiler/src/util';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-main-page',
  templateUrl: 'main-page.html',
})
export class MainPage {


  getUserData()
  {
    var usern = localStorage.getItem("stud-username");
    var head = new HttpHeaders();
    this.http.get('/api/users/'+usern, { responseType: 'text'} ).pipe().subscribe(res => {
      var jes = JSON.parse(res);
      console.log(jes);
      localStorage.setItem("stud-showProfile",usern);
      localStorage.setItem("stud-userId", jes.id.toString());
      localStorage.setItem("stud-profilePic", jes.profilePic);
      localStorage.setItem("stud-name", jes.name);
      localStorage.setItem("stud-currentTeam", JSON.stringify(jes.currentTeam));
      localStorage.setItem("stud-currentTopic", JSON.stringify(jes.currentTopic));
    });


    

  }

  constructor(public navCtrl: NavController, public events: Events, public alertCtrl: AlertController, public http: HttpClient) { 

    if(localStorage.getItem("stud-userId") == "-1"){
      this.locationSelector();
      localStorage.setItem("stud-messages",JSON.stringify(this.messages));
      localStorage.setItem("stud-chats",JSON.stringify(this.chats));
      localStorage.setItem("stud-userList",JSON.stringify(this.users));
      localStorage.setItem("stud-grouplist",JSON.stringify(this.groups));
      localStorage.setItem("stud-requestList",JSON.stringify(this.requests));
    }

    
  }


  locationSelector(){

    let prompt = this.alertCtrl.create({
      title: 'Konumunuzu Seçin',
      inputs : [
      {
          type:'radio',
          label:'TOBB ETÜ',
          value: '1'
      },
      {
          type:'radio',
          label:'Bilkent',
          value:'0'
      }],
      buttons : [
      {
          text: "Seç",
          handler: data => {
            console.log(data);
            localStorage.setItem("stud-location", data);
            this.getUserData();
          }
      }]});
      prompt.present();
  }


  items = [
    {
      name: 'Studify Nedir',
      description: 'Bulunduğunuz yerde istediğiniz konuda mükemmel çalışma grupları bulmaınızı sağlayan harika bir uygulama! You can check our repository at https://github.com/Bil496/StudifyApp',
      imageUrl: ''
    },
    {
      name: 'Nasıl Kullanılır',
      description: 'StudifyApp\'i kullanmak için:',
      step1: '1- Find Groups Sayfasına gidin.',
      step2: '2- Aradığınız topic\'i seçin ya da oluşturun. ',
      step3: '3- Topic seçip bilgi seviyenize göre kendinize skor verin.',
      step4: '4- Karşınıza çıkan grup listesi size en uygun olan en üstte olacak şekilde sıralanmış olacaktır. Katılmak istediğiniz grubu sola kaydırıp katıl butonuna \
      tıklayın ya da bilgi butonuna basarak gruptakiler hakkında bilgi edinin.',
      step5: '5- Katıl butonuna tıkladığınızda o gruptaki her bir üyeye bildirim gidecek ve herhangi biri sizi onayladığında gruba katılmış olacaksınız.',
      step6: '6- Katıldığınız grubu My Group sayfasından görüntüleyebilirsiniz.',
      imageUrl: 'https://cdn-image.travelandleisure.com/sites/default/files/styles/964x524/public/1479487289/belgrade-serbia-fortress-WTG2017.jpg?itok=rw8c4Esh',
    },
    {
      name: 'İletişim',
      description: 'Bizlere github repositorymizden ulaşabilirsiniz',
      imageUrl: 'https://cdn-image.travelandleisure.com/sites/default/files/styles/964x524/public/1479487289/belgrade-serbia-fortress-WTG2017.jpg?itok=rw8c4Esh',
    },
    {
      name: 'Hakkımızda',
      description: 'TOBB ETÜ Bilgisayar Mühendisliği 4. Sınıf 5 arkadaşız. Bitirme projesi dersi için bir araya geldik ve ortaya böyle bir ürün çıkardık. ',
      imageUrl: '',
    }
  ];

  users = [
    {
      userId: 0,
      name: "Onur Yildiz",
      username: "oyildiz"
    },
    {
      userId: 1,
      name: "Burak Uyar",
      username: "buyar"
    },
    {
      userId: 2,
      name: "Fatih Erdem Kizilkaya",
      username: "fekizilkaya"
    },
    {
      userId: 3,
      name: "Ahmet Selim Kaya",
      username: "askaya"
    },
    {
      userId: 4,
      name: "Gorkem Mulayim",
      username: "gmulayim"
    },
    {
      userId: 5,
      name: "Cagdas Evren Gerede",
      username: "cegerede"
    }
  ];

  groups = [
    {
      id: 0,
      topicId: 0,
      imageUrl: 'assets/img/lists/stadium.jpg',
      title: '111deyiz',
      place: 'bahce',
      date: '11:24',
      users: [ 0,1,2 ]
    },
    {
      id: 1,
      topicId: 0,
      imageUrl: 'assets/img/lists/stadium-3.png',
      title: 'Grup Fuaye',
      place: 'kutuphane',
      date: '15:36',
      users: [1,2]
    },
    {
      id: 2,
      topicId: 0,
      imageUrl: 'assets/img/lists/stadium-2.jpg',
      title: 'Sabahlamali',
      place: '112',
      date: '18:09',
      users: [0,3,4]
    },
    {
      id: 3,
      topicId: 1,
      imageUrl: 'assets/img/lists/stadium-2.jpg',
      title: 'Sabahlamali',
      place: '112',
      date: '08:14',
      users: [0,1,2,3]
    },
    {
      id: 4,
      topicId: 1,
      imageUrl: 'assets/img/lists/stadium-2.jpg',
      title: 'Yurt Grubu',
      place: 'yurt',
      date: '18:09',
      users: [2,3,4]
    },
    {
      id: 5,
      topicId: 2,
      imageUrl: 'assets/img/lists/stadium-2.jpg',
      title: 'Kutuphane',
      place: '112',
      date: '15:02',
      users: [0,1,2,3,4]
    },
  ];

  requests = [
    {
      reqId: 0,
      userId: 0,
      username: 'Onur Yıldız',
      groupname: "Group1"
    },
    {
      reqId: 1,
      userId: 4,
      username: 'Görkem Mülayim',
      groupname: "Mat101 Boys"
    },
    {
      reqId: 2,
      userId: 3,
      username: 'Ahmet Selim Kaya',
      groupname: "Team Kutuphane"
    },
  ];

  chats = [{
      chatId: 0,
      imageUrl: 'assets/img/avatar/marty-avatar.png',
      groupId: 0,
      groupName: "111deyiz",
      lastMessage: 'Hadi toplanalim'
    },
    {
      chatId: 1,
      imageUrl: 'assets/img/avatar/ian-avatar.png',
      groupId: 2,
      groupName: "Sabahlamali",
      lastMessage: 'Notlari getiriyorum'
    },
    {
      chatId: 2,
      imageUrl: 'assets/img/avatar/sarah-avatar.jpg',
      groupId: 4,
      groupName: "Yurt Grubu",
      lastMessage: '18.30da eve gitmem gerekiyor benim'
    }
  ];

  messages = [
    {
      messageId: 0,
      chatId: 0,
      date: new Date(),
      userId: 0,
      username: "Onur",
      pic: "assets/img/avatar/ian-avatar.png",
      text: 'Nerdesiniz'
    },
    {
      messageId: 1,
      chatId: 0,
      date: new Date(),
      userId: 3,
      username: "Ahmet",
      pic: 'assets/img/avatar/marty-avatar.png',
      text: 'Tamam'
    },
    {
      messageId: 3,
      chatId: 1,
      date: new Date(),
      userId: 4,
      username: "Gorkem",
      pic: 'assets/img/avatar/marty-avatar.png',
      text: 'Ben de birazdan geliyorum'
    },
    {
      messageId: 4,
      chatId: 1,
      date: new Date(),
      userId: 0,
      username: "Onur",
      pic: "assets/img/avatar/ian-avatar.png",
      text: 'Hazir misiniz'
    },
    {
      messageId: 5,
      chatId: 2,
      date: new Date(),
      userId: 1,
      username: "Burak",
      pic: "assets/img/avatar/ian-avatar.png",
      text: 'Bahceye mi gecsek?'
    },
    {
      messageId: 6,
      chatId:2,
      date: new Date(),
      userId: 2,
      username: "Fatih",
      pic: 'assets/img/avatar/marty-avatar.png',
      text: 'Evet!'
    }
  ];
}
