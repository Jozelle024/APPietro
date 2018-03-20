import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OggettoProvider } from '../providers/oggetto/oggetto';
import { FormPage } from '../pages/form/form';
import { NativeStorage } from '@ionic-native/native-storage'; 
import { Camera } from '@ionic-native/camera'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OggettoProvider,
    NativeStorage,
    Camera
  ]
})
export class AppModule {}
