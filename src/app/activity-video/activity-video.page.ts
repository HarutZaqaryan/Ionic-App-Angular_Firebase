import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { ModalController, NavParams } from '@ionic/angular/standalone';

@Component({
  selector: 'app-activity-video',
  templateUrl: './activity-video.page.html',
  styleUrls: ['./activity-video.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonFabButton,
    IonFab,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ActivityVideoPage {
  videoURL: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    addIcons({ close });
    this.videoURL = this.navParams.get('videoURL');
  }

  closeModal() {
    this.modalController.dismiss({
      component: ActivityVideoPage,
    });
  }
}
