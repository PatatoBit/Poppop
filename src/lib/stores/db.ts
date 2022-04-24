import {db} from './firebase'
import { doc, increment, setDoc } from 'firebase/firestore'

export async function Increment() {
  const userRef = doc(db, 'pops', 'total')
  

      await setDoc(userRef, {
        clicks: increment(1)
      }, {merge: true})
      console.log("that's done")
}

export let clicks = doc(db, 'pops', 'total')