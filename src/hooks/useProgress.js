import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { subscribeToStudentProgress } from "../services/database";

export default function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState({});
  const [progressLoading, setProgressLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProgress({});
      setProgressLoading(false);
      return;
    }
    setProgressLoading(true);
    const unsub = subscribeToStudentProgress(user.uid, (data) => {
      setProgress(data);
      setProgressLoading(false);
    });
    return () => unsub();
  }, [user]);

  return { progress, progressLoading };
}
