import 'swiper/css';
import 'swiper/css/pagination';
import {headers} from "next/headers";
import 'swiper/css';
import 'swiper/css/pagination';
import Anchor from "@/components/Anchor/Anchor";

export default async function Home() {
  const headersList = await headers();
  const uaString = headersList.get("user-agent") || "";
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(uaString);

  return (
    <div className="text-white relative">
      <Anchor/>
      <h1>Главная</h1>
    </div>
  );
}
