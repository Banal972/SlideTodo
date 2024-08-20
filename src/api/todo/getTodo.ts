import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "firebaseConfig";

const getTodo = async () => {
  const q = query(
    collection(db, "todos"),
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
