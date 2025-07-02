import Hero from '../components/Hero';
import WhyChoosePlatform from '../components/WhyChoosePlatform';
import SubjectsSection from '../components/SubjectsSection';
import AdvertBanner from '../components/AdvertBanner';
import StudentTestimonials from '../components/StudentTestimonials';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { client } from '../../lib/sanity';
import { getHeroQuery, getSubjectsSectionQuery, getWhyChoosePlatformQuery, getStudentTestimonialsQuery, getFaqQuery, getContactFormQuery, getFooterQuery } from '../../lib/queries';

interface Subject {
  name: string;
  code: string;
  level: string;
  category: string;
  examBoards: string[];
  url: string;
  iconColor: string;
}

interface SubjectsSection {
  title: string;
  description: string;
  searchPlaceholder: string;
  categories: string[];
  subjects: Subject[];
}

async function getHero() {
  const hero = await client.fetch(getHeroQuery);
  return hero;
}

async function getSubjectsSection() {
  const subjectsSection = await client.fetch(getSubjectsSectionQuery);
  return subjectsSection as SubjectsSection;
}



async function getWhyChoosePlatform() {
  const whyChoosePlatform = await client.fetch(getWhyChoosePlatformQuery);
  return whyChoosePlatform;
}

async function getStudentTestimonials() {
  const studentTestimonials = await client.fetch(getStudentTestimonialsQuery);
  return studentTestimonials;
}

async function getFaq() {
  const faq = await client.fetch(getFaqQuery);
  return faq;
}

async function getContactForm() {
  try {
    const contactForm = await client.fetch(getContactFormQuery);
    return contactForm;
  } catch (error) {
    console.log('Could not fetch contact form from Sanity, using defaults:', error);
    // Return default contact form data
    return {
      title: 'Hire a tutor',
      description: 'Please fill out the form and an academic consultant from TutorChase will find a tutor for you',
      companyName: 'TutorChase',
      companyUrl: 'https://tutorchase.com'
    };
  }
}

async function getFooter() {
  const footer = await client.fetch(getFooterQuery);
  return footer;
}

export default async function HomePage() {
  const hero = await getHero();
  const subjectsSection = await getSubjectsSection();
  const whyChoosePlatform = await getWhyChoosePlatform();
  const studentTestimonials = await getStudentTestimonials();
  const faq = await getFaq();
  const contactForm = await getContactForm();
  const footer = await getFooter();

  // Add "Browse Past Papers" button to hero data
  const heroWithBrowseButton = {
    ...hero,
    buttons: [
      {
        text: "Browse Past Papers",
        url: "/subjects",
        variant: "primary"
      },
      ...hero.buttons
    ]
  };

  return (
    <div className="bg-white">
      <Hero data={heroWithBrowseButton} />
      
      {/* Subjects Section */}
      <SubjectsSection data={subjectsSection} />
      
      {/* Why Choose Our Platform Section */}
      {whyChoosePlatform && <WhyChoosePlatform data={whyChoosePlatform} />}
      
      {/* Advert Banner Section */}
      <AdvertBanner />
      
      {/* Student Testimonials Section */}
      {studentTestimonials && <StudentTestimonials data={studentTestimonials} />}
      
      {/* FAQ Section */}
      {faq && <FAQ data={faq} />}
      
      {/* Contact Form Section */}
      <ContactForm data={contactForm} />
      
      {/* Footer Section */}
      <Footer data={footer} />
    </div>
  );
}

