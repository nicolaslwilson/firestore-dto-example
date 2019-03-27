import { Injectable } from '@angular/core';
import { AngularFirestore, docChanges } from '@angular/fire/firestore';
import { validate } from 'class-validator';
import { map, switchMap } from 'rxjs/operators';

import { UserDocument } from '../../../../core/firestore/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private collection = this.db.collection<UserDocument>(`users`);

  constructor(
    private db: AngularFirestore,
  ) { }

  async createUser(id: string, user: UserDocument) {
    const errors = await validate(user);

    if (errors.length > 0) {
      throw errors;
    }

    return await this.collection.doc<UserDocument>(id).set(user);
  }

  getUser(id: string) {
    return this.collection.doc<UserDocument>(id).get()
      .pipe(
        map(snapshot => {
          if (snapshot.exists === false) {
            throw new Error('Document not found');
          }

          return snapshot.data();
        }),
        switchMap(doc => this.validateUserDocument(doc))
      );
  }

  private async validateUserDocument(doc) {
    const errors = await validate(doc);

    if (errors.length > 0) {
      throw errors;
    }

    return <UserDocument>doc;
  }

}
