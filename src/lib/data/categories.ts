export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "c1",
    name: "Beads",
    slug: "beads",
    // Luxury Pearl/Bead close-up
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "c2",
    name: "Jewelry Supplies",
    slug: "jewelry-supplies",
    // Professional jewelry pliers and silver materials
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "c3",
    name: "Art Tools",
    slug: "art-tools",
    // Artistic brushes/tools
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "c4",
    name: "Fabric & Thread",
    slug: "fabric-thread",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "c5",
    name: "Kits & Bundles",
    slug: "kits-bundles",
    // A curated craft box
    image:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=800",
  },
];
