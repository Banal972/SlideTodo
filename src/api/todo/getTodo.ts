import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "firebaseConfig";

const getTodo = async () => {
  const user = auth.currentUser;

  if (!user) return;

  const q = query(
    collection(db, "todos"),
    where("uid", "==", user.uid),
    orderBy("createDate", "desc"),
    limit(10)
  );

  const querySnapshot = await getDocs(q);

  const todos = querySnapshot.docs.map((doc) => {
    const { title, createDate, done } = doc.data();

    return {
      title,
      done,
      createDate,
      id: doc.id,
    };
  });
  return todos;
};

export default getTodo;
