/**
 * ============================================================
 *  SHOP CONFIGURATION — edit this file to update your store
 * ============================================================
 *
 * To switch from a food shop to any other store (e.g. laptops,
 * clothing) just replace the categories and products below.
 * The entire UI regenerates automatically.
 */

const shopConfig = {
  // ── General ────────────────────────────────────────────────
  shopName: "QuickBite",
  tagline: "Fresh food, delivered fast 🚀",

  // WhatsApp number in international format (no +, spaces, or dashes)
  whatsappNumber: "15551234567",

  currency: {
    symbol: "$",
    code: "USD",
  },

  // ── Categories ─────────────────────────────────────────────
  // The "All" tab is added automatically — no need to add it here.
  categories: [
    { id: "burgers", label: "Burgers" },
    { id: "sides", label: "Sides" },
    { id: "drinks", label: "Drinks" },
    { id: "desserts", label: "Desserts" },
  ],

  // ── Products ───────────────────────────────────────────────
  // image: use a URL or a path inside /public (e.g. "/products/burger.jpg")
  // Picsum photos are used here for demo purposes (seed = consistent image).
  products: [
    {
      id: 1,
      categoryId: "burgers",
      name: "Classic Cheeseburger",
      description: "Juicy beef patty, aged cheddar, lettuce, tomato & special sauce.",
      price: 9.99,
      image: "https://picsum.photos/seed/burger1/400/300",
    },
    {
      id: 2,
      categoryId: "burgers",
      name: "Double Smash Burger",
      description: "Two smashed patties, American cheese, caramelised onions, pickles.",
      price: 13.49,
      image: "https://picsum.photos/seed/burger2/400/300",
    },
    {
      id: 3,
      categoryId: "burgers",
      name: "Crispy Chicken Burger",
      description: "Southern fried chicken breast, coleslaw, honey-sriracha glaze.",
      price: 11.99,
      image: "https://picsum.photos/seed/chicken1/400/300",
    },
    {
      id: 4,
      categoryId: "burgers",
      name: "Veggie Beyond Burger",
      description: "Plant-based patty, avocado, roasted peppers, vegan aioli.",
      price: 12.49,
      image: "https://picsum.photos/seed/veggie1/400/300",
    },
    {
      id: 5,
      categoryId: "sides",
      name: "Loaded Fries",
      description: "Crispy fries topped with cheese sauce, jalapeños & crispy bacon.",
      price: 5.99,
      image: "https://picsum.photos/seed/fries1/400/300",
    },
    {
      id: 6,
      categoryId: "sides",
      name: "Onion Rings",
      description: "Beer-battered golden rings with smoky BBQ dipping sauce.",
      price: 4.49,
      image: "https://picsum.photos/seed/rings1/400/300",
    },
    {
      id: 7,
      categoryId: "sides",
      name: "Caesar Side Salad",
      description: "Romaine, parmesan shavings, croutons, house Caesar dressing.",
      price: 4.99,
      image: "https://picsum.photos/seed/salad1/400/300",
    },
    {
      id: 8,
      categoryId: "drinks",
      name: "Classic Milkshake",
      description: "Choose vanilla, chocolate, or strawberry — thick & creamy.",
      price: 5.49,
      image: "https://picsum.photos/seed/shake1/400/300",
    },
    {
      id: 9,
      categoryId: "drinks",
      name: "Fresh Lemonade",
      description: "Hand-squeezed lemonade with a hint of mint. Served chilled.",
      price: 3.49,
      image: "https://picsum.photos/seed/lemon1/400/300",
    },
    {
      id: 10,
      categoryId: "drinks",
      name: "Craft Cola",
      description: "Small-batch Mexican coke in a glass bottle. Ice cold.",
      price: 2.99,
      image: "https://picsum.photos/seed/cola1/400/300",
    },
    {
      id: 11,
      categoryId: "desserts",
      name: "Chocolate Lava Cake",
      description: "Warm molten chocolate centre, vanilla bean ice cream on the side.",
      price: 6.99,
      image: "https://picsum.photos/seed/cake1/400/300",
    },
    {
      id: 12,
      categoryId: "desserts",
      name: "NY Cheesecake Slice",
      description: "Dense & creamy New York style with fresh berry compote.",
      price: 5.99,
      image: "https://picsum.photos/seed/cheese1/400/300",
    },
  ],
};

export default shopConfig;
