import { getPopularGames } from '@/lib/popularGames';

type PopularGame = {
  name: string;
  count: number;
};

const PopularGamesPage = async () => {
  const popularGames: PopularGame[] = await getPopularGames();

  return (
    <main>
      <h1>Top 3 Popular Games</h1>
      <ul>
        {popularGames.map(({ name, count }: PopularGame) => (
          <li key={name}>
            <strong>{name}</strong>: {count} players
          </li>
        ))}
      </ul>
    </main>
  );
};

export default PopularGamesPage;
