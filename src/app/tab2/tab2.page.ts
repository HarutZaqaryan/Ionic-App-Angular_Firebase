import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonImg, IonCardHeader, IonCardTitle, IonSkeletonText, IonCardContent, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Auth } from '@angular/fire/auth';
import { FireStoreService } from '../Services/fire-store.service';
import { RouterModule } from '@angular/router';
import { trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonIcon, IonButton, IonCardContent, IonSkeletonText, IonCardTitle, IonCardHeader, IonImg, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, RouterModule]
})
export class Tab2Page {

  private auth = inject(Auth);
  private firestoreService = inject(FireStoreService)

  public favorites: any;

  constructor() {
    addIcons({ trashOutline });

  }

  getFavorites() {
    this.firestoreService.getDocuments('favorites', 'userId', this.auth.currentUser?.uid)
      .subscribe({
        next: (docs) => {
          this.favorites = docs;
          console.log(this.favorites)
        },
        error: (error) => console.error('Error getting documents: ', error)
      });
  }

  ionViewWillEnter() {
    this.getFavorites()
  }


  removeFromFavorites(id: string) {
    // ToDo - Implementation
    this.getFavorites()
  }

}
