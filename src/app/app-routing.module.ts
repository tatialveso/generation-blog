import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ThemeComponent } from './theme/theme.component';
import { EditThemeComponent } from './edit/edit-theme/edit-theme.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },
  { path: 'contato', component: ContactComponent },
  { path: 'index', component: HomeComponent },
  { path: 'temas', component: ThemeComponent },
  { path: 'editar-tema/:id', component: EditThemeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
