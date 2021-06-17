import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/BrewMethods.module.scss";

const BrewMethodCard = ({ brewMethod }) => {
  return (
    <Link href={brewMethod.name}>
      <a className={styles.button}>
        <img src={brewMethod.imageSrc} alt={`${brewMethod.name} icon`} />
        <span>{brewMethod.name}</span>
      </a>
    </Link>
  );
};

export default function BrewMethods() {
  const [brewData, setBrewData] = useState([]);

  useEffect(() => {
    async function getBrewMethodData() {
      const res = await fetch("/api/brewData");
      const brewData = await res.json();
      setBrewData(brewData);
    }
    getBrewMethodData();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>select a brewing method</h1>
        <section className={styles.grid}>
          {brewDataObj.map((brewMethod, idx) => (
            <BrewMethodCard brewMethod={brewMethod} key={idx} />
          ))}
        </section>
      </main>
    </div>
  );
}
