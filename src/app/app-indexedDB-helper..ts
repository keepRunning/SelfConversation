import { RSA_NO_PADDING } from "constants";
import { promise } from "protractor";

export class IndexedDBHelper {

    private objectStore;
    private db;

    public initializeDB() {
        if (!window.indexedDB) {
            console.log('Your browser does not support a stable version of IndexedDB. Such and such feature will not be available.');
            return;
        }

        let request = window.indexedDB.open('MyTestDatabase3', 1);
        request.onsuccess = (ev) => {
            console.log('onsuccess', ev);
            this.db = (<any> event.target).result;
            console.log('db', this.db);
        };
        request.onerror = (ev) => {
            console.log('onerror', ev);
        };
        request.onupgradeneeded = (ev) => {
            console.log('onUpgradeNeeded', ev);
            this.db = (<any> event.target).result;
            this.objectStore = this.db.createObjectStore('conversations', { keyPath: 'name' });
        };
    }

    public saveMessage(messageObject: any) {
        return new Promise((resolveFn, rejectFn) => {
            let obj = { messageObject, name: 'test' };
            console.log('saveMessage', this.db, obj);
            let objectStoreInstance = this.db.transaction('conversations', 'readwrite').objectStore('conversations');
            let r1 = objectStoreInstance.add(obj);
            r1.onsuccess = (e) => {
                // console.log('onsuccess - insertion', e);
                resolveFn(r1);
            };
            r1.onerror = (e) => {
                // console.log('onerror insert', e);
                // try put
                objectStoreInstance = this.db.transaction('conversations', 'readwrite').objectStore('conversations');
                let r2 = objectStoreInstance.put(obj);
                r2.onsuccess = (ev) => {
                    // console.log('onsuccess - put', ev);
                    resolveFn(r2);
                }
                r2.onerror = (ev) => {
                    // console.log('onerror - put', ev, r2);
                    rejectFn(r2);
                }
            };
        });
    }

    public getData(name: string = 'test') {
        return new Promise((resolveFn, rejectFn) => {
            let transaction = this.db.transaction(['conversations']);
            let myObjStore = transaction.objectStore('conversations');
            let request = myObjStore.get(name);
    
            request.onsuccess = (ev) => {
                // console.log('onsuccess', ev, (<any> event.target).result);
               resolveFn((<any> event.target).result);
            };
            request.onerror = (ev) => {
                // console.log('onerror', ev);
                rejectFn();
            };
        });        
    }
}