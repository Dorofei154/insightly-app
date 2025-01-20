import { useState } from "react";
import { useModal } from "../useModal/useModal";
import { useMood } from "../useMood/useMood";
import { getCurrentDate } from "../../helpers";

export const useMoodForm = () => {
  const { addMood } = useMood();
  const [currentMood, setCurrentMood] = useState<number>(0);
  const { closeModal } = useModal();

  const handleAddMood = () => {
    addMood({ date: getCurrentDate(), mood: currentMood });
    setCurrentMood(0);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMood(+e.target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddMood();
    closeModal();
  };

  return {
    currentMood,
    handleChange,
    handleSubmit,
  };
};
