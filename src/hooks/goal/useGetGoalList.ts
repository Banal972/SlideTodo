import { useEffect, useState } from "react"

import useGetUser from "@/hooks/useGetUser"
import { goalListType } from "@/types/goal"
import { Unsubscribe, collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db } from "firebaseConfig"

const useGetGoalList = () => {
  const [goalLists, setGoalLists] = useState<goalListType[]>([])
  const { user } = useGetUser()

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null

    const fetch = async () => {
      if (!user) return []

      const q = query(
        collection(db, "goals"),
        where("uid", "==", user.uid),
        orderBy("createDate", "desc"),
      )

      unsubscribe = await onSnapshot(q, (snapshot) => {
        const goalLists = snapshot.docs.map((doc) => {
          const { title, createDate } = doc.data()
          return {
            title: title,
            createDate: createDate,
            id: doc.id,
          }
        })
        setGoalLists(goalLists)
      })
    }

    fetch()

    return () => {
      unsubscribe && unsubscribe()
    }
  }, [user])

  return { goalLists }
}

export default useGetGoalList
