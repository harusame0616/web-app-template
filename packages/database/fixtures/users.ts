export const testUsers = [
  {
    name: "山田太郎",
    email: "yamada@example.com",
    password: "demo-system",
  },
  {
    name: "佐藤花子",
    email: "sato@example.com",
    password: "demo-system",
  },
  {
    name: "鈴木一郎",
    email: "suzuki@example.com",
    password: "demo-system",
  },
  {
    name: "テスト用太郎",
    email: "test@example.com",
    password: "demo-system",
  },
  {
    name: "テスト用花子",
    email: "nemoto.masaharu.it@gmail.com",
    password: "demo-system",
  },
] as const;

export const adminUser = testUsers[0];
