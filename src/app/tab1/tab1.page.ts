import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonSkeletonText
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ActivityService } from '../Services/activity.service';
import { IActivity } from '../Models/IActivities';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { IonRouterOutlet, IonApp } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonImg,
    IonSkeletonText,
    ExploreContainerComponent,
    RouterModule,
    IonRouterOutlet,
    IonApp
  ],
})
export class Tab1Page implements OnInit {
  public activityList: Observable<IActivity[]>;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.activityList = this.activityService.getAllActivities();
    }, 500);
  }
}
