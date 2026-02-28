export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  avatar?: string;
}

export const users: User[] = [
  {
    id: "u1",
    name: "Bead Luxe Admin",
    email: "admin@beadluxe.com",
    role: "admin",
    avatar: "/api/placeholder/100/100",
  },
  {
    id: "u2",
    name: "Jane Doe",
    email: "jane@example.com",
    role: "customer",
  },
  {
    id: "u3",
    name: "Robert Chen",
    email: "robert@example.com",
    role: "customer",
  },
  {
    id: "u4",
    name: "Alice Smith",
    email: "alice@example.com",
    role: "customer",
  },
  {
    id: "u5",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "customer",
  },
];
