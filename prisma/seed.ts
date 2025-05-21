import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed the database...');

  const equipmentData = [
    { name: '1T High Tip Dumper', description: '1 Ton capacity high tipping dumper.', imageUrl: '/images/equipment/1t-high-tip-dumper.jpg' },
    { name: 'Log Splitter Vertical and Horizontal Use', description: 'Log splitter for both vertical and horizontal operation.', imageUrl: '/images/equipment/log-splitter.jpg' },
    { name: 'Pressure Washer with Attachments', description: 'High-pressure washer with various attachments.', imageUrl: '/images/equipment/pressure-washer.jpg' },
    { name: 'Laser Level', description: 'Laser level for accurate measurements.', imageUrl: '/images/equipment/laser-level.jpg' },
    { name: 'Strimmers, Blowers, Mowers, Turf Lifter and Scarifiers', description: 'Various gardening and landscaping tools.', imageUrl: '/images/equipment/garden-tools.jpg' },
    { name: 'Concrete Pokers Various Sizes', description: 'Concrete pokers in different sizes for compacting concrete.', imageUrl: '/images/equipment/concrete-pokers.jpg' },
    { name: 'Cobra Reel', description: 'Cobra reel for cable or pipe pushing.', imageUrl: '/images/equipment/cobra-reel.jpg' },
    { name: 'Trench Rammer and Vibrating Plate', description: 'Equipment for soil compaction in trenches and areas.', imageUrl: '/images/equipment/compaction-tools.jpg' },
    { name: 'Various Water Pumps', description: 'A range of water pumps for different applications.', imageUrl: '/images/equipment/water-pumps.jpg' },
    { name: 'Various Generators', description: 'Various generators for portable power.', imageUrl: '/images/equipment/generators.jpg' },
    { name: 'SDS Drills and Breakers', description: 'SDS drills and breakers for concrete and masonry work.', imageUrl: '/images/equipment/sds-tools.jpg' },
    { name: 'Cement Mixers', description: 'Cement mixers for concrete and mortar.', imageUrl: '/images/equipment/cement-mixers.jpg' },
    { name: 'Floor and Stone Saws', description: 'Saws for cutting floors and stone.', imageUrl: '/images/equipment/saws.jpg' },
    { name: 'Lighting Tower and Generator', description: 'Mobile lighting tower with integrated generator.', imageUrl: '/images/equipment/lighting-tower.jpg' },
    { name: 'Rollers 800mm and 1200mm', description: 'Rollers available in 800mm and 1200mm widths.', imageUrl: '/images/equipment/rollers.jpg' },
    { name: 'Micro Excavator', description: 'Compact micro excavator.', imageUrl: '/images/equipment/micro-excavator.jpg' },
    { name: '1.8T Excavator', description: '1.8 Ton mini excavator.', imageUrl: '/images/equipment/1-8t-excavator.jpg' },
    { name: '3T Excavator', description: '3 Ton excavator.', imageUrl: '/images/equipment/3t-excavator.jpg' },
    { name: '800Kg Tracked Dumper', description: '800kg capacity tracked dumper.', imageUrl: '/images/equipment/800kg-tracked-dumper.jpg' },
    { name: '1 Ton High Tip Dumper', description: '1 Ton capacity high tip dumper.', imageUrl: '/images/equipment/1-ton-high-tip-dumper.jpg' },
    { name: '3 Ton Swivel Dumper', description: '3 Ton capacity swivel dumper.', imageUrl: '/images/equipment/3-ton-swivel-dumper.jpg' },
    { name: '6 Ton Straight Tip Dumper', description: '6 Ton capacity straight tip dumper.', imageUrl: '/images/equipment/6-ton-straight-tip-dumper.jpg' },
  ];

  for (const data of equipmentData) {
    await prisma.equipment.upsert({
      where: { name: data.name },
      update: { ...data },
      create: { ...data },
    });
    console.log(`Upserted equipment: ${data.name}`);
  }

  console.log('Database seeding completed.');

  // Add admin user
  const adminEmail = 'info@aberdeenshireplanthire.co.uk';
  const adminPassword = 'aberdeenshireplanthire367+'; // THIS SHOULD BE A SECURELY GENERATED PASSWORD
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      isAdmin: true,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
      name: 'Admin User', // You can change the name if needed
    },
  });

  console.log(`Upserted admin user: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 