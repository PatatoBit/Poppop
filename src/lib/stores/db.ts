import {db} from './firebase'
import { doc, increment, setDoc, collection } from 'firebase/firestore'

export async function Increment(guild = 'Neutral', num) {
  const totalRef = doc(db, 'pops', 'total')
  const guildRef = collection(db, 'pops/total', 'guilds')

      await setDoc(totalRef, {
        clicks: increment(num)
      }, {merge: true})

      await setDoc(doc(guildRef, guild), {
        clicks: increment(num)
      }, {merge: true})
}
