import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { client } from '../../../../lib/sanity';

export async function POST(request: NextRequest) {
  console.log('=== Contact form API called ===');
  try {
    // Parse the request body
    console.log('Parsing request body...');
    const formData = await request.json();
    console.log('Received form data:', formData);
    
    const {
      fullName,
      country,
      email,
      phone,
      tutoringDetails,
      hourlyBudget,
    } = formData;

    // Validate required fields
    console.log('Validating fields...');
    if (!fullName || !country || !email || !phone || !tutoringDetails || !hourlyBudget) {
      console.log('Validation failed - missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    console.log('All fields validated successfully');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Store submission in Sanity
    console.log('Attempting to save to Sanity...');
    const submission = await client.create({
      _type: 'contactFormSubmission',
      fullName,
      country,
      email,
      phone,
      tutoringDetails,
      hourlyBudget,
      submittedAt: new Date().toISOString(),
      status: 'new',
    });
    console.log('Successfully saved to Sanity:', submission._id);

    // Get contact form configuration for email settings
    let contactFormConfig;
    try {
      contactFormConfig = await client.fetch(`
        *[_type == "contactForm"][0] {
          emailSettings {
            notificationEmail,
            emailSubject,
            autoReplySubject,
            autoReplyMessage
          },
          companyName
        }
      `);
    } catch (sanityError) {
      console.log('Warning: Could not fetch contact form config from Sanity:', sanityError);
    }

    const emailSettings = contactFormConfig?.emailSettings;
    const companyName = contactFormConfig?.companyName || 'TutorChase';

    // Send notification email to admin
    console.log('Email settings:', emailSettings);
    console.log('Resend API key exists:', !!process.env.RESEND_API_KEY);
    
    // Use default email settings if not configured in Sanity
    const defaultNotificationEmail = 'vicky@tutorchase.com'; // Change this to your email
    const notificationEmail = emailSettings?.notificationEmail || defaultNotificationEmail;
    
    // Re-enable email sending now that API key is fixed
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        console.log('Attempting to send notification email to:', notificationEmail);
        await resend.emails.send({
          from: `${companyName} <onboarding@resend.dev>`,
          to: [notificationEmail],
          subject: emailSettings.emailSubject || 'New Tutoring Inquiry',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1f2937;">New Tutoring Inquiry</h2>
              
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Full Name:</strong> ${fullName}</p>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Hourly Budget:</strong> ${hourlyBudget}</p>
              </div>
              
              <div style="margin: 20px 0;">
                <h3 style="color: #374151;">Tutoring Request Details:</h3>
                <p style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${tutoringDetails}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px;">
                  Submission ID: ${submission._id}<br>
                  Submitted: ${new Date().toLocaleString()}
                </p>
              </div>
            </div>
          `,
        });
        console.log('Notification email sent successfully');
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // Don't fail the request if email fails
      }

      // Send auto-reply to user
      try {
        console.log('Attempting to send auto-reply to:', email);
        await resend.emails.send({
          from: `${companyName} <onboarding@resend.dev>`,
          to: [email],
          subject: emailSettings.autoReplySubject || 'Thank you for your inquiry',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1f2937;">Thank you for your inquiry!</h2>
              
              <p>Dear ${fullName},</p>
              
              <p>${emailSettings.autoReplyMessage || 'Thank you for your inquiry. We will get back to you within 24 hours.'}</p>
              
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e40af; margin-top: 0;">Your Inquiry Details:</h3>
                <p><strong>Subjects/Requirements:</strong> ${tutoringDetails}</p>
                <p><strong>Budget:</strong> ${hourlyBudget}</p>
                <p><strong>Contact:</strong> ${phone}</p>
              </div>
              
              <p>One of our academic consultants will review your requirements and get in touch soon.</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px;">
                  Best regards,<br>
                  The ${companyName} Team
                </p>
              </div>
            </div>
          `,
                  });
          console.log('Auto-reply email sent successfully');
        } catch (emailError) {
          console.error('Failed to send auto-reply email:', emailError);
          // Don't fail the request if email fails
        }
      } else {
        console.log('Resend API key not found, skipping email sending');
      }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      submissionId: submission._id,
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
} 