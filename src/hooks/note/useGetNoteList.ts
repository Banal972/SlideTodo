import { useEffect, useState } from "react"

import { noteType } from "@/types/note"
import dayjs from "dayjs"
import {
  Unsubscribe,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { db } from "firebaseConfig"

const useGetNoteList = ({ slug }: { slug: string }) => {
  const [noteList, setNoteList] = useState<noteType[]>([])

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null

    const fetch = async () => {
      const q = query(
        collection(db, "notes"),
        where("goal_ID", "==", slug),
        orderBy("createDate", "desc"),
      )

      unsubscribe = await onSnapshot(q, async (snapshot) => {
        const noteListPromises = snapshot.docs.map(async (docx) => {
          const { title, content, createDate, todo_ID } = docx.data()

          const docSnap = await getDoc(doc(db, "todos", todo_ID))
          if (docSnap.exists()) {
            const docData = docSnap.data()

            return {
              title,
              content,
              todoTitle: docData.title,
              todoCreateDate: dayjs.unix(docData.createDate.seconds).format("YYYY.MM.DD"),
              createDate,
              id: docx.id,
            }
          }

          return {
            title,
            content,
            todoTitle: "",
            todoCreateDate: "",
            createDate,
            id: docx.id,
          }
        })

        const noteList = await Promise.all(noteListPromises)
        setNoteList(noteList)
      })
    }

    fetch()
  }, [slug])

  return { noteList }
}

export default useGetNoteList
