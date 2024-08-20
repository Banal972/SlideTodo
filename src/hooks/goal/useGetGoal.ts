import { useEffect, useState } from "react";
import { goalType } from "@/types/goal";
import getGoal from "@/api/goal/getGoal";

const useGetGoal = () => {
  const [goals, setGoal] = useState<goalType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setGoal(await getGoal());
    };
    fetch();
  }, []);

  return { goals };
};

export default useGetGoal;
