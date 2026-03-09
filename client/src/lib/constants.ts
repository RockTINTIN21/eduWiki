export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
export const API_UPLOADS_URL = `${process.env.NEXT_PUBLIC_API_URL}/uploads`;

if (!API_URL) {
  console.error("NEXT_PUBLIC_API_URL не найден");
  process.exit(1);
}