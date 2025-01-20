import { MOODS } from "../../constants/mood";
import { Button } from "../../shared";
import { useMoodForm, useTheme } from "../../utils/hooks";
import styles from "./MoodForm.module.css";

const MoodForm = () => {
  const { currentMood, handleChange, handleSubmit } = useMoodForm();
  const { theme } = useTheme();

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Log Your Mood</h2>
      <div className={styles.radio__group}>
        {MOODS.map((mood) => (
          <div className={styles.radio__button} key={mood.value}>
            <input
              id={`mood-${mood.value}`}
              type="radio"
              name="mood"
              value={mood.value}
              className={styles.input__hidden}
              checked={currentMood === mood.value}
              onChange={handleChange}
            />
            <label
              htmlFor={`mood-${mood.value}`}
              className={`${styles.label} ${
                theme === "dark" ? styles.label__dark : styles.label__light
              }`}
            >
              {mood.label}
            </label>
          </div>
        ))}
      </div>
      <Button type="submit" disabled={!currentMood} className={styles.button}>
        Submit
      </Button>
    </form>
  );
};

export default MoodForm;
