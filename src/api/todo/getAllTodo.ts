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

const getAllTodo = async ({ lmt = 10, type }: { lmt?: number; type?: "done" | "todo" }) => {
  const user = auth.currentUser

  if (!user) return []

  const constraints: QueryConstraint[] = [
    where("uid", "==", user.uid),
    orderBy("createDate", "desc"),
  ]

  if (lmt > 0) {
    constraints.push(limit(lmt))
  }

  switch (type) {
    case "todo":
      constraints.push(where("done", "==", false))
      break
    case "done":
      constraints.push(where("done", "==", true))
      break
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

export default getAllTodo
