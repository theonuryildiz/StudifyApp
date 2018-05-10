import { FormControl, FormBuilder } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

  doneLoading = false;

  messages: any = [];
  allMessages;
  chatId;
  chat;

  toUser = {
    _id: '534b8e5aaa5e7afc1b23e69b',
    pic: 'assets/img/avatar/ian-avatar.png',
    username: 'Venkman',
  };

  user = {
    _id: '534b8fb2aa5e7afc1b23e69c',
    pic: 'assets/img/avatar/marty-avatar.png',
    username: 'Marty',
  };

  @ViewChild(Content) content: Content;

  public messageForm: any;
  chatBox: any;
  chats:any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

  
    this.user._id = localStorage.getItem("stud-userId");
    this.user.username = localStorage.getItem("stud-name");
    this.chat = JSON.parse(localStorage.getItem("stud-showchat"));
    if(this.chat.id != 4 && this.chat.id != 0 && this.chat.id != 2) this.chat.id = 4; 
    this.chats = JSON.parse(localStorage.getItem("stud-chats"));
    for(var i = 0 ; i < this.chats.length; i++)
      if(this.chats[i].groupId == this.chat.id){
        this.chat = this.chats[i];
        break;
      }
    this.chatId = this.chat.chatId;
    this.allMessages = JSON.parse(localStorage.getItem("stud-messages"));
    this.messageForm = formBuilder.group({
      message: new FormControl('')
    });
    this.chatBox = '';

  }

  ionViewDidEnter(){


    this.allMessages = JSON.parse(localStorage.getItem("stud-messages"));
    var temp:any = [];
    for(var i = 0; i < this.allMessages.length; i++)
      if(this.allMessages[i].chatId.toString() == this.chatId.toString())
        temp.push(this.allMessages[i]);

    this.messages = temp;
  }

  send(message) {
    if (message && message !== '') {
      // this.messageService.sendMessage(chatId, message);

      const messageData =
        {
          messageId: this.allMessages.length,
          chatId: this.chatId,
          date: new Date(),
          userId: localStorage.getItem("stud-userId"),
          username: localStorage.getItem("stud-name"),
          pic: 'assets/img/avatar/marty-avatar.png',
          text: message
        };

      this.allMessages.push(messageData);
      localStorage.setItem("stud-messages",JSON.stringify(this.allMessages));
      this.ionViewDidEnter();
      this.scrollToBottom();

      setTimeout(() => {
        const replyData =
          {
            messageId: this.allMessages.length,
            chatId: this.chatId,
            date: new Date(),
            userId: 5,
            username: "Çağdaş",
            pic: "assets/img/avatar/ian-avatar.png",
            text: 'Bence de'
          };
        this.allMessages.push(replyData);
        localStorage.setItem("stud-messages",JSON.stringify(this.allMessages));
        this.ionViewDidEnter();
        this.scrollToBottom();
      }, 5000);
    }
    this.chatBox = '';
  }

  scrollToBottom() {
    setTimeout(() => {
      this.ionViewDidEnter();
      this.content.scrollToBottom();
    }, 100);
  }

}
