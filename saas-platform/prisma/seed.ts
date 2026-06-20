import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const services = [
    {
      title: 'General Consultation',
      slug: 'general-consultation',
      shortDescription: 'Expert assessments and personalized recovery plans for optimal health.',
      detailedDescription: 'Our general consultation involves a comprehensive physical assessment, identifying root causes of discomfort, and drafting a personalized treatment timeline tailored to your lifestyle and needs.',
      duration: 30,
      price: 49.99,
      status: 'ACTIVE',
    },
    {
      title: 'Orthopedic Rehabilitation',
      slug: 'orthopedic-rehabilitation',
      shortDescription: 'Joint, muscle, and spine recovery tailored for maximum mobility.',
      detailedDescription: 'Specialized therapy focusing on musculoskeletal injuries, post-surgical recovery, arthritis, and joint replacements to restore strength and range of motion.',
      duration: 45,
      price: 79.99,
      status: 'ACTIVE',
    },
    {
      title: 'Neuro Rehabilitation',
      slug: 'neuro-rehabilitation',
      shortDescription: 'Advanced recovery programs for stroke, Parkinson\'s, and neurological conditions.',
      detailedDescription: 'Evidence-based neurological rehabilitation aimed at improving balance, coordination, and functional independence for patients with central nervous system disorders.',
      duration: 60,
      price: 99.99,
      status: 'ACTIVE',
    },
    {
      title: 'Sports Rehabilitation',
      slug: 'sports-rehabilitation',
      shortDescription: 'Targeted recovery for athletes to safely return to play.',
      detailedDescription: 'Performance-focused rehabilitation to treat acute sports injuries, prevent future trauma, and optimize biomechanics for peak athletic performance.',
      duration: 45,
      price: 89.99,
      status: 'ACTIVE',
    },
    {
      title: 'Home Visit Physiotherapy',
      slug: 'home-visit-physiotherapy',
      shortDescription: 'Expert physiotherapy delivered directly to your home.',
      detailedDescription: 'Convenient, personalized, in-home treatment sessions for elderly patients, post-surgical patients, or anyone unable to travel to our clinic.',
      duration: 60,
      price: 129.99,
      status: 'ACTIVE',
    },
    {
      title: 'Pain Management',
      slug: 'pain-management',
      shortDescription: 'Effective strategies and therapies for chronic pain relief.',
      detailedDescription: 'A multi-disciplinary approach using manual therapy, dry needling, and therapeutic exercise to manage and alleviate chronic pain conditions.',
      duration: 45,
      price: 69.99,
      status: 'ACTIVE',
    }
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    })
  }

  console.log('Database seeded with services!');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
