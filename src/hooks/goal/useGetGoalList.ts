import { goalListType } from "@/types/goal";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { auth, db } from "firebaseConfig";
import { useEffect, useState } from "react";

const useGetGoalList = () => {
  const [goalLists, setGoalLists] = useState<goalListType[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetch = async () => {
      const user = auth.currentUser;

      if (!user) return [];

      const q = query(
        collection(db, "goals"),
        where("uid", "==", user.uid),
        orderBy("createDate", "desc")
      );

      unsubscribe = await onSnapshot(q, (snapshot) => {
        const goalLists = snapshot.docs.map((doc) => {
          const { title, createDate } = doc.data();
          return {
            title: title,
            createDate: createDate,
            id: doc.id,
          };
        });
        setGoalLists(goalLists);
      });
    };

    fetch();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return { goalLists };
};

export default useGetGoalList;
