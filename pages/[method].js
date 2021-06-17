import { useRouter } from "next/router";
import { brewData } from "./data/brewMethodData";
import Link from "next/link";
import styles from "../styles/Recipe.module.scss";

const Recipe = () => {
  const router = useRouter();
  const { method } = router.query;
  const currentMethod = brewData.filter((m) => m.name === method);

  return (
    <main className={styles.container}>
      <section className={styles.methods}>
        {brewData.map((brewMethod, idx) => (
          <Link href={`/recipe/[${brewMethod.name}]`} key={idx}>
            <a className={styles.button}>{brewMethod.name}</a>
          </Link>
        ))}
      </section>
      <section>{currentMethod.name}</section>
    </main>
  );
};

export default Recipe;
