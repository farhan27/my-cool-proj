import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'; 
import { Item } from '../models/Item';
import {  Observable } from 'rxjs/Observable'

@Injectable()
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) { 
    const settings = {timestampsInSnapshots: true };
    afs.app.firestore().settings(settings);

    this.items = this.afs.collection('Items').valueChanges();
    console.log(this.items);
  }

  getItems(){
    return this.items;
  }

}

