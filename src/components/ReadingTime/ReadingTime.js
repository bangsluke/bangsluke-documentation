import clsx from "clsx";
import styles from "./ReadingTime.module.css";

function getReadingTimeLabel(minutes) {
  if (minutes > 0 && minutes < 1) {
    return "Less than 1 min read";
  }
  return `${Math.max(1, Math.ceil(minutes))} min read`;
}

export default function ReadingTime({ minutes, words, className }) {
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return null;
  }

  const roundedMinutes = Math.max(1, Math.ceil(minutes));
  const ariaLabel = words
    ? `Estimated reading time: ${roundedMinutes} minute${roundedMinutes === 1 ? "" : "s"} for approximately ${words} words`
    : `Estimated reading time: ${roundedMinutes} minute${roundedMinutes === 1 ? "" : "s"}`;

  return (
    <p className={clsx(styles.readingTime, className)} aria-label={ariaLabel}>
      <span className={styles.icon} aria-hidden="true">
        📘
      </span>
      <span>{getReadingTimeLabel(minutes)}</span>
    </p>
  );
}
