import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const nodeUrl = process.env.NODE_URL;
  const url = `${nodeUrl}/${path}${request.nextUrl.search}`;

  const response = await fetch(url);
  const data = await response.json();
  
  return NextResponse.json(data);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const nodeUrl = process.env.NODE_URL;
  const url = `${nodeUrl}/${path}`;
  
  const body = await request.json();
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  
  const data = await response.json();
  return NextResponse.json(data);
} 