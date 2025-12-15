import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import SidebarNavigation from "@/components/SidebarNavigation/SidebarNavigation";
import Button from "@/components/Button/Button";
import {HugeiconsIcon} from "@hugeicons/react";
import {FavouriteIcon} from "@hugeicons/core-free-icons";

const navigationList = [
  {
    title: 'О стране',
    id: 0
  },
  {
    title: 'Фотографии',
    id: 1
  },
  {
    title: 'Университеты',
    id: 2,
  },
  {
    title: 'Требования',
    id: 3,
  },
  {
    title: 'Рецензии',
    id: 4,
  },
]

interface CountryData {
  aboutCountry: {
    bgImage: string;
    regionCode: string;
    name: string;
    description: string;
    features: {
      title: string;
      text: string;
    }[]
  },

}


const countryData: CountryData = {
  aboutCountry: {
    bgImage: '/images/countries/serbia.jpg',
    regionCode: 'RS',
    name: 'Сербия',
    description: 'Страна в юго-восточной Европе, на Балканском полуострове, столица — Белград. Это государство\n' +
      '                без выхода к морю, с разнообразным рельефом от Паннонской равнины на севере до гор на юге и западе.\n' +
      '                Сербия богата историческими памятниками и природными объектами, имеет православное большинство и\n' +
      '                национальную валюту — динар.',
    features: [
      {
        title: 'Языки',
        text: 'Сербский, Русский'
      },
      {
        title: 'Столица',
        text: 'Белград'
      },
      {
        title: 'Население',
        text: '~ 1 200 000',
      },
      {
        title: 'Валюта',
        text: 'Динар',
      }
    ]
  }
}

const Page = () => {

  return (
    <div className='mx-4 md:w-6/12 md:mx-auto py-14'>
      <Breadcrumbs/>
      <div className='flex gap-3 relative'>
        <SidebarNavigation navigationList={navigationList}/>

        <div className='w-full flex flex-col gap-6 md:ps-48 pt-12'>
          <section id='0' data-section='0'>
            <h3 className='text-xl mb-3'>О стране</h3>

            <div className='flex flex-col gap-3'>
              <div className={`bg-[url(${countryData.aboutCountry.bgImage})] bg-center h-52 rounded-2xl p-3 flex 
              flex-col justify-between`}>

                <div className='flex justify-between'>
                  <div className='flex gap-2 bg-[#F3F3F3] px-4 py-1 rounded-full w-max items-center'>
                    <span className='font-medium'>Сербия</span>
                    <Image src={`https://flagsapi.com/${countryData.aboutCountry.regionCode}/flat/64.png`}
                      className='w-auto h-[20px]' width={20} height={20} alt={'Сербия'}/>
                  </div>
                  <Button variant='secondary' className='px-2'>
                    <HugeiconsIcon icon={FavouriteIcon} />
                  </Button>
                </div>

                <div className='flex gap-4 md:ms-auto justify-between'>
                  <Button className='px-7' variant='secondary'>Уже здесь</Button>
                  <Button className='px-7'>Смотреть на карте</Button>
                </div>
              </div>

              <div>
                <h2 className='text-xl'>{countryData.aboutCountry.name}</h2>
                <p>{countryData.aboutCountry.description}</p>
              </div>

              <div className="relative grid grid-cols-2 md:grid-cols-4 text-center
              bg-secondary rounded-2xl p-3 md:px-20 items-center">

                <div className="absolute left-3 right-3 top-1/2 h-px bg-[#d0d0d0] md:hidden pointer-events-none"/>

                {countryData.aboutCountry.features.map((feature, i) => (
                  <div
                    key={i}
                    className="py-3 md:px-4 md:border-l md:border-[#d0d0d0] md:[&:nth-child(4n+2)]:border-l-0"
                  >
                    <span className="text-[#5a5a5a]">{feature.title}</span>
                    <p className="font-medium">{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id='1' data-section='1'>
            <h3 className='text-xl'>Фотографии</h3>
            
          </section>

          <section id='2' data-section='2'>
            <h3 className='text-xl'>Университеты</h3>
            <div className='p-4 mt-3 rounded-2xl bg-secondary'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                  <Image src={'/images/avatar.jpg'} width={30} height={30} alt={'Администратор'}
                    className='rounded-full border-accent border-2'/>
                  <p className='font-medium'>Администратор</p>
                </div>
                <span className='text-[#5A5A5A]'>29 ноября 2025 в 12:33</span>
              </div>
              <p className='pt-3'>
                Мне 22 года, учусь в Сербии второй год. В целом страна оказалась проще и комфортнее, чем я ожидал. Адаптация проходит спокойно: язык понятен, местные относятся нормально, бюрократия терпимая. Стоимость жизни ниже, чем в большинстве европейских стран, и это сильно помогает, когда живёшь на студенческий бюджет.
                Учёба сама по себе не сложная. Университеты здесь не топовые по мировым рейтингам, но для получения диплома и легального статуса всё работает. На английских программах учиться удобнее, но вариантов на английском меньше. Документы принимают без лишних требований, главное — грамотно подготовить пакет перед подачей.
                Из минусов — карьерные перспективы в стране ограниченные. Если хотите строить высокооплачиваемую карьеру, особенно в IT, Сербия вряд ли станет конечным пунктом. Многие, как и я, рассматривают её как удобный старт: сначала адаптироваться, получить диплом или ВНЖ, а дальше двигаться в ЕС.
                Если нужен спокойный, доступный вариант для переезда через образование, то Сербия подходит. Но рассчитывать стоит на постепенную стратегию, а не на быстрый рост внутри страны.
              </p>
              <div className='pt-2 flex justify-end gap-4'>
                <button className={'bg-white rounded-full text-[#00A81F] px-4 py-1'}>
                  Понравилось <b className='font-medium text-[#5A5A5A] ps-1'>693</b>
                </button>
                <button className={'bg-white rounded-full text-[#C6363C] px-4 py-1'}>
                  Понравилось <b className='font-medium text-[#5A5A5A] ps-1'>12</b>
                </button>
              </div>
            </div>
          </section>

          <section id='3' data-section='3'>
            <h3 className='text-xl'>Требования</h3>
            <div className='p-4 mt-3 rounded-2xl bg-secondary'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                  <Image src={'/images/avatar.jpg'} width={30} height={30} alt={'Администратор'}
                    className='rounded-full border-accent border-2'/>
                  <p className='font-medium'>Администратор</p>
                </div>
                <span className='text-[#5A5A5A]'>29 ноября 2025 в 12:33</span>
              </div>
              <p className='pt-3'>
                Мне 22 года, учусь в Сербии второй год. В целом страна оказалась проще и комфортнее, чем я ожидал. Адаптация проходит спокойно: язык понятен, местные относятся нормально, бюрократия терпимая. Стоимость жизни ниже, чем в большинстве европейских стран, и это сильно помогает, когда живёшь на студенческий бюджет.
                Учёба сама по себе не сложная. Университеты здесь не топовые по мировым рейтингам, но для получения диплома и легального статуса всё работает. На английских программах учиться удобнее, но вариантов на английском меньше. Документы принимают без лишних требований, главное — грамотно подготовить пакет перед подачей.
                Из минусов — карьерные перспективы в стране ограниченные. Если хотите строить высокооплачиваемую карьеру, особенно в IT, Сербия вряд ли станет конечным пунктом. Многие, как и я, рассматривают её как удобный старт: сначала адаптироваться, получить диплом или ВНЖ, а дальше двигаться в ЕС.
                Если нужен спокойный, доступный вариант для переезда через образование, то Сербия подходит. Но рассчитывать стоит на постепенную стратегию, а не на быстрый рост внутри страны.
              </p>
              <div className='pt-2 flex justify-end gap-4'>
                <button className={'bg-white rounded-full text-[#00A81F] px-4 py-1'}>
                  Понравилось <b className='font-medium text-[#5A5A5A] ps-1'>693</b>
                </button>
                <button className={'bg-white rounded-full text-[#C6363C] px-4 py-1'}>
                  Понравилось <b className='font-medium text-[#5A5A5A] ps-1'>12</b>
                </button>
              </div>
            </div>
          </section>s

          <section id='4' data-section='4'>
            <h3 className='text-xl'>Реценезии</h3>
            <div className='p-4 mt-3 rounded-2xl bg-secondary'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                  <Image src={'/images/avatar.jpg'} width={30} height={30} alt={'Администратор'}
                    className='rounded-full border-accent border-2'/>
                  <p className='font-medium'>Администратор</p>
                </div>
                <span className='text-[#5A5A5A]'>29 ноября 2025 в 12:33</span>
              </div>
              <p className='pt-3'>
                Мне 22 года, учусь в Сербии второй год. В целом страна оказалась проще и комфортнее, чем я ожидал. Адаптация проходит спокойно: язык понятен, местные относятся нормально, бюрократия терпимая. Стоимость жизни ниже, чем в большинстве европейских стран, и это сильно помогает, когда живёшь на студенческий бюджет.
                Учёба сама по себе не сложная. Университеты здесь не топовые по мировым рейтингам, но для получения диплома и легального статуса всё работает. На английских программах учиться удобнее, но вариантов на английском меньше. Документы принимают без лишних требований, главное — грамотно подготовить пакет перед подачей.
                Из минусов — карьерные перспективы в стране ограниченные. Если хотите строить высокооплачиваемую карьеру, особенно в IT, Сербия вряд ли станет конечным пунктом. Многие, как и я, рассматривают её как удобный старт: сначала адаптироваться, получить диплом или ВНЖ, а дальше двигаться в ЕС.
                Если нужен спокойный, доступный вариант для переезда через образование, то Сербия подходит. Но рассчитывать стоит на постепенную стратегию, а не на быстрый рост внутри страны.
              </p>
              <div className='pt-2 flex justify-end gap-4'>
                <button className={'bg-white rounded-full text-[#00A81F] px-4 py-1'}>
                  Понравилось <b className='font-medium text-[#5A5A5A] ps-1'>693</b>
                </button>
                <button className={'bg-white rounded-full text-[#C6363C] px-4 py-1'}>
                  Понравилось <b className='font-medium text-[#5A5A5A] ps-1'>12</b>
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Page;