import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Game } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditGameForm from '@/components/EditGameForm';

export default async function EditGamePage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  // console.log(id);
  const game: Game | null = await prisma.game.findUnique({
    where: { id },
  });

  if (!game) {
    return notFound();
  }

  return (
    <main>
      <EditGameForm game={game} />
    </main>
  );
}
