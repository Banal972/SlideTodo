import {
  QueryConstraint,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { auth, db } from "firebaseConfig"

const getDoneTodo = async (lmt: number = 10) => {
  const user = auth.currentUser

  if (!user) return []

  const constraints: QueryConstraint[] = [
    where("uid", "==", user.uid),
    where("done", "==", true),
    orderBy("createDate", "desc"),
  ]

  if (lmt > 0) {
    constraints.push(limit(lmt))
  }

  const q = query(collection(db, "todos"), ...constraints)

  const querySnapshot = await getDocs(q)

  const todos = querySnapshot.docs.map((doc) => {
    const { title, createDate, done } = doc.data()

    return {
      title,
      done,
      createDate,
      id: doc.id,
    }
  })
  return todos
}

export default getDoneTodo
