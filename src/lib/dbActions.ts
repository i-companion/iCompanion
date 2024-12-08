'use server';

import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  try {
    const hashedPassword = await hash(credentials.password, 10);

    await prisma.user.create({
      data: {
        email: credentials.email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: name, discord, email, image, description (owner is assigned with the same email address)
 */
export async function createProfile(credentials: { name: string; discord: string; email: string; image: string; description: string; interests: boolean[] }) {
  try {
    await prisma.profile.create({
      data: {
        name: credentials.name,
        discord: credentials.discord,
        email: credentials.email,
        image: credentials.image,
        description: credentials.description,
        interests: credentials.interests,
        owner: credentials.email,
      },
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    throw new Error('Failed to create profile');
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
