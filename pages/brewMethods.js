import Link from "next/link";
import styles from "../styles/BrewMethods.module.scss";
import { brewData } from "./data/brewMethodData";

const BrewMethodCard = ({ brewMethod }) => {
  return (
    <Link href={`/[${brewMethod.name}]`}>
      <a className={styles.button}>
        <img src={brewMethod.imageSrc} alt={`${brewMethod.name} icon`} />
        <span>{brewMethod.name}</span>
      </a>
    </Link>
  );
};

export default function BrewMethods() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>select a brewing method</h1>
        <section className={styles.grid}>
          {brewData.map((brewMethod, idx) => (
            <BrewMethodCard brewMethod={brewMethod} key={idx} />
          ))}
        </section>
      </main>
    </div>
  );
}
