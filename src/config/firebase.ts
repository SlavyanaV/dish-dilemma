import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBx-kmV1w_rKrVVbUNeTGjxJ5L3GTy_lqs',
  authDomain: 'dish-dilemma.firebaseapp.com',
  projectId: 'dish-dilemma',
  storageBucket: 'dish-dilemma.appspot.com',
  messagingSenderId: '534669872042',
  appId: '1:534669872042:web:177e34b4bb6898fae6b9d3',
  measurementId: 'G-W16LY03EQ4',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
