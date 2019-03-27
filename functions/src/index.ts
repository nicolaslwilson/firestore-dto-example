import * as functions from 'firebase-functions';

import { UserDocument } from '../../core/firestore/users';
import { validate } from 'class-validator';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const onUserUpdate = functions.firestore.document(`/users/{id}`).onWrite(async (change, context) => {
  const update = change.after.data();
  const userDoc = new UserDocument();
  Object.assign(userDoc, update);
  const errors = await validate(userDoc);
  if (errors.length > 0) {
    return change.after.ref.set(change.before.data());
  }
  
  return;
})