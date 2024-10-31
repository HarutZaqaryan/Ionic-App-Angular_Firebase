import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { canEnterTabsPageGuard } from '../can-enter-tabs-page.guard';
export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate:[canEnterTabsPageGuard],
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'tab1/activity-details/:activityID',
        loadComponent: () =>
          import('../activity-details/activity-details.page').then(
            (m) => m.ActivityDetailsPage
          ),
      },
      {
        path: 'tab2/activity-details/:activityID',
        loadComponent: () =>
          import('../activity-details/activity-details.page').then(
            (m) => m.ActivityDetailsPage
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
