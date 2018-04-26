import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'; 
import { Item } from '../models/Item';
import {  Observable } from 'rxjs/Observable'

@Injectable()
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(private afs: AngularFirestore) { 
    const settings = {timestampsInSnapshots: true };
    afs.app.firestore().settings(settings);

    this.itemsCollection = this.afs.collection('Items');

    //this.items = this.afs.collection('Items').valueChanges();
    this.items = this.itemsCollection.snapshotChanges().map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      })
    });

  }

  getItems(){
    return this.items;
  }

  addItem(item : Item){
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item){
      this.itemDoc = this.afs.doc(`Items/${item.id}`);
      this.itemDoc.delete();
  }

  updateItem(item: Item){
    this.itemDoc = this.afs.doc(`Items/${item.id}`);
    this.itemDoc.update(item);
  }
}

