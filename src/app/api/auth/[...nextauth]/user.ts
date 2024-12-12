import { NextResponse } from 'next/server';
import { createUser } from '@/lib/dbActions';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const { email, password, name, discord, gameIds } = data;

    await createUser({
      email,
      password,
      name,
      discord,
      gameIds,
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error in signup:', error);
    return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
  }
}
