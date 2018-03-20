import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { OggettoPrestato } from '../../models/oggettoPrestato';
import { User } from '../../models/user';
import { OggettoProvider } from '../../providers/oggetto/oggetto';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  options: CameraOptions;
  imageUrl;
  oggettoPassato: OggettoPrestato;
  users: User[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private servizioOggetto: OggettoProvider) {
/*     this.options = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
    } */
    this.oggettoPassato;
    this.oggettoPassato = this.navParams.get('oggetto');
    this.servizioOggetto.getUsers().subscribe(users => this.users = users);
  }

  ionViewDidLoad() {
    console.log(this.oggettoPassato);
    console.log('ionViewDidLoad FormPage');
    
  }

  getUser(id: number):string{
    const temp = this.users.find(user => user.id === id);
    return temp.nome;
  }

  takePicture(){
    this.camera.getPicture().then((imageData) => {
      this.imageUrl = imageData;
      console.log('prova');
    },(error) => console.error(error))
  }

}
