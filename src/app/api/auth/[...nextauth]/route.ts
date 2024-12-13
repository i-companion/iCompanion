import { NextResponse } from 'next/server';
import { createUser } from '@/lib/dbActions';

export async function POST(req: Request) {
  try {
    const { email, password, name, discord, gameIds } = await req.json();

    const user = await createUser({
      email,
      password,
      name,
      discord,
      gameIds,
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error in signup API:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
