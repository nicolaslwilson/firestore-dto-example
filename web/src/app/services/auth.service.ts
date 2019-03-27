import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserService } from './user.service';
import { SignUpFormValues } from '../sign-up-form/sign-up-form.component';
import { UserDocument } from '../../../../core/firestore/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
  ) { }

  async signUp({ name, email, password }: SignUpFormValues) {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

    const userDoc: UserDocument = {
      name,
      email,
    };

    return await this.userService.createUser(userDoc);
  }
}
