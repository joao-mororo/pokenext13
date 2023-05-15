import React from "react";
import Image from "next/image";
import Card from "@/components/Card";
import styles from "./page.module.css";

// Get pokemons
async function getData() {
  const maxPokemons = 251;
  const api = `https://pokeapi.co/api/v2/pokemon/`;
  const res = await fetch(`${api}/?limit=${maxPokemons}`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  // add pokemon index
  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  const pokemons = data.results;

  console.log(pokemons);

  return (
    <>
      <div className={styles.title_container}>
        <h1 className={styles.title}>
          Poke<span>Next</span>
        </h1>
        <Image
          src="/images/pokeball.png"
          width="50"
          height="50"
          alt="PokeNext"
        />
      </div>
      <div className={styles.pokemon_container}>
        {Array.isArray(pokemons) && pokemons.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}
