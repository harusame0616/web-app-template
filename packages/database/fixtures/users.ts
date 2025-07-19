export const testUsers = [
  {
    userId: "11111111-1111-1111-1111-111111111111",
    name: "山田太郎",
    email: "yamada@example.com",
    password: "password123",
  },
  {
    userId: "22222222-2222-2222-2222-222222222222",
    name: "佐藤花子",
    email: "sato@example.com",
    password: "password123",
  },
  {
    userId: "33333333-3333-3333-3333-333333333333",
    name: "鈴木一郎",
    email: "suzuki@example.com",
    password: "password123",
  },
  {
    userId: "44444444-4444-4444-4444-444444444444",
    name: "テスト用太郎",
    email: "test@example.com",
    password: "password123",
  },
  {
    userId: "55555555-5555-5555-5555-555555555555",
    name: "テスト用花子",
    email: "nemoto.masaharu.it@gmail.com",
    password: "password123",
  },
] as const;

export const adminUser = testUsers[0];
