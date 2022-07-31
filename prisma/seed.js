const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
var fs = require('fs');

const prisma = new PrismaClient();

async function seed() {
  /*
  const firstDocInfo = {
    data: {
      title: "Das Kapital"
    }
  };
  await prisma.docinfo.create(firstDocInfo);

  const secondDocInfo = {
    data: {
      title: "Communist Manifesto"
    }
  };
  await prisma.docInfo.create(secondDocInfo);
  */

  fs.readdir(__dirname, (err, files) => {
    if (err)
      console.log(err);
    else {
      console.log("\nCurrent directory filenames:");
      files.forEach(file => {
        console.log(file);
      })
    }
  })

  var fPath = __dirname + "/marx-db-reg-sample.json";

  var regData = JSON.parse(fs.readFileSync(fPath, 'utf8'));
  var regRecords = regData.entries;

  for (const regRecordKey of Object.keys(regRecords)) {
    var regRecord = regRecords[regRecordKey];
    console.log(regRecord);
    // Get just the id and title
    var baseData = {
      id: regRecordKey,
      title: regRecord.title,
    };
    await prisma.docinfo.upsert({
      where: {id: baseData.id },
      update: baseData,
      create: baseData,
    });
  }

  const posts = [
    {
      slug: "my-first-post",
      title: "My First Post",
      markdown: `
      # This is my first post

      Isn't it great?
          `.trim(),
        },
        {
          slug: "90s-mixtape",
          title: "A Mixtape I Made Just For You",
          markdown: `
      # 90s Mixtape
      
      - I wish (Skee-Lo)
      - This Is How We Do It (Montell Jordan)
      - Everlong (Foo Fighters)
      - Ms. Jackson (Outkast)
      - Interstate Love Song (Stone Temple Pilots)
      - Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)
      - Just a Friend (Biz Markie)
      - The Man Who Sold The World (Nirvana)
      - Semi-Charmed Life (Third Eye Blind)
      - ...Baby One More Time (Britney Spears)
      - Better Man (Pearl Jam)
      - It's All Coming Back to Me Now (Céline Dion)
      - This Kiss (Faith Hill)
      - Fly Away (Lenny Kravits)
      - Scar Tissue (Red Hot Chili Peppers)
      - Santa Monica (Everclear)
      - C'mon N' Ride it (Quad City DJ's)
          `.trim(),
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: {slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
