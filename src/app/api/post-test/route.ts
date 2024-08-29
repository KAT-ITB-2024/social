import { postTestSubmissions } from '@katitb2024/database';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';

export async function POST(req: NextRequest) {
  try {
    const { userNim, postTestId } = await req.json();
    if (!userNim || !postTestId) {
      return NextResponse.json({
        message: 'Please provide a userNim and postTestId',
        status: 400,
      });
    }

    // Insert the submission into the database
    await db.insert(postTestSubmissions).values({
      userNim,
      postTestId,
    });

    return NextResponse.json({ message: 'Submission successful', status: 200 });
  } catch (error) {
    console.error('Error inserting submission:', error);

    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        status: 500,
      });
    } else {
      return NextResponse.json({
        message: 'Internal server error',
        status: 500,
      });
    }
  }
}
