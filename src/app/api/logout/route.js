import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function DELETE(request) {
  cookies().delete('e-learninigtoken'); // Replace 'yourCookieName' with the name of the cookie you want to delete
  return NextResponse.json({ message: 'Cookie deleted' });
}
