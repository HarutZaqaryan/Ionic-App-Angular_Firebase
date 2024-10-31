import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc, getDocs, query, where, } from '@angular/fire/firestore';
import { map, Observable, from, take, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  private fireStore = inject(Firestore);

  constructor() { }

  addDocument(collectionName: string, data: any) {
    const collectionRef = collection(this.fireStore, collectionName);
    return from(addDoc(collectionRef, data))
  }

  addUniqueDocument(collectionName: string, data: any, uniqueField: string) {
    const collectionRef = collection(this.fireStore, collectionName);
    const q = query(collectionRef, where(uniqueField, '==', data[uniqueField]));
    return from(getDocs(q)).pipe(
      take(1),
      switchMap((snapshot) => {
        if (snapshot.empty) {
          return from(addDoc(collectionRef, data));
        } else {
          return throwError(() => new Error('Document with this unique field already exists.'));
        }
      })
    );
  }

  getDocument(collectionName: string, docId: string): Observable<any> {
    const docRef = doc(this.fireStore, `${collectionName}/${docId}`);
    return from(getDoc(docRef)).pipe(map((snapshot) => snapshot.data()))
  }

  getDocuments(collectionName: string, field?: string, value?: any) {
    const collectionRef = collection(this.fireStore, collectionName);
    const q = field ? query(collectionRef, where(field, '==', value)) : collectionRef;
    return from(getDocs(q)).pipe(map((snapshot) => snapshot.docs.map((doc) => doc.data())))
  }
}
