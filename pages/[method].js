import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { brewData, coffeeUnitOptions, waterUnitOptions } from "./data/brewMethodData";
import Link from "next/link";
import styles from "../styles/Recipe.module.scss";

const Recipe = () => {
  const router = useRouter();
  const { method } = router.query;
  const currentMethod = brewData.filter((m) => m.name === method)[0];
  const { name, ratio, moxCoffee, waterTemp, grindSize, instructions } = currentMethod;

  const [amountOfCoffee, setAmountOfCoffee] = useState(20);
  const [coffeeUnits, setCoffeeUnits] = useState("g");
  const [amountOfWater, setAmountOfWater] = useState(amountOfCoffee * ratio);
  const [waterUnits, setWaterUnits] = useState("g");

  const hzMouseScroll = useRef();
  const scrollHorizontal = (event) => {
    hzMouseScroll.current.scrollLeft += event.deltaY;
  };

  const handleCoffeeChange = (event) => {
    const updatedCoffee = event.target.value * 1;
    setAmountOfCoffee(updatedCoffee);
    setAmountOfWater(updatedCoffee * ratio);
  };

  const handleWaterChange = (event) => {
    const updatedWater = event.target.value * 1;
    setAmountOfWater(updatedWater);
    setAmountOfCoffee(updatedWater / ratio);
  };

  return (
    <main className={styles.container}>
      <section className={styles.methods} onWheel={scrollHorizontal} ref={hzMouseScroll}>
        {brewData.map((brewMethod, idx) => {
          const selected = name === brewMethod.name ? styles.selected : "";
          return (
            <Link href={`/${brewMethod.name}`} key={idx}>
              <a className={`${styles.button} ${selected}`}>{brewMethod.name}</a>
            </Link>
          );
        })}
      </section>
      <section>
        <form>
          <label htmlFor="coffee">coffee</label>
          <input type="number" name="coffee" id="coffee" value={amountOfCoffee} onChange={handleCoffeeChange} />
          <div>
            {coffeeUnitOptions.map((unit) => (
              <label>
                <input
                  type="radio"
                  name="coffeeUnits"
                  id={unit}
                  value={unit}
                  onChange={() => setCoffeeUnits(unit)}
                  checked={coffeeUnits === unit}
                />
                {unit}
              </label>
            ))}
          </div>
        </form>
        <form>
          <label htmlFor="water">water</label>
          <input type="number" name="water" id="water" value={amountOfWater} onChange={handleWaterChange} />
          <div>
            {waterUnitOptions.map((unit) => (
              <label>
                <input
                  type="radio"
                  name="waterUnits"
                  id={unit}
                  value={unit}
                  onChange={() => setWaterUnits(unit)}
                  checked={waterUnits === unit}
                />
                {unit}
              </label>
            ))}
          </div>
        </form>
      </section>
    </main>
  );
};

export default Recipe;
