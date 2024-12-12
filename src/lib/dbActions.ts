'use server';

import { hash } from 'bcrypt';
import { prisma } from './prisma';

/**
 * Creates a new user in the database, along with their profile and game interests.
 * @param credentials - an object with the following properties: email, password, name, discord, gameIds.
 */
export async function createUser(credentials: {
  email: string;
  password: string;
  name: string;
  discord: string;
  gameIds: number[];
}) {
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
            description: 'Default description',
          },
        },
      },
    });

    await Promise.all(
      credentials.gameIds.map((gameId) =>
        prisma.interests.create({
          data: {
            userId: user.id,
            gameId,
          },
        })
      )
    );

  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials - an object with the following properties: email, password.
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
