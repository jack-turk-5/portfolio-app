import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Skills } from './skills/skills';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'skills', component: Skills },
    { path: 'projects', component: Projects },
    { path: 'contact', component: Contact }
];
