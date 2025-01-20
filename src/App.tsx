import { lazy, Suspense } from "react";
import styles from "./App.module.css";
import { DailyInsight, MoodAnalysis, MoodForm, MoodTrends } from "./components";
import { Theme } from "./enum/theme";
import { Button, LoaderSpinner } from "./shared";
import stylesTheme from "./themes.module.css";
import { useModal, useTheme } from "./utils/hooks";

const Modal = lazy(() => import("./shared/Modal/Modal"));

function App() {
  const { isModalOpen, openModal } = useModal();
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className={`${styles.main__container} ${
        theme === Theme.LIGHT
          ? stylesTheme.light__theme
          : stylesTheme.dark__theme
      }`}
    >
      <MoodTrends />
      <div className={styles.container}>
        <MoodAnalysis />
        <DailyInsight />
      </div>
      <div className={styles.container}>
        <Button onClick={openModal}>How are you feeling today?</Button>
        <Button onClick={toggleTheme}>
          Toggle to {theme === Theme.LIGHT ? "Dark" : "Light"} Theme
        </Button>
      </div>
      <Suspense fallback={<LoaderSpinner />}>
        {isModalOpen && (
          <Modal>
            <MoodForm />
          </Modal>
        )}
      </Suspense>
    </div>
  );
}

export default App;
