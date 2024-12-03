'use server';

import { Stuff, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  let condition: Condition;

  // Validate condition and set default if invalid
  switch (stuff.condition.toLowerCase()) {
    case 'poor':
      condition = 'poor';
      break;
    case 'excellent':
      condition = 'excellent';
      break;
    case 'fair':
      condition = 'fair';
      break;
    default:
      condition = 'good'; // Default to 'good'
  }

  try {
    await prisma.stuff.create({
      data: {
        name: stuff.name,
        quantity: stuff.quantity,
        owner: stuff.owner,
        condition,
      },
    });

    // Redirect to the list page after adding
    redirect('/list');
  } catch (error) {
    console.error('Error adding stuff:', error);
    throw new Error('Failed to add stuff');
  }
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  try {
    await prisma.stuff.update({
      where: { id: stuff.id },
      data: {
        name: stuff.name,
        quantity: stuff.quantity,
        owner: stuff.owner,
        condition: stuff.condition,
      },
    });

    // Redirect to the list page after updating
    redirect('/list');
  } catch (error) {
    console.error('Error editing stuff:', error);
    throw new Error('Failed to edit stuff');
  }
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  try {
    await prisma.stuff.delete({
      where: { id },
    });

    // Redirect to the list page after deleting
    redirect('/list');
  } catch (error) {
    console.error('Error deleting stuff:', error);
    throw new Error('Failed to delete stuff');
  }
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
