import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // You can add a secret token for security if needed
    const secret = request.nextUrl.searchParams.get('secret');
    
    // Optional: Add secret validation
    // if (secret !== process.env.REVALIDATION_SECRET) {
    //   return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    // }

    // Revalidate the homepage
    revalidatePath('/');
    
    return NextResponse.json({ 
      message: 'Homepage cache cleared successfully',
      revalidated: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating cache', error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST method to revalidate cache',
    endpoints: {
      'POST /api/revalidate': 'Manually clear homepage cache'
    }
  });
} 