import React, { memo } from "react";
import styles from "./LoaderSpinner.module.css";

const LoaderSpinner: React.FC = () => {
  return (
    <div data-testid="spinner-container" className={styles.spinnerContainer}>
      <div data-testid="spinner" className={styles.spinner} />
    </div>
  );
};

export default memo(LoaderSpinner);
