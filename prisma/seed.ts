import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Real KramLill product photo paths (served from /public/assets/kramlill/)
const YELLOW  = "/assets/kramlill/05_real_product_yellow_flower_pendant.png";
const WILDFLOWER = "/assets/kramlill/06_real_product_wildflower_teardrop_pendant.png";

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "Golden Bloom Necklace",
        description:
          "A luminous pendant encasing a delicate yellow flower in warm golden resin. Each piece is unique — the flower is real, gathered and preserved by hand.",
        price: 38.0,
        imageUrl: YELLOW,
        instagramUrl: "https://instagram.com/kramlill",
        phoneNumber: "+372 5555 5555",
        category: "Necklaces",
        isAvailable: true,
        sortOrder: 1,
      },
      {
        name: "Forest Whisper Necklace",
        description:
          "Soft fern fronds and tiny wildflowers suspended in clear resin — like a forest floor captured in time. Hung on a natural leather cord.",
        price: 40.0,
        imageUrl: WILDFLOWER,
        instagramUrl: "https://instagram.com/kramlill",
        phoneNumber: "+372 5555 5555",
        category: "Necklaces",
        isAvailable: true,
        sortOrder: 2,
      },
      {
        name: "Wildflower Teardrop Necklace",
        description:
          "Tiny wildflowers pressed into a classic teardrop of crystal-clear resin. Lightweight and delicate — perfect for everyday wear.",
        price: 42.0,
        imageUrl: WILDFLOWER,
        instagramUrl: "https://instagram.com/kramlill",
        phoneNumber: "+372 5555 5555",
        category: "Necklaces",
        isAvailable: true,
        sortOrder: 3,
      },
      {
        name: "Sunlit Bloom Necklace",
        description:
          "Bright yellow petals caught in golden resin that glows like sunlight. Warm, joyful, and completely handmade.",
        price: 38.0,
        imageUrl: YELLOW,
        instagramUrl: "https://instagram.com/kramlill",
        phoneNumber: "+372 5555 5555",
        category: "Necklaces",
        isAvailable: true,
        sortOrder: 4,
      },
      {
        name: "Meadow Keepsake Necklace",
        description:
          "A meadow memory sealed in resin — ferns, tiny blossoms, and green leaves preserved forever in a teardrop pendant.",
        price: 39.0,
        imageUrl: WILDFLOWER,
        instagramUrl: "https://instagram.com/kramlill",
        phoneNumber: "+372 5555 5555",
        category: "Necklaces",
        isAvailable: true,
        sortOrder: 5,
      },
      {
        name: "Blush Fern Necklace",
        description:
          "Delicate pink wildflowers and pressed fern leaves sealed in a teardrop of clear resin. A whisper of the meadow to wear close to your heart.",
        price: 42.0,
        imageUrl: WILDFLOWER,
        instagramUrl: "https://instagram.com/kramlill",
        phoneNumber: "+372 5555 5555",
        category: "Necklaces",
        isAvailable: true,
        sortOrder: 6,
      },
      {
        name: "Golden Hour Necklace",
        description:
          "Warm amber resin with a single golden bloom at its heart. Catches the light beautifully — like wearing a piece of sunset.",
        price: 36.0,
        imageUrl: YELLOW,
        instagramUrl: "https://instagram.com/kramlill",
        phoneNumber: "+372 5555 5555",
        category: "Necklaces",
        isAvailable: true,
        sortOrder: 7,
      },
      {
        name: "Daisy Dreams Necklace",
        description:
          "A full daisy — petals, centre, and all — sealed in a perfectly round resin circle. Clean, joyful, and unmistakably handmade.",
        price: 34.0,
        imageUrl: YELLOW,
        instagramUrl: "https://instagram.com/kramlill",
        phoneNumber: "+372 5555 5555",
        category: "Necklaces",
        isAvailable: true,
        sortOrder: 8,
      },
    ],
  });

  console.log("✿ Database seeded with 8 KramLill products using real product photos.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
