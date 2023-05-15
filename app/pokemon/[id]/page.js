import Image from 'next/image';
import styles from './page.module.css'

const Pokemon = async ({ params }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const pokemon = await res.json();

  return (
    <div className={styles.pokemon_container}>
      <p>#{pokemon.id < 10 && '0'}{pokemon.id < 100 && '0'}{pokemon.id}</p>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        width="250"
        height="250"
        alt={pokemon.name}
      />
      <h1 className={styles.title}>{pokemon.name}</h1>
      <div className={styles.types_container}>
        {pokemon.types.map((item, index) => (
          <span
            key={index}
            className={`${styles.type} ${styles['type_' + item.type.name]}`}
          >
            {item.type.name}
          </span>
        ))}
      </div>
      <div className={styles.data_container}>
        <div className={styles.data_height}>
          <h4>Altura:</h4>
          <p>{pokemon.height * 10} cm</p>
        </div>
        <div className={styles.data_weight}>
          <h4>Peso:</h4>
          <p>{pokemon.weight / 10} kg</p>
        </div>
      </div>
    </div>
  );
}

export default Pokemon