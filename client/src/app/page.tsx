import Image from "next/image";
import Button from "@/components/Button/Button";
import 'swiper/css';
import 'swiper/css/pagination';
import {headers} from "next/headers";
import {aboutUs, ourAbilities, shortCards, statistics} from "@/app/home-components/promoData";
import PromoCard from "@/app/home-components/PromoCard";
import 'swiper/css';
import 'swiper/css/pagination';
import MobileCarousel from "@/app/home-components/MobileCarousel/MobileCarousel";
import {HugeiconsIcon} from "@hugeicons/react";
import Anchor from "@/components/Anchor/Anchor";

export default async function Home() {
  const headersList = await headers();
  const uaString = headersList.get("user-agent") || "";
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(uaString);

  return (
    <div className="text-white relative">
      <Anchor/>
      <div className="relative md:pt-60 pt-30">
        <div className="absolute inset-0 bg-[url(/images/promo/earthBg.jpg)] bg-cover bg-center opacity-20"/>

        <div className="relative p-8 flex gap-3 flex-col mx-4 md:w-8/12 md:mx-auto backdrop-blur-md
        bg-gray-800/50 rounded-4xl">
          <h1 className="md:text-4xl leading-7 md:leading-10 md:w-1/2 pe-16 text-2xl font-medium">
            Все, что стоит делать, стоит делать за границей своих привычных горизонтов.
          </h1>

          <span className='italic md:text-2xl text-xl font-light md:pb-30'>Жюль Верн</span>

          <Image src='/images/promo/julesGabriel.png'
            alt={"Жюль Верн"}
            loading={"eager"}
            width={750}
            height={500}
            className='absolute right-2 bottom-35 md:bottom-0 w-[250px] md:w-[750px]'
          />

          <div className='flex flex-col gap-4 md:flex-row'>
            <Button className="w-full md:w-max md:px-12 flex gap-2 items-center justify-center">
              О проекте
              <Image className='pt-1' src={'/images/icons/rightArrow.svg'} alt={'О проекте'} width={10} height={10}/>
            </Button>
            <Button className="w-full md:w-max md:px-12" variant='border'>Начать поиск</Button>
          </div>
        </div>

        <div className="mx-4 mt-8 pb-12 md:flex md:w-8/12 md:mx-auto md:gap-4">
          {isMobile ? <MobileCarousel data={shortCards}/>
            : shortCards.map((card, index) =>
              <PromoCard key={index} title={card.title} description={card.description} icon={card.icon} />
            )
          }
        </div>
      </div>

      <div className='relative'>
        <div className="absolute inset-0 bg-[url(/images/promo/abstractBg.jpg)] z-10 bg-cover bg-center opacity-20"/>

        <div className='relative mx-4 md:w-8/12 md:mx-auto pt-6 z-20 flex flex-col gap-8'>
          <div>
            <h3 className='font-medium text-4xl'>Что мы делаем</h3>
            <p className='text-lg pt-2'>Узнайте больше о проекте</p>

            <div className='flex flex-col gap-4 md:flex-row pt-6'>
              <div className='bg-accent rounded-4xl p-8 md:w-1/2 relative'>
                <h3 className='font-medium text-2xl pb-2'>О проекте</h3>
                <p className='leading-6 text-lg md:w-8/12'>
                  Сервис помогает гражданам РФ планировать путь для переезда через получение образования за границей.
                  Мы объединяем ключевую информацию о странах, программах и требованиях в одном месте, делая процесс
                  подготовки прозрачным и структурированным.
                </p>
                <Image className='absolute right-10 bottom-0 hidden md:block'
                  src={'/images/promo/goal.png'}
                  width={250} height={250} alt='О проекте'
                />
              </div>

              <div className='flex flex-col gap-4 md:w-1/2'>
                {aboutUs.map((card, index) =>
                  <div key={index} className='bg-gray-800/50 rounded-4xl p-8 relative flex'>
                    <div className='pe-4'>
                      <h3 className='font-medium text-2xl pb-2'>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                    <Image className='hidden md:block'
                      src={'/images/promo/' + card.icon}
                      width={150} height={150} alt={card.title}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>


          <div>
            <h3 className='font-medium text-4xl'>Наши возможности</h3>
            <p className='text-lg pt-2'>Почему вам стоит попробовать</p>

            <div className="mt-8 pb-12 md:mx-auto md:gap-8 md:grid md:grid-cols-3">
              {isMobile ? <MobileCarousel isShortCard={false} data={ourAbilities}/>
                : ourAbilities.map((card, index) =>
                  <PromoCard key={index} isShortCard={false} title={card.title} description={card.description} icon={card.icon} />
                )
              }
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-12 my-8 pb-12 bg-black mx-4 md:w-8/12 md:mx-auto pt-6'>
        <div className='bg-[#0A0A0A] rounded-2xl p-8 flex gap-8 flex-col justify-center items-center'>
          <h1 className='text-4xl font-medium md:w-4/12 text-center'>Вступайте в <b className='text-accent'>ряды </b>
              нашего <b className='text-accent'>сообщества</b>
          </h1>
          <Button className="w-full md:w-max md:px-12 flex gap-2 items-center justify-center">
              Зарегистрироваться
            <Image className='pt-1' src={'/images/icons/rightArrow.svg'} alt={'О проекте'} width={10} height={10}/>
          </Button>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8'>
          {statistics.map((card, index) =>
            <div key={index} className='bg-[#0A0A0A] rounded-3xl py-8 flex flex-col gap-4 justify-center items-center'>
              <div className='flex justify-center flex-col items-center'>
                <HugeiconsIcon icon={card.icon} width={40} height={40} />
                <p className='text-lg font-medium'>Пользователей</p>
              </div>

              <div className='rounded-full border-4 text-center w-1/2 aspect-square flex justify-center items-center'>
                <span className='text-3xl font-medium'>{card.count}</span>
              </div>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}
