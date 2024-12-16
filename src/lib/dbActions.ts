'use server';

import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string; confirmPassword: string; firstName: string; lastName: string; discord: string; interests: { valorant?: boolean; leagueOfLegends?: boolean; callOfDuty?: boolean; } }) {
  try {
    const hashedPassword = await hash(credentials.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: credentials.email,
        password: hashedPassword,
      },
    });

    await prisma.profile.create({
      data: {
        user: {
          connect: { id: newUser.id }, // Connect the profile to the newly created user
        },
        name: credentials.firstName + ' ' + credentials.lastName,
        discord: credentials.discord,
        email: credentials.email,
        description: "Add description",
      },
    });

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
