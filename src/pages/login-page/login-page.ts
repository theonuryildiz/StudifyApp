import { Component } from '@angular/core';
import { AlertController, App, LoadingController, IonicPage, NavController, Events } from 'ionic-angular';
import { MainPage } from '../main-page/main-page';

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {

  usern: string;
  passwd: string;
  public backgroundImage = 'assets/img/background/background-5.jpg';

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public events: Events,
    public app: App
  ) { }

  login() {
    
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Logged in!',
        subTitle: 'Thanks for logging in.',
        buttons: ['Dismiss']
      });

      localStorage.setItem("stud-username",this.usern);
      localStorage.setItem("stud-userId","-1");
      this.navCtrl.setRoot(MainPage);
    });

    loading.present();

  }

  goToSignup() {
    // this.navCtrl.push(SignupPage);
  }

  goToResetPassword() {
    // this.navCtrl.push(ResetPasswordPage);
  }
}
