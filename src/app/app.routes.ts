import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },{
    path: 'vote',
    loadComponent: () => import('./views/pages/vote/vote.component').then(m => m.VoteComponent),
    data: {
      title: 'Vote Page'
    }
  },{
    path: 'candidate-add',
    loadComponent: () => import('./views/pages/candidate-add/candidate-add.component').then(m => m.CandidateAddComponent),
    data: {
      title: 'Candidate Add Page'
    }
  },
  {
    path: 'candidate-add/:id',
    loadComponent: () => import('./views/pages/candidate-add/candidate-add.component').then(m => m.CandidateAddComponent),
    data: {
      title: 'Candidate Add Page'
    }
  },{
    path: 'candidate/:id',
    loadComponent: () => import('./views/pages/candidate/candidate.component').then(m => m.CandidateComponent),
    data: {
      title: 'Candidate Details Page'
    }
  },
  {
    path: 'voter-add',
    loadComponent: () => import('./views/pages/voter-add/voter-add.component').then(m => m.VoterAddComponent),
    data: {
      title: 'Voter Add Page'
    }
  },
  {
    path: 'admin-view',
    loadComponent: () => import('./views/pages/admin-view/admin-view.component').then(m => m.AdminViewComponent),
    data: {
      title: 'Admin View'
    }
  },
  {
    path: 'voter-view/:id',
    loadComponent: () => import('./views/pages/voter-view/voter-view.component').then(m => m.VoterViewComponent),
    data: {
      title: 'Voter View'
    }
  },
  {
    path: 'voter-home',
    loadComponent: () => import('./views/pages/voter-home/voter-home.component').then(m => m.VoterHomeComponent),
    data: {
      title: 'Voter Home'
    }
  }, 
  {
    path: 'voter-list',
    loadComponent: () => import('./views/pages/voter-list/voter-list.component').then(m => m.VoterListComponent),
    data: {
      title: 'Voter List'
    }
  },
  { path: '**', redirectTo: 'login' }
];
