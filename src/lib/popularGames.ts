import { prisma } from './prisma'; // Adjust the path if needed

export async function getPopularGames() {
  const popularGames = await prisma.game.findMany({
    include: {
      interests: true, // Fetch related interests
    },
  });

  // Map games with the count of associated profiles
  const gameCounts = popularGames.map((game) => ({
    name: game.name,
    count: game.interests.length,
  }));

  // Sort by count (descending) and return the top 3
  return gameCounts.sort((a, b) => b.count - a.count).slice(0, 3);
}
