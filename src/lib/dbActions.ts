import { hash } from 'bcrypt';
import { prisma } from './prisma';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password, name, discord, gameIds.
 */
export async function createUser(credentials: { email: string; password: string; name: string; discord: string; gameIds: string[] }) {
  try {
    // Hash the password
    const hashedPassword = await hash(credentials.password, 10);

    // Create the user with profile information
    const user = await prisma.user.create({
      data: {
        email: credentials.email,
        password: hashedPassword,
        profile: {
          create: {
            name: credentials.name,
            discord: credentials.discord,
            email: credentials.email,
            description: '', // You can customize the description field if needed
          },
        },
      },
    });

    // Add interests (gameIds)
    for (const gameId of credentials.gameIds) {
      await prisma.interests.create({
        data: {
          gameId: parseInt(gameId), // assuming gameId is a string and needs to be parsed
          userId: user.id,
        },
      });
    }

  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
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
    console.error('Error changing password:', error);
    throw new Error('Failed to change password');
  }
}
