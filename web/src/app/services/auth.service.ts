import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserDocument } from '../../../../core/firestore/users';

import { UserService } from './user.service';
import { SignUpFormValues } from '../sign-up-form/sign-up-form.component';
import { User } from 'firebase';


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

    const firesbaseUser = <User>credential.user;

    const userDoc: UserDocument = {
      name,
      email,
    };

    return await this.userService.createUser(firesbaseUser.uid, userDoc);
  }
}
