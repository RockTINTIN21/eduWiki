import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/pagination';
import Anchor from "@/components/Anchor/Anchor";
import Button from "@/components/Button/Button";
import {SearchIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import Card from "@/app/(home)/components/Card";
import Image from "next/image";

export default async function Home() {

  return (
    <div className="text-[#111827] relative mx-4 md:w-[960px] md:mx-auto pt-20 flex flex-col gap-6 pb-12">
      <Anchor />
      <div className="text-center">
        <h1 className="text-3xl">Найдите вашу следующую остановку</h1>
        <p className="text-lg">
          Ищите страны, направления, программы, университеты
        </p>

        <div
          className="flex border border-[#E8E8E8] md:mx-52 mt-5 rounded-full justify-between py-2 px-3
        shadow-accent/20 shadow-xl gap-4"
        >
          <input type="text" placeholder="Искать" className="ms-4 w-full" />
          <Button className="flex items-center gap-2 px-5">
            <HugeiconsIcon icon={SearchIcon} width={18} />
            Искать
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-xl">Популярные страны</h3>
        <div className="md:grid md:grid-cols-4 gap-4 md:w-full pt-3 overflow-x-auto flex">
          {/*<Card*/}
          {/*  link={countryData[0].country_id}*/}
          {/*  className={"md:col-span-2 md:aspect-2/1"}*/}
          {/*  countryName={countryData[0].name}*/}
          {/*  countryIcon={countryData[0].country_code}*/}
          {/*  bgImage={countryData[0].bg_image}*/}
          {/*/>*/}

          {/*<Card*/}
          {/*  link={countryData[1].country_id}*/}
          {/*  className={"md:col-span-2 md:aspect-2/1"}*/}
          {/*  countryName={countryData[1].name}*/}
          {/*  countryIcon={countryData[1].country_code}*/}
          {/*  bgImage={countryData[1].bg_image}*/}
          {/*/>*/}
          {/*<Card*/}
          {/*  link={countryData[2].country_id}*/}
          {/*  className={"aspect-square"}*/}
          {/*  countryName={countryData[2].name}*/}
          {/*  countryIcon={countryData[2].country_code}*/}
          {/*  bgImage={countryData[2].bg_image}*/}
          {/*/>*/}
          {/*<Card*/}
          {/*  link={countryData[3].country_id}*/}
          {/*  countryName={countryData[3].name}*/}
          {/*  countryIcon={countryData[3].country_code}*/}
          {/*  bgImage={countryData[3].bg_image}*/}
          {/*/>*/}
          {/*<Card*/}
          {/*  link={countryData[4].country_id}*/}
          {/*  countryName={countryData[4].name}*/}
          {/*  countryIcon={countryData[4].country_code}*/}
          {/*  bgImage={countryData[4].bg_image}*/}
          {/*/>*/}
          {/*<Card*/}
          {/*  link={countryData[5].country_id}*/}
          {/*  countryName={countryData[5].name}*/}
          {/*  countryIcon={countryData[5].country_code}*/}
          {/*  bgImage={countryData[5].bg_image}*/}
          {/*/>*/}
        </div>
      </div>

      <div>
        <h3 className="text-xl">Популярные университеты</h3>
        <div className="md:grid grid-cols-4 gap-4 w-full pt-3 overflow-x-auto flex">
          <Card
            link={"/"}
            className={"aspect-square"}
            countryName="Сербия"
            countryIcon={"RS"}
            bgImage={"/images/countries/belgrade.jpg"}
            title={"Белградский университет"}
          />
          <Card
            link={"/"}
            className={"aspect-square"}
            countryName="Германия"
            countryIcon={"DE"}
            bgImage={"/images/countries/germanyUniversity.jpg"}
            title={"Мюнхенский технический университет"}
          />
          <Card
            link={"/"}
            className={"aspect-square"}
            countryName="Венгрия"
            countryIcon={"HU"}
            bgImage={"/images/countries/hungaryUniversity.jpg"}
            title={"Page of Szeged"}
          />
          <Card
            link={"/"}
            className={"aspect-square"}
            countryName="Италия"
            countryIcon={"IT"}
            bgImage={"/images/countries/italyUniversity.jpg"}
            title={"Римский университет Ла Сапиенца"}
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl">Новости edumap</h3>
        <div className="p-4 mt-3 rounded-2xl bg-secondary">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={"/images/avatar.jpg"}
                width={30}
                height={30}
                alt={"Администратор"}
                className="rounded-full border-accent border-2"
              />
              <p className="font-medium">Администратор</p>
            </div>
            <span className="text-[#5A5A5A]">29 ноября 2025 в 12:33</span>
          </div>
          <p className="pt-3">
            Мне 22 года, учусь в Сербии второй год. В целом страна оказалась
            проще и комфортнее, чем я ожидал. Адаптация проходит спокойно: язык
            понятен, местные относятся нормально, бюрократия терпимая. Стоимость
            жизни ниже, чем в большинстве европейских стран, и это сильно
            помогает, когда живёшь на студенческий бюджет. Учёба сама по себе не
            сложная. Университеты здесь не топовые по мировым рейтингам, но для
            получения диплома и легального статуса всё работает. На английских
            программах учиться удобнее, но вариантов на английском меньше.
            Документы принимают без лишних требований, главное — грамотно
            подготовить пакет перед подачей. Из минусов — карьерные перспективы
            в стране ограниченные. Если хотите строить высокооплачиваемую
            карьеру, особенно в IT, Сербия вряд ли станет конечным пунктом.
            Многие, как и я, рассматривают её как удобный старт: сначала
            адаптироваться, получить диплом или ВНЖ, а дальше двигаться в ЕС.
            Если нужен спокойный, доступный вариант для переезда через
            образование, то Сербия подходит. Но рассчитывать стоит на
            постепенную стратегию, а не на быстрый рост внутри страны.
          </p>
          <div className="pt-2 flex justify-end gap-4">
            <button
              className={"bg-white rounded-full text-[#00A81F] px-4 py-1"}
            >
              Понравилось <b className="font-medium text-[#5A5A5A] ps-1">693</b>
            </button>
            <button
              className={"bg-white rounded-full text-[#C6363C] px-4 py-1"}
            >
              Понравилось <b className="font-medium text-[#5A5A5A] ps-1">12</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
