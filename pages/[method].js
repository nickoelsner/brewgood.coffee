import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { brewData, coffeeUnitOptions, waterUnitOptions } from "./data/brewMethodData";
import Link from "next/link";
import styles from "../styles/Recipe.module.scss";

const Recipe = () => {
  const router = useRouter();
  const { method } = router.query;
  const currentMethod = brewData.filter((m) => m.name === method)[0];
  const { name, ratio, maxCoffee, waterTemp, grindSize, instructions } = currentMethod;

  const [amountOfCoffee, setAmountOfCoffee] = useState(20);
  const [coffeeUnits, setCoffeeUnits] = useState("g");
  const [amountOfWater, setAmountOfWater] = useState(amountOfCoffee * ratio);
  const [waterUnits, setWaterUnits] = useState("g");
  console.log("amountOfCoffee :>> ", amountOfCoffee);

  // allows user to scroll horizontally through the methods with the mouse wheel
  const hzMouseScroll = useRef();
  const scrollHorizontal = (event) => {
    hzMouseScroll.current.scrollLeft += event.deltaY;
  };

  const round = (value, precision) => {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };

  // useEffect(() => {
  //   setConvertedCoffee({
  //     g: amountOfCoffee,
  //     oz: amountOfCoffee / 28.3495,
  //     Tbsp: amountOfCoffee / 5,
  //     tsp: amountOfCoffee / 1.6667,
  //   });
  // }, [amountOfCoffee]);

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

  // indecies match up with unit options [g, oz, Tbsp, tsp]
  const coffeeUnitFactor = [1, 28.3495, 5, 1.6667];
  const convertUnits = (sourceUnit, targetUnit, sourceValue) => {
    console.log("props :>> ", sourceUnit, targetUnit, sourceValue);
    const sourceIdx = coffeeUnitOptions.indexOf(sourceUnit);
    const sourceFactor = coffeeUnitFactor[sourceIdx];

    const targetIdx = coffeeUnitFactor.indexOf(targetUnit);
    const targetFactor = coffeeUnitFactor[targetIdx];

    const sourceGrams = sourceValue / sourceFactor;
    console.log("sourceGrams :>> ", sourceGrams);
    const convertedValue = sourceGrams * targetFactor;
    console.log("convertedValue :>> ", convertedValue);
    return convertedValue;
  };

  const handleCoffeeUnitsChange = (unit) => {
    // console.log("coffeeUnits :>> ", coffeeUnits);
    // console.log("unit :>> ", unit);
    const convertedCoffee = convertUnits(coffeeUnits, unit, amountOfCoffee);
    // console.log("convertedCoffee:>> ", convertedCoffee);
    setAmountOfCoffee(convertedCoffee);
    setCoffeeUnits(unit);
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
      <section className={styles.recipe}>
        <form>
          <label htmlFor="coffee">coffee</label>
          <input
            type="number"
            name="coffee"
            id="coffee"
            value={round(amountOfCoffee, 2)}
            onChange={handleCoffeeChange}
          />
          <div>
            {coffeeUnitOptions.map((unit) => (
              <label key={unit}>
                <input
                  type="radio"
                  name="coffeeUnits"
                  id={unit}
                  value={unit}
                  onChange={() => handleCoffeeUnitsChange(unit)}
                  checked={coffeeUnits === unit}
                />
                {unit}
              </label>
            ))}
          </div>
        </form>
        <form>
          <label htmlFor="water">water</label>
          <input type="number" name="water" id="water" value={round(amountOfWater, 2)} onChange={handleWaterChange} />
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
        <div>
          <h1>recipe details</h1>
          <div className={styles.detailsItem}>
            <span>ratio</span>
            <span className={styles.fontRegular}>{ratio}</span>
          </div>
          <div className={styles.detailsItem}>
            <span>water temperature</span>
            <span className={styles.fontRegular}>{waterTemp}ºF</span>
          </div>
          <div className={styles.detailsItem}>
            <span>grind size</span>
            <span className={styles.fontRegular}>{grindSize}</span>
          </div>
          <div className={styles.detailsInstructions}>
            <div>instructions</div>
            <ol>
              {instructions.map((step) => (
                <li className={styles.fontRegular}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Recipe;
