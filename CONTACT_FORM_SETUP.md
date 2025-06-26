# Contact Form Setup Guide

This guide explains how to set up the contact form with Sanity backend storage and Resend email notifications.

## Features Implemented

✅ **Sanity Schemas Created:**
- `contactForm` - Configuration for form fields and email settings
- `contactFormSubmission` - Storage for form submissions with status tracking

✅ **Contact Form Component:**
- Matches the screenshot design exactly
- Real-time form validation
- Success/error message handling
- Responsive design

✅ **API Integration:**
- Form submissions stored in Sanity
- Automatic email notifications via Resend
- Auto-reply emails to users
- Error handling and validation

## Required Environment Variables

Create a `.env.local` file in your project root with:

```bash
# Sanity Configuration (Required)
NEXT_PUBLIC_SANITY_PROJECT_ID=c8l7yt2q
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_write_token_here

# Resend Email Configuration (Required for email notifications)
RESEND_API_KEY=your_resend_api_key_here
```

## Setup Steps

### 1. Get Sanity Write Token
1. Go to [sanity.io](https://www.sanity.io)
2. Navigate to your project (`c8l7yt2q`)
3. Go to API → Tokens
4. Create a new token with **Editor** permissions
5. Copy the token (starts with `sk...`)

### 2. Get Resend API Key
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys in your dashboard
3. Create a new API key
4. Copy the key (starts with `re_...`)

### 3. Configure Email Settings in Sanity Studio
1. Open Sanity Studio at `http://localhost:3333`
2. Create a new "Contact Form Configuration" document
3. Set up:
   - Form title: "Hire a tutor"
   - Description with company info
   - Email notification settings
   - Form field labels and placeholders

## Form Submission Workflow

1. **User submits form** → Data validated on frontend
2. **API stores data** → Saved to Sanity with timestamp and status
3. **Email sent to admin** → Notification with all details
4. **Auto-reply sent** → Confirmation email to user
5. **Success message** → User sees confirmation

## Admin Features in Sanity Studio

### Contact Form Submissions
- View all submissions with preview (name, email, status, date)
- Sort by date or status
- Update status: New → In Progress → Contacted → Closed
- Add internal notes for follow-up

### Form Configuration
- Edit all form field labels and placeholders
- Configure email notification settings
- Set company name and URL
- Customize form styling and layout

## Email Templates

### Admin Notification Email
- Complete contact details
- Tutoring requirements
- Budget information
- Submission ID and timestamp

### User Auto-Reply Email
- Thank you message
- Summary of their inquiry
- Expected response time
- Professional branding

## Testing the Form

### 1. Test Form Validation
- Try submitting empty fields
- Test invalid email formats
- Verify error messages appear

### 2. Test Form Submission
- Fill out form completely
- Submit and check for success message
- Verify data appears in Sanity Studio

### 3. Test Email Notifications (requires API keys)
- Submit form with valid email
- Check admin email for notification
- Check user email for auto-reply

## Troubleshooting

### Form Not Submitting
- Check browser console for errors
- Verify API route is accessible: `/api/contact`
- Check environment variables are set

### Emails Not Sending
- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for sending limits
- Ensure email addresses are valid

### Data Not Saving
- Verify `SANITY_API_TOKEN` has write permissions
- Check Sanity Studio for new submissions
- Review API logs for errors

## File Structure

```
schemas/
├── contactForm.ts              # Form configuration schema
└── contactFormSubmission.ts    # Submission storage schema

src/
├── app/api/contact/route.ts    # Form submission API
├── components/ContactForm.tsx  # Contact form component
└── types/index.ts             # TypeScript interfaces

lib/
└── queries.ts                 # Sanity queries
```

## Security Features

- Server-side validation
- Email format validation
- SQL injection protection (Sanity handles this)
- Rate limiting (can be added if needed)
- Environment variable protection

## Future Enhancements

- [ ] Add reCAPTCHA for spam protection
- [ ] Implement rate limiting
- [ ] Add file upload capability
- [ ] Create admin dashboard for submissions
- [ ] Add SMS notifications
- [ ] Integrate with CRM systems

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Review Sanity Studio for data
3. Check Resend dashboard for email logs
4. Verify all environment variables are set correctly 