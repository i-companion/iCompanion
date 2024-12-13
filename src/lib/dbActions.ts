import { hash } from 'bcryptjs';
import { prisma } from './prisma';

/**
 * Creates a new user in the database.
 * @param credentials
 */
export async function createUser(credentials: { email: string; password: string; name: string; discord: string; gameIds: string[] }) {
  try {
    const hashedPassword = await hash(credentials.password, 10);

    const user = await prisma.user.create({
      data: {
        email: credentials.email,
        password: hashedPassword,
        profile: {
          create: {
            name: credentials.name,
            discord: credentials.discord,
            email: credentials.email,
            description: '',
          },
        },
      },
    });

    for (const gameId of credentials.gameIds) {
      await prisma.interests.create({
        data: {
          gameId: parseInt(gameId, 10),
          userId: user.id,
        },
      });
    }

    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating user:', error.message, error);
      throw new Error('Failed to create user: ' + error.message);
    } else {
      console.error('Unknown error:', error);
      throw new Error('An unknown error occurred');
    }
  }
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  try {
    const hashedPassword = await hash(credentials.password, 10);

    await prisma.user.update({
      where: { email: credentials.email },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error changing password:', error.message, error);
      throw new Error('Failed to change password: ' + error.message);
    } else {
      console.error('Unknown error:', error);
      throw new Error('An unknown error occurred');
    }
  }
}
