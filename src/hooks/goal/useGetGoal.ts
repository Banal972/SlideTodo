import { useEffect, useState } from "react";
import { goalType } from "@/types/goal";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "firebaseConfig";
import { Unsubscribe } from "firebase/auth";

const useGetGoal = () => {
  const [goals, setGoals] = useState<goalType[]>([]);

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

      unsubscribe = await onSnapshot(q, async (snapshot) => {
        const goalsPromises = snapshot.docs.map(async (doc) => {
          const { title, createDate } = doc.data();

          const todosDoneQuery = query(
            collection(db, "todos"),
            where("goal_ID", "==", doc.id),
            where("done", "==", true),
            orderBy("createDate", "desc")
          );

          const todosNotDoneQuery = query(
            collection(db, "todos"),
            where("goal_ID", "==", doc.id),
            where("done", "==", false),
            orderBy("createDate", "desc")
          );

          const todoDoneSnapShot = await getDocs(todosDoneQuery);
          const todoNotDoneSnapShot = await getDocs(todosNotDoneQuery);

          return {
            title: title,
            todos: {
              done: todoDoneSnapShot.docs.map((doc) => {
                const { title, createDate, notes, done } = doc.data();
                return {
                  title,
                  createDate,
                  done,
                  id: doc.id,
                };
              }),
              not: todoNotDoneSnapShot.docs.map((doc) => {
                const { title, createDate, notes, done } = doc.data();
                return {
                  title,
                  createDate,
                  done,
                  id: doc.id,
                };
              }),
            },
            createDate: createDate,
            id: doc.id,
          };
        });
        const goals = await Promise.all(goalsPromises);
        setGoals(goals);
      });
    };
    fetch();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return { goals };
};

export default useGetGoal;
