export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    userId: "u2",
    userName: "Jane Doe",
    items: [
      { productId: "p1", name: "Golden Majesty Beads", quantity: 2, price: 45 },
    ],
    total: 90,
    status: "delivered",
    createdAt: "2024-05-01T10:00:00Z",
  },
  {
    id: "ORD-002",
    userId: "u3",
    userName: "Robert Chen",
    items: [
      { productId: "p17", name: "Luxe Beading Kit", quantity: 1, price: 85 },
    ],
    total: 85,
    status: "shipped",
    createdAt: "2024-05-02T14:20:00Z",
  },
  {
    id: "ORD-003",
    userId: "u4",
    userName: "Alice Smith",
    items: [
      { productId: "p2", name: "Ceramic Spacers", quantity: 5, price: 18 },
    ],
    total: 90,
    status: "pending",
    createdAt: "2024-05-03T09:45:00Z",
  },
  {
    id: "ORD-004",
    userId: "u5",
    userName: "Michael Brown",
    items: [
      { productId: "p10", name: "Digital Caliper", quantity: 1, price: 55 },
    ],
    total: 55,
    status: "delivered",
    createdAt: "2024-05-04T16:10:00Z",
  },
  {
    id: "ORD-005",
    userId: "u2",
    userName: "Jane Doe",
    items: [{ productId: "p5", name: "Seed Beads", quantity: 10, price: 8 }],
    total: 80,
    status: "delivered",
    createdAt: "2024-05-05T11:30:00Z",
  },
  {
    id: "ORD-006",
    userId: "u3",
    userName: "Robert Chen",
    items: [
      { productId: "p13", name: "Silk Thread", quantity: 3, price: 12.5 },
    ],
    total: 37.5,
    status: "cancelled",
    createdAt: "2024-05-06T13:00:00Z",
  },
  {
    id: "ORD-007",
    userId: "u4",
    userName: "Alice Smith",
    items: [
      { productId: "p19", name: "Artisan Pallete", quantity: 1, price: 210 },
    ],
    total: 210,
    status: "pending",
    createdAt: "2024-05-07T10:15:00Z",
  },
  {
    id: "ORD-008",
    userId: "u5",
    userName: "Michael Brown",
    items: [
      { productId: "p7", name: "Gold Ear Hooks", quantity: 2, price: 35 },
    ],
    total: 70,
    status: "shipped",
    createdAt: "2024-05-08T15:50:00Z",
  },
  {
    id: "ORD-009",
    userId: "u2",
    userName: "Jane Doe",
    items: [{ productId: "p11", name: "Desk Lamp", quantity: 1, price: 89 }],
    total: 89,
    status: "pending",
    createdAt: "2024-05-09T08:20:00Z",
  },
  {
    id: "ORD-010",
    userId: "u4",
    userName: "Alice Smith",
    items: [
      { productId: "p6", name: "Lobster Clasps", quantity: 4, price: 22.5 },
    ],
    total: 90,
    status: "delivered",
    createdAt: "2024-05-10T12:00:00Z",
  },
];
