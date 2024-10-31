import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonCardHeader,
  IonImg,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonListHeader,
  IonLabel,
  IonChip,
  IonSkeletonText,
  IonFabButton,
  IonFab, IonFabList,
} from '@ionic/angular/standalone';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IActivity } from '../Models/IActivities';
import { Observable, take } from 'rxjs';
import { ActivityService } from '../Services/activity.service';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { play, add, share, shareSocial, bookmark, trashOutline } from 'ionicons/icons';
import { ActivityVideoPage } from './../activity-video/activity-video.page';
import { Auth } from '@angular/fire/auth';
import { FireStoreService } from '../Services/fire-store.service';


@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  styleUrls: ['./activity-details.page.scss'],
  standalone: true,
  imports: [IonFabList,
    IonFab,
    IonFabButton,
    IonSkeletonText,
    IonChip,
    IonLabel,
    IonListHeader,
    IonItem,
    IonList,
    IonCardContent,
    IonCardTitle,
    IonCard,
    IonImg,
    IonCardHeader,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonButton,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    ActivityVideoPage,
  ],
})
export class ActivityDetailsPage implements OnInit {
  public activityDetail: Observable<IActivity>;
  private fireStoreService = inject(FireStoreService)
  private auth = inject(Auth);

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    addIcons({ add, play, bookmark, shareSocial, share, trashOutline });
  }

  ngOnInit() {
    setTimeout(() => {
      this.activityDetail = this.activityService.getActivity(
        this.route.snapshot.params['activityID']
      );
    }, 1000);
  }

  async openModal() {
    const videoModal = await this.modalController.create({
      component: ActivityVideoPage,
    });

    return await this.activityDetail.subscribe((activity) => {
      videoModal.componentProps = {
        videoURL: activity.video_url,
      };
      return videoModal.present();
    });
  }

  public markAsFavorite() {
    this.activityDetail.pipe(take(1)).subscribe(activity => {


      if (!this.auth.currentUser) {
        console.error("User is not authenticated");
        return;
      }

      let favoriteData = {
        userId: this.auth.currentUser?.uid,
        activityId: activity.id,
        favorite: activity,
        timestamp: new Date()
      }

      this.fireStoreService.addUniqueDocument('favorites', favoriteData, 'activityId').subscribe({
        next: (res) => {
          console.log('Document successfully added', res)
          this.displayToast('top', `"${favoriteData.favorite.name}" was added to favorites`)
        },
        error: (err) => {
          console.log('Something went wrong', err)
          this.displayToast('top', err)
        }
      })
    })
  }

  async displayToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message,
      position,
      duration: 3000
    })

    await toast.present();
  }
}
