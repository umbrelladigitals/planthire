export { auth as middleware } from '@/auth'; // auth.ts'den auth fonksiyonunu alıyoruz

// Sadece belirli yolları korumak için matcher ekleyebiliriz:
// export const config = {
//   matcher: ['/panel/:path*'],
// }; 