import { firestore } from 'firebase';

export class Usuario {
    constructor(
        public uid: string,
        public nombre: string,
        public email: string,
        public timestamp: firestore.Timestamp
    ){}
}