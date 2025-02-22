import type { Capsule } from "@shared/schema";

export const mockCapsules: Capsule[] = [
  {
    id: 1,
    title: "Graduation Memories",
    description: "A collection of our graduation day memories and hopes for the future",
    content: { text: "Our graduation day was filled with joy..." },
    openDate: new Date("2024-12-31").toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1447069387593-a5de0862481e",
    createdAt: new Date("2024-01-01").toISOString(),
  },
  {
    id: 2,
    title: "Family Time Capsule",
    description: "Preserving our family's special moments and traditions",
    content: { text: "Our family gatherings have always been..." },
    openDate: new Date("2024-06-15").toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1532387482281-c56ef57652ec",
    createdAt: new Date("2023-12-25").toISOString(),
  },
  {
    id: 3,
    title: "City Memories",
    description: "Documenting the changing face of our beloved city",
    content: { text: "The city has transformed..." },
    openDate: new Date("2025-01-01").toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1528569937393-ee892b976859",
    createdAt: new Date("2024-01-15").toISOString(),
  }
];
