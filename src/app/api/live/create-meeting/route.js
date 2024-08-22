// app/api/create-meeting/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  const VIDEOSDK_API_ENDPOINT = 'https://api.videosdk.live/v2/rooms';
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI1ZTExOWQ2Ni04NDMzLTQyN2ItODM2Yy02YjBiNTFiNTFhOTAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyMjY5NjcyNywiZXhwIjoxNzIyNzgzMTI3fQ.bvxWe_W8GwAao4i4rDMbvXn4RDs5rAA0XA6ZyFKwdq0";
console.log("token",token)
  try {
    const response = await axios.post(VIDEOSDK_API_ENDPOINT, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.log("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
