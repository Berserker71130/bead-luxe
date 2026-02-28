export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isHelpful: number;
}

export const reviews: Review[] = [
  // Reviews for p1 (Golden Majesty)
  {
    id: "r1",
    productId: "p1",
    userName: "Elena G.",
    rating: 5,
    comment: "The gold lining is exquisite. Truly luxe!",
    date: "2024-03-15",
    isHelpful: 8,
  },
  {
    id: "r2",
    productId: "p1",
    userName: "Marcus V.",
    rating: 4,
    comment: "Beautiful quality, though shipping took an extra day.",
    date: "2024-03-10",
    isHelpful: 5,
  },
  {
    id: "r3",
    productId: "p1",
    userName: "Sophia L.",
    rating: 5,
    comment: "I use these for my premium line. My customers love them!",
    date: "2024-03-20",
    isHelpful: 4,
  },

  // Reviews for p2 (Ocean Mist)
  {
    id: "r4",
    productId: "p2",
    userName: "Sarah J.",
    rating: 5,
    comment: "The teal color is so calming and the glaze is perfect.",
    date: "2024-04-01",
    isHelpful: 3,
  },
  {
    id: "r5",
    productId: "p2",
    userName: "David R.",
    rating: 4,
    comment: "Great spacers, very uniform in size.",
    date: "2024-04-05",
    isHelpful: 6,
  },
  {
    id: "r6",
    productId: "p2",
    userName: "Emma B.",
    rating: 5,
    comment: "Perfect for my beach-themed jewelry collection.",
    date: "2024-04-07",
    isHelpful: 7,
  },

  // Reviews for p3 (Amethyst)
  {
    id: "r7",
    productId: "p3",
    userName: "Liam N.",
    rating: 5,
    comment: "Deep, rich purple. Real gemstone quality.",
    date: "2024-04-10",
    isHelpful: 9,
  },
  {
    id: "r8",
    productId: "p3",
    userName: "Olivia W.",
    rating: 5,
    comment: "Weighty and cold to the touch. The real deal.",
    date: "2024-04-12",
    isHelpful: 5,
  },
  {
    id: "r9",
    productId: "p3",
    userName: "Isabella K.",
    rating: 4,
    comment: "Stunning, but one bead had a tiny chip.",
    date: "2024-04-15",
    isHelpful: 4,
  },

  // Reviews for p11 (Midnight Silk)
  {
    id: "r10",
    productId: "p11",
    userName: "Noah M.",
    rating: 5,
    comment: "Strongest silk thread I've used. Doesn't fray!",
    date: "2024-05-01",
    isHelpful: 8,
  },
  {
    id: "r11",
    productId: "p11",
    userName: "Ava P.",
    rating: 5,
    comment: "The matte finish makes my knots look so professional.",
    date: "2024-05-03",
    isHelpful: 7,
  },
  {
    id: "r12",
    productId: "p11",
    userName: "Lucas T.",
    rating: 4,
    comment: "A bit pricey but worth it for the quality.",
    date: "2024-05-05",
    isHelpful: 3,
  },

  // Reviews for p17 (Beginner Kit)
  {
    id: "r13",
    productId: "p17",
    userName: "Mila S.",
    rating: 5,
    comment: "Best gift I ever bought myself. Everything is so high-end.",
    date: "2024-05-10",
    isHelpful: 3,
  },
  {
    id: "r14",
    productId: "p17",
    userName: "Ethan D.",
    rating: 5,
    comment: "The pliers alone are worth half the price of the kit.",
    date: "2024-05-12",
    isHelpful: 8,
  },
  {
    id: "r15",
    productId: "p17",
    userName: "Charlotte H.",
    rating: 4,
    comment: "Instructions were clear, but I wish it had more silver thread.",
    date: "2024-05-14",
    isHelpful: 5,
  },

  // Reviews for p10 (Caliper)
  {
    id: "r16",
    productId: "p10",
    userName: "Benjamin F.",
    rating: 5,
    comment: "Saves me so much time when sorting my seed beads.",
    date: "2024-05-15",
    isHelpful: 9,
  },
  {
    id: "r17",
    productId: "p10",
    userName: "Amelia Z.",
    rating: 5,
    comment: "Solid build. Very accurate.",
    date: "2024-05-16",
    isHelpful: 5,
  },

  // Generic reviews for other products to ensure variety
  {
    id: "r18",
    productId: "p4",
    userName: "James L.",
    rating: 5,
    comment: "Beautiful rose quartz!",
    date: "2024-05-17",
    isHelpful: 5,
  },
  {
    id: "r19",
    productId: "p5",
    userName: "Grace E.",
    rating: 4,
    comment: "Very tiny, perfect for detail work.",
    date: "2024-05-18",
    isHelpful: 7,
  },
  {
    id: "r20",
    productId: "p15",
    userName: "Henry B.",
    rating: 5,
    comment: "A must-have for any serious crafter.",
    date: "2024-05-19",
    isHelpful: 2,
  },
  {
    id: "r21",
    productId: "p19",
    userName: "Lily C.",
    rating: 5,
    comment: "The color palette is breathtaking.",
    date: "2024-05-20",
    isHelpful: 4,
  },
  {
    id: "r22",
    productId: "p20",
    userName: "Daniel S.",
    rating: 5,
    comment: "I look forward to this box every month!",
    date: "2024-05-21",
    isHelpful: 6,
  },
];
