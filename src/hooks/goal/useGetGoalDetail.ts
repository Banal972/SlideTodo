import { useEffect, useState } from "react"

import { goalType } from "@/types/goal"
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "firebaseConfig"

const useGetGoalDetail = ({ slug }: { slug: string }) => {
  const [goalData, setGoalData] = useState<goalType | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const documentId = slug
      const docRef = doc(db, "goals", documentId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const { title, createDate } = docSnap.data()

        const todosDoneQuery = query(
          collection(db, "todos"),
          where("goal_ID", "==", docSnap.id),
          where("done", "==", true),
          orderBy("createDate", "desc"),
        )

        const todosNotDoneQuery = query(
          collection(db, "todos"),
          where("goal_ID", "==", docSnap.id),
          where("done", "==", false),
          orderBy("createDate", "desc"),
        )

        const [todoDoneSnapShot, todoNotDoneSnapShot] = await Promise.all([
          getDocs(todosDoneQuery),
          getDocs(todosNotDoneQuery),
        ])

        const goal = {
          title: title,
          todos: {
            done: todoDoneSnapShot.docs.map((doc) => {
              const { title, createDate, goal_ID, done } = doc.data()
              return {
                title,
                createDate,
                done,
                goal_ID,
                id: doc.id,
              }
            }),
            not: todoNotDoneSnapShot.docs.map((doc) => {
              const { title, createDate, goal_ID, done } = doc.data()
              return {
                title,
                createDate,
                done,
                goal_ID,
                id: doc.id,
              }
            }),
          },
          createDate: createDate,
          id: docSnap.id,
        }
        setGoalData(goal)
      } else {
        setGoalData(null)
      }
    }
    fetch()
  }, [slug])

  return { goalData }
}

export default useGetGoalDetail
