import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Skills } from './skills/skills';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';

export const routes: Routes = [
    { path: '', component: Home, title: 'Home' },
    { path: 'skills', component: Skills, title: 'Skills' },
    { path: 'projects', component: Projects, title: 'Projects' },
    { path: 'contact', component: Contact, title: 'Contact' }
];
