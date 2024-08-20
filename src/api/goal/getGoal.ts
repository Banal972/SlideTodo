import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "firebaseConfig";

const getGoal = async () => {
  const q = query(collection(db, "goal"), orderBy("createDate", "desc"));
  const querySnapshot = await getDocs(q);

  const goals = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
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
    })
  );

  return goals;
};

export default getGoal;
