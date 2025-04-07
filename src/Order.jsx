import Pizza from "./Pizza";
import { useEffect, useState } from "react";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);

  console.log(pizzaTypes);
  let price, selectPizza;
  if (!loading) {
    selectPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(selectPizza.sizes ? selectPizza.sizes[pizzaSize] : "");
  }

  async function fetchPizzaTypes() {
    const pizzaRes = await fetch("api/pizzas");
    const pizzaJson = await pizzaRes.json();
    setPizzaTypes(pizzaJson);
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              onChange={(e) => setPizzaType(e.target.value)}
              name="pizza-type"
              value={pizzaType}
            >
              {pizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="pizza-size">Pizza Size</label>
          <div>
            <span>
              <input
                onChange={(e) => setPizzaSize(e.target.value)}
                checked={pizzaSize === "S"}
                type="radio"
                name="pizza-size"
                value="S"
                id="pizza-s"
              />
              <label htmlFor="pizza-s">Small</label>
            </span>
            <span>
              <input
                onChange={(e) => setPizzaSize(e.target.value)}
                checked={pizzaSize === "M"}
                type="radio"
                name="pizza-size"
                value="M"
                id="pizza-m"
              />
              <label htmlFor="pizza-m">Medium</label>
            </span>
            <span>
              <input
                onChange={(e) => setPizzaSize(e.target.value)}
                checked={pizzaSize === "L"}
                type="radio"
                name="pizza-size"
                value="L"
                id="pizza-l"
              />
              <label htmlFor="pizza-l">Large</label>
            </span>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <div className="order-pizza">
            <Pizza
              name={selectPizza.name}
              description={selectPizza.description}
              image={selectPizza.image}
            ></Pizza>
            <p>{price}</p>
          </div>
        )}
      </form>
    </div>
  );
}
