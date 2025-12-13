import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import SidebarNavigation from "@/components/SidebarNavigation/SidebarNavigation";

const navigationList = [
  {
    title: 'О стране',
    id: 'aboutCountry'
  },
  {
    title: 'Фотографии',
    id: 'images'
  },
  {
    title: 'Университеты',
    id: 'universities'
  },
  {
    title: 'Требования',
    id: 'requirements'
  },
  {
    title: 'Рецензии',
    id: 'reviews'
  },
]

const Page = () => {

  return (
    <div className='mx-4 md:w-6/12 md:mx-auto py-20'>
      <Breadcrumbs/>
      <div className='flex gap-3'>
        <SidebarNavigation navigationList={navigationList}/>

        <div className='w-full flex flex-col gap-6 ps-48'>
          <section id='aboutCountry' data-section='aboutCountry'>
            <h3 className='text-xl'>О стране</h3>
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

          <section id='images' data-section='images'>
            <h3 className='text-xl'>Фотографии</h3>
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

          <section id='universities' data-section='universities'>
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

          <section id='requirements' data-section='requirements'>
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

          <section id='reviews' data-section='reviews'>
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

        </div>
      </div>
    </div>
  );
};

export default Page;