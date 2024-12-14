'use server';

import { Game } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * creates a new game
 * @param game the game with the following properties: title.
 */
export async function addGame(game: {
  name: string,
}) {
  await prisma.game.create({
    data: {
      name: game.name,
    },
  });
  redirect('/add');
}

/**
 * Edits an existing game in the database.
 * @param game, an object with the following properties: title
 */
export async function editGame(game: Game) {
  await prisma.game.update({
    where: { id: game.id },
    data: {
      name: game.name,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing game from the database.
 * @param id, the id of the game to delete.
 */
export async function deleteGame(id: number) {
  await prisma.game.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

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
