import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое'),
  email: z.string().email('Некорректный email'),
  phone: z.string().min(10, 'Некорректный номер телефона'),
  company: z.string().optional(),
  message: z.string().min(10, 'Сообщение слишком короткое'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Save to database
    const contactRequest = await prisma.contactRequest.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company || null,
        message: validatedData.message,
        status: 'new',
      },
    });

    // Here you could also send email notification
    // await sendEmailNotification(contactRequest);

    return NextResponse.json(
      { success: true, id: contactRequest.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
