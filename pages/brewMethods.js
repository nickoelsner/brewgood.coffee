import Link from "next/link";
import styles from "../styles/BrewMethods.module.scss";

export default function BrewMethods() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>select a brewing method</h1>
      </main>
    </div>
  );
}
