import mongoose from "mongoose";
import { hashSync } from "bcryptjs";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const img = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const products = [
  // Electronics
  {
    name: "Aurora Noise-Cancelling Headphones",
    price: 249.99,
    discountPrice: 189.99,
    description:
      "Immersive over-ear headphones with adaptive noise cancellation, 40-hour battery life and plush memory-foam cushions for all-day comfort.",
    image: img("1505740420928-5e560c06d30e"),
    category: "Electronics",
    brand: "Aurora",
    rating: 4.8,
    numReviews: 214,
    stock: 32,
    isFeatured: true,
    isTrending: true,
    isNew: true,
  },
  {
    name: "Pulse Fit Smart Watch",
    price: 199.0,
    discountPrice: 149.0,
    description:
      "Track your health, workouts and notifications on a vivid AMOLED display. Water resistant with a 7-day battery and built-in GPS.",
    image: img("1523275335684-37898b6baf30"),
    category: "Electronics",
    brand: "Pulse",
    rating: 4.6,
    numReviews: 168,
    stock: 24,
    isFeatured: true,
    isTrending: false,
    isNew: true,
  },
  {
    name: "Nimbus Mechanical Keyboard",
    price: 129.99,
    discountPrice: null,
    description:
      "Hot-swappable RGB mechanical keyboard with gasket mount, PBT keycaps and a compact 75% layout for work and play.",
    image: img("1595225476474-87563907a212"),
    category: "Electronics",
    brand: "Nimbus",
    rating: 4.7,
    numReviews: 96,
    stock: 18,
    isFeatured: false,
    isTrending: true,
    isNew: true,
  },
  {
    name: "Zephyr Portable Bluetooth Speaker",
    price: 89.99,
    discountPrice: 69.99,
    description:
      "Rich 360° sound in a rugged, waterproof design. 20 hours of playtime and deep bass for every adventure.",
    image: img("1608043152269-423dbba4e7e1"),
    category: "Electronics",
    brand: "Zephyr",
    rating: 4.5,
    numReviews: 143,
    stock: 40,
    isFeatured: false,
    isTrending: true,
    isNew: false,
  },

  // Fashion
  {
    name: "Everyday Merino Wool Sweater",
    price: 119.0,
    discountPrice: 89.0,
    description:
      "Soft, breathable merino wool sweater that keeps you warm in winter and cool in spring. Timeless fit, built to last.",
    image: img("1434389677669-e08b4cac3105"),
    category: "Fashion",
    brand: "Northwind",
    rating: 4.7,
    numReviews: 88,
    stock: 26,
    isFeatured: true,
    isTrending: false,
    isNew: true,
  },
  {
    name: "Classic Slim-Fit Denim Jeans",
    price: 79.99,
    discountPrice: null,
    description:
      "Premium stretch denim with a modern slim fit. Features reinforced stitching and a versatile indigo wash.",
    image: img("1542272604-787c3835535d"),
    category: "Fashion",
    brand: "Northwind",
    rating: 4.4,
    numReviews: 132,
    stock: 45,
    isFeatured: false,
    isTrending: true,
    isNew: false,
  },
  {
    name: "Heritage Faux-Leather Jacket",
    price: 159.0,
    discountPrice: 119.0,
    description:
      "A versatile zip-up jacket with a smooth faux-leather finish, quilted lining and timeless moto-inspired detailing.",
    image: img("1551028719-00167b16eac5"),
    category: "Fashion",
    brand: "Heritage",
    rating: 4.5,
    numReviews: 74,
    stock: 15,
    isFeatured: false,
    isTrending: false,
    isNew: true,
  },
  {
    name: "Organic Cotton Essential Tee",
    price: 29.99,
    discountPrice: null,
    description:
      "A wardrobe staple made from 100% organic cotton with a relaxed fit and a super-soft hand feel.",
    image: img("1521572163474-6864f9cf17ab"),
    category: "Fashion",
    brand: "Northwind",
    rating: 4.3,
    numReviews: 210,
    stock: 60,
    isFeatured: false,
    isTrending: false,
    isNew: false,
  },

  // Home & Kitchen
  {
    name: "Brewline Stainless Coffee Maker",
    price: 149.0,
    discountPrice: 119.0,
    description:
      "Programmable drip coffee maker with a thermal carafe, reusable filter and a 24-hour brew timer for perfect mornings.",
    image: img("1495474472287-4d71bcdd2085"),
    category: "Home & Kitchen",
    brand: "Brewline",
    rating: 4.6,
    numReviews: 121,
    stock: 22,
    isFeatured: true,
    isTrending: true,
    isNew: false,
  },
  {
    name: "Lumen Ceramic Table Lamp",
    price: 69.99,
    discountPrice: null,
    description:
      "Minimalist ceramic table lamp with a warm linen shade. Ideal for bedside tables and cozy reading nooks.",
    image: img("1507473885765-e6ed057f782c"),
    category: "Home & Kitchen",
    brand: "Lumen",
    rating: 4.5,
    numReviews: 63,
    stock: 30,
    isFeatured: false,
    isTrending: false,
    isNew: true,
  },
  {
    name: "Cast Iron Chef Skillet",
    price: 54.99,
    discountPrice: 39.99,
    description:
      "Pre-seasoned cast iron skillet that delivers even heat and a lifetime of durability, from stove to oven.",
    image: img("1585515320310-259814833e62"),
    category: "Home & Kitchen",
    brand: "Ironclad",
    rating: 4.8,
    numReviews: 187,
    stock: 35,
    isFeatured: false,
    isTrending: true,
    isNew: false,
  },
  {
    name: "Serene 8-Piece Knife Block Set",
    price: 99.0,
    discountPrice: 74.0,
    description:
      "German stainless-steel knives with ergonomic handles and a sleek acacia wood block. Precision for every recipe.",
    image: img("1593618998160-e34014e67546"),
    category: "Home & Kitchen",
    brand: "Serene",
    rating: 4.4,
    numReviews: 57,
    stock: 19,
    isFeatured: false,
    isTrending: false,
    isNew: true,
  },

  // Sports & Fitness
  {
    name: "Flow Grip Yoga Mat",
    price: 44.99,
    discountPrice: 34.99,
    description:
      "Extra-thick, non-slip yoga mat with alignment guides and a carry strap. Cushioned support for every pose.",
    image: img("1544367567-0f2fcb009e0b"),
    category: "Sports & Fitness",
    brand: "Flow",
    rating: 4.6,
    numReviews: 149,
    stock: 42,
    isFeatured: true,
    isTrending: false,
    isNew: false,
  },
  {
    name: "Peak Adjustable Dumbbell Set",
    price: 199.0,
    discountPrice: 159.0,
    description:
      "Space-saving adjustable dumbbells with quick-lock plates from 5 to 25 lbs — a full home gym in two handles.",
    image: img("1517836357463-d25dfeac3438"),
    category: "Sports & Fitness",
    brand: "Peak",
    rating: 4.7,
    numReviews: 92,
    stock: 14,
    isFeatured: false,
    isTrending: true,
    isNew: true,
  },
  {
    name: "TrailRun Lightweight Running Shoes",
    price: 129.99,
    discountPrice: null,
    description:
      "Responsive cushioning and a breathable knit upper make these shoes perfect for daily runs and long distances.",
    image: img("1542291026-7eec264c27ff"),
    category: "Sports & Fitness",
    brand: "TrailRun",
    rating: 4.5,
    numReviews: 176,
    stock: 28,
    isFeatured: false,
    isTrending: false,
    isNew: true,
  },
  {
    name: "HydroSteel Insulated Water Bottle",
    price: 32.0,
    discountPrice: 24.0,
    description:
      "Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12. Leak-proof and built for the gym.",
    image: img("1602143407151-7111542de6e8"),
    category: "Sports & Fitness",
    brand: "HydroSteel",
    rating: 4.7,
    numReviews: 205,
    stock: 55,
    isFeatured: false,
    isTrending: false,
    isNew: false,
  },

  // Accessories
  {
    name: "Voyage Leather Laptop Backpack",
    price: 89.99,
    discountPrice: 69.99,
    description:
      "Water-resistant backpack with a padded 16\" laptop sleeve, anti-theft pocket and USB charging port.",
    image: img("1553062407-98eeb64c6a62"),
    category: "Accessories",
    brand: "Voyage",
    rating: 4.6,
    numReviews: 118,
    stock: 33,
    isFeatured: false,
    isTrending: true,
    isNew: true,
  },
  {
    name: "Solstice Polarized Sunglasses",
    price: 59.99,
    discountPrice: null,
    description:
      "UV400 polarized lenses in a lightweight acetate frame. Timeless silhouette with scratch-resistant coating.",
    image: img("1511499767150-a48a237f0083"),
    category: "Accessories",
    brand: "Solstice",
    rating: 4.4,
    numReviews: 81,
    stock: 47,
    isFeatured: false,
    isTrending: false,
    isNew: false,
  },
  {
    name: "Chrono Minimalist Wrist Watch",
    price: 139.0,
    discountPrice: 99.0,
    description:
      "A clean, modern timepiece with a sapphire-coated dial and genuine leather strap. Understated everyday elegance.",
    image: img("1524805444758-089113d48a6d"),
    category: "Accessories",
    brand: "Chrono",
    rating: 4.7,
    numReviews: 102,
    stock: 21,
    isFeatured: true,
    isTrending: true,
    isNew: false,
  },
  {
    name: "Metro Canvas Crossbody Bag",
    price: 42.0,
    discountPrice: 32.0,
    description:
      "Durable canvas crossbody with adjustable strap and multiple compartments for everyday carry.",
    image: img("1548036328-c9fa89d128fa"),
    category: "Accessories",
    brand: "Metro",
    rating: 4.3,
    numReviews: 66,
    stock: 38,
    isFeatured: false,
    isTrending: false,
    isNew: true,
  },

  // Beauty & Personal Care
  {
    name: "Lumière Vitamin C Serum",
    price: 39.99,
    discountPrice: 29.99,
    description:
      "Brightening face serum with 15% vitamin C and hyaluronic acid to even skin tone and boost radiance.",
    image: img("1620916566398-39f1143ab7be"),
    category: "Beauty & Personal Care",
    brand: "Lumière",
    rating: 4.8,
    numReviews: 243,
    stock: 50,
    isFeatured: true,
    isTrending: true,
    isNew: true,
  },
  {
    name: "Botanica Argan Hair Oil",
    price: 24.99,
    discountPrice: null,
    description:
      "Nourishing argan oil blend that repairs split ends and adds shine without weighing hair down.",
    image: img("1608248543803-ba4f8c70ae0b"),
    category: "Beauty & Personal Care",
    brand: "Botanica",
    rating: 4.6,
    numReviews: 128,
    stock: 44,
    isFeatured: false,
    isTrending: false,
    isNew: false,
  },
  {
    name: "Velvet Matte Lipstick Trio",
    price: 34.0,
    discountPrice: 26.0,
    description:
      "Three long-wearing matte shades with a creamy, comfortable finish. Vegan and cruelty-free.",
    image: img("1586495777744-4413f21062fa"),
    category: "Beauty & Personal Care",
    brand: "Velvet",
    rating: 4.5,
    numReviews: 97,
    stock: 37,
    isFeatured: false,
    isTrending: true,
    isNew: true,
  },
  {
    name: "Pure Glow Daily Cleanser",
    price: 21.99,
    discountPrice: null,
    description:
      "Gentle gel cleanser with aloe and green tea that removes makeup and impurities without stripping skin.",
    image: img("1556228720-195a672e8a03"),
    category: "Beauty & Personal Care",
    brand: "Pure Glow",
    rating: 4.4,
    numReviews: 154,
    stock: 48,
    isFeatured: false,
    isTrending: false,
    isNew: false,
  },
];

const users = [
  {
    name: "Admin User",
    email: "admin@shopzone.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Demo Customer",
    email: "demo@shopzone.com",
    password: "demo123",
    role: "user",
  },
];

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is missing. Run with --env-file=.env.local");
  process.exit(1);
}

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, default: 0, min: 0 },
    discountPrice: { type: Number, default: null, min: 0 },
    image: { type: String, default: "" },
    images: { type: [String], default: [] },
    category: { type: String, default: "General", index: true },
    categorySlug: { type: String, default: "general", index: true },
    brand: { type: String, default: "ShopZone" },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    isFeatured: { type: Boolean, default: false, index: true },
    isTrending: { type: Boolean, default: false, index: true },
    isNew: { type: Boolean, default: true, index: true },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seedProducts() {
  const ops = products.map((product) => {
    const slug = slugify(product.name);
    const doc = {
      ...product,
      slug,
      categorySlug: slugify(product.category),
      images: [product.image],
    };
    return {
      updateOne: {
        filter: { slug },
        update: { $set: doc },
        upsert: true,
      },
    };
  });

  const result = await Product.bulkWrite(ops);
  console.log(
    `Products: ${result.upsertedCount} inserted, ${result.modifiedCount} updated.`
  );
}

async function seedUsers() {
  for (const user of users) {
    const email = user.email.toLowerCase();
    const existing = await User.findOne({ email });
    if (existing) {
      await User.updateOne(
        { _id: existing._id },
        { $set: { name: user.name, role: user.role, passwordHash: hashSync(user.password, 10) } }
      );
    } else {
      await User.create({
        name: user.name,
        email,
        role: user.role,
        passwordHash: hashSync(user.password, 10),
      });
    }
  }
  console.log(`Users seeded.`);
}

async function main() {
  await mongoose.connect(MONGODB_URI);

  const removed = await Product.deleteMany({ slug: { $exists: false } });
  if (removed.deletedCount > 0) {
    console.log(`Removed ${removed.deletedCount} legacy product(s) without a slug.`);
  }

  await seedProducts();
  await seedUsers();

  console.log(`Total products: ${await Product.countDocuments()}`);
  console.log(`Total users: ${await User.countDocuments()}`);
  console.log("\nDemo accounts:");
  console.log("  Admin    -> admin@shopzone.com / admin123");
  console.log("  Customer -> demo@shopzone.com / demo123");

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
