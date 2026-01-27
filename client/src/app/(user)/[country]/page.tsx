import {
	ArrowRight01Icon,
	FavouriteIcon,
	Location01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Button from "@/components/button";
import GalleryCarousel from "@/components/gallery-carousel/GalleryCarousel";
import SidebarNavigation from "@/components/sidebar-navigation";

const navigationList = [
	{ title: "О стране", id: 0 },
	{ title: "Фотографии", id: 1 },
	{ title: "Университеты", id: 2 },
	{ title: "Требования", id: 3 },
	{ title: "Рецензии", id: 4 },
];

export interface CountryInformation {
	countryId: string;
	languages: string[];
	capital?: string;
	population?: number;
	currencyId?: number;
}

export interface CountryRequirements {
	countryId: string;
	minimalStudentVisaAge?: number;
	educationRequirements?: string;
	nostrification?: boolean;
	financialGuarantees?: number;
}

export interface CountryData {
	id: string;
	name: string;
	countryCode: string;
	bgImage: string;
	createdAt: string;
	updatedAt: string;
	description: string;
	information: CountryInformation;
	requirements: CountryRequirements;
}

const mockdata = {
	aboutCountry: {
		bgImage: "/images/countries/serbia.jpg",
		regionCode: "RS",
		name: "Сербия",
		description:
			"Страна в юго-восточной Европе, на Балканском полуострове, столица — Белград. Это государство\n" +
			"                без выхода к морю, с разнообразным рельефом от Паннонской равнины на севере до гор на юге и западе.\n" +
			"                Сербия богата историческими памятниками и природными объектами, имеет православное большинство и\n" +
			"                национальную валюту — динар.",
		features: [
			{ title: "Языки", text: "Сербский, Русский" },
			{ title: "Столица", text: "Белград" },
			{ title: "Население", text: "~ 1 200 000" },
			{ title: "Валюта", text: "Динар" },
		],
	},
	images: [
		"/images/countries/serbia.jpg",
		"/images/countries/belarus.jpg",
		"/images/countries/germany.jpg",
		"/images/countries/hungary.png",
		"/images/countries/italy.jpg",
		"/images/countries/sweden.png",
	],
	universities: [
		{ name: "Белградский университет", city: "Белград", id: "12345" },
		{ name: "Нишский университет", city: "Ниш", id: "12344" },
		{ name: "Нови-Садский университет", city: "Новисад", id: "12245" },
		{ name: "Университет обороны в Белграде", city: "Белград", id: "12365" },
		{ name: "Юридический факультет Университета союза", id: "17345" },
		{ name: "Приштинский университет", id: "22345" },
	],
	requirements: [
		{ title: "Минимальный возраст для студенческой визы", text: "18 лет" },
		{ title: "Требования к школьному образованию", text: "11 классов" },
		{ title: "Нужна нострификация / апостиль", text: "Да" },
		{ title: "Финансовые гарантии", text: "~ 1000 €" },
	],
	reviews: [
		{
			username: "RockTINTIN21",
			totalReviews: 11,
			date: new Date(),
			avatar: "/images/avatar.jpg",
			text:
				"Мне 22 года, учусь в Сербии второй год. В целом страна оказалась проще и комфортнее, чем я ожидал. Адаптация проходит спокойно: язык понятен, местные относятся нормально, бюрократия терпимая. Стоимость жизни ниже, чем в большинстве европейских стран, и это сильно помогает, когда живёшь на студенческий бюджет.\n" +
				"Учёба сама по себе не сложная. Университеты здесь не топовые по мировым рейтингам, но для получения диплома и легального статуса всё работает. На английских программах учиться удобнее, но вариантов на английском меньше. Документы принимают без лишних требований, главное — грамотно подготовить пакет перед подачей.\n" +
				"Из минусов — карьерные перспективы в стране ограниченные. Если хотите строить высокооплачиваемую карьеру, особенно в IT, Сербия вряд ли станет конечным пунктом. Многие, как и я, рассматривают её как удобный старт: сначала адаптироваться, получить диплом или ВНЖ, а дальше двигаться в ЕС.\n" +
				"Если нужен спокойный, доступный вариант для переезда через образование, то Сербия подходит. Но рассчитывать стоит на постепенную стратегию, а не на быстрый рост внутри страны.",
			recommended: 14,
			unrecommended: 4,
		},
	],
};

interface PageProps {
	params: Promise<{
		country: string;
	}>;
}

const Page = async ({ params }: PageProps) => {
	const getData = async () => {
		const res = await fetch(`http://localhost:3000/api/countries/${country}`);
		return await res.json();
	};

	const { country } = await params;
	const countryData: CountryData = await getData();
	console.log("DATA:", countryData);

	const metadata: Metadata = {
		title: countryData.name,
	};

	return (
		<div className="mx-4 md:w-[960px] md:mx-auto py-14 mt-4">
			<Breadcrumbs />
			<div className="flex gap-3 flex-col md:flex-row relative">
				<SidebarNavigation navigationList={navigationList} />

				<div className="md:w-[80%] flex flex-col gap-6">
					<section id="0" data-section="0">
						<h3 className="text-xl mb-3 underline">О стране</h3>

						<div className="flex flex-col gap-3">
							<div
								className={`bg-center h-52 rounded-2xl p-3 flex 
              flex-col justify-between`}
								style={{
									backgroundImage: `url(${countryData.bgImage})`,
								}}
							>
								<div className="flex justify-between">
									<div className="flex gap-2 bg-[#F3F3F3] px-4 py-1 rounded-full w-max items-center">
										<span className="font-medium">{countryData.name}</span>
										<Image
											src={`https://flagsapi.com/${countryData.countryCode}/flat/64.png`}
											className="w-auto h-[20px]"
											width={20}
											height={20}
											alt={"Сербия"}
										/>
									</div>
									<Button variant="secondary" className="px-2">
										<HugeiconsIcon icon={FavouriteIcon} />
									</Button>
								</div>

								<div className="flex gap-4 md:ms-auto justify-between">
									<Button className="px-7" variant="secondary">
										Уже здесь
									</Button>
									<Button className="px-7">Смотреть на карте</Button>
								</div>
							</div>

							<div>
								<h2 className="text-xl !mb-0">{countryData.name}</h2>
								<p>{countryData.description}</p>
							</div>

							<div
								className="relative grid grid-cols-2 md:grid-cols-4 text-center
              bg-secondary rounded-2xl p-3 md:px-20 items-center"
							>
								<div className="absolute left-3 right-3 top-1/2 h-px bg-[#d0d0d0] md:hidden pointer-events-none" />

								{/*{countryData.features.map((feature, i) => (*/}
								{/*  <div*/}
								{/*    key={i}*/}
								{/*    className="py-3 md:px-4 md:border-l md:border-[#d0d0d0] md:[&:nth-child(4n+2)]:border-l-0"*/}
								{/*  >*/}
								{/*    <span className="text-[#5a5a5a]">{feature.title}</span>*/}
								{/*    <p className="font-medium">{feature.text}</p>*/}
								{/*  </div>*/}
								{/*))}*/}
								<div className="py-3 md:px-4 md:border-l md:border-[#d0d0d0] md:[&:nth-child(4n+2)]:border-l-0">
									<span className="text-[#5a5a5a]">Языки</span>
									<p className="font-medium">
										{countryData.information.languages}
									</p>
								</div>
								<div className="py-3 md:px-4 md:border-l md:border-[#d0d0d0] md:[&:nth-child(4n+2)]:border-l-0">
									<span className="text-[#5a5a5a]">Столица</span>
									<p className="font-medium">
										{countryData.information.capital}
									</p>
								</div>
								<div className="py-3 md:px-4 md:border-l md:border-[#d0d0d0] md:[&:nth-child(4n+2)]:border-l-0">
									<span className="text-[#5a5a5a]">Население</span>
									<p className="font-medium">
										{countryData.information.population?.toLocaleString(
											"ru-RU",
										)}
									</p>
								</div>
								<div className="py-3 md:px-4 md:border-l md:border-[#d0d0d0] md:[&:nth-child(4n+2)]:border-l-0">
									<span className="text-[#5a5a5a]">Валюта</span>
									<p className="font-medium">
										{countryData.information.currencyId}
									</p>
								</div>
							</div>
						</div>
					</section>

					<section id="1" data-section="1">
						<h3 className="text-xl underline">Фотографии</h3>
						<GalleryCarousel images={mockdata.images} />
					</section>

					<section id="2" data-section="2">
						<h3 className="text-xl underline">
							Университеты - {mockdata.universities.length}
						</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
							{mockdata.universities.map((university, i) => (
								<Link
									href={`${country}/${university.id}`}
									className="bg-secondary py-3 px-5 rounded-2xl flex flex-col gap-1 justify-between text-[#5A5A5A]
                  hover:outline-1 hover:outline-accent hover:bg-white hover:text-black transition duration-100
                  ease-in-out relative group active:outline-accent active:bg-white active:text-black active:outline-1"
									key={i}
								>
									<p className="font-medium leading-5">{university.name}</p>
									{!!university.city && (
										<div className="flex gap-1">
											<HugeiconsIcon width={15} icon={Location01Icon} />
											<span>{university.city}</span>
										</div>
									)}
									<HugeiconsIcon
										className="absolute right-4 top-1/2 -translate-y-1/2
                     opacity-0 translate-x-2
                     group-hover:opacity-100 group-hover:translate-x-0
                     transition-all duration-150
                     group-active:opacity-100 group-active:translate-x-0
                     "
										width={30}
										icon={ArrowRight01Icon}
									/>
								</Link>
							))}
						</div>
					</section>

					<section id="3" data-section="3">
						<h3 className="text-xl underline">Требования</h3>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
							{/*{countryData.requirements.map((requirement, i) => (*/}
							{/*  <div*/}
							{/*    className="bg-secondary rounded-2xl flex flex-col justify-between gap-2 p-3 text-center"*/}
							{/*    key={i}*/}
							{/*  >*/}
							{/*    <span className="text-[#5a5a5a] leading-5">*/}
							{/*      {requirement.title}*/}
							{/*    </span>*/}
							{/*    <p className="font-medium text-lg">{requirement.text}</p>*/}
							{/*  </div>*/}
							{/*))}*/}

							<div className="bg-secondary rounded-2xl flex flex-col justify-between gap-2 p-3 text-center">
								<span className="text-[#5a5a5a] leading-5">
									Минимальный возраст для студенческой визы
								</span>
								<p className="font-medium text-lg">
									{countryData.requirements.minimalStudentVisaAge}
								</p>
							</div>
							<div className="bg-secondary rounded-2xl flex flex-col justify-between gap-2 p-3 text-center">
								<span className="text-[#5a5a5a] leading-5">
									Требования к школьному образованию
								</span>
								<p className="font-medium text-lg">
									{countryData.requirements.educationRequirements}
								</p>
							</div>
							<div className="bg-secondary rounded-2xl flex flex-col justify-between gap-2 p-3 text-center">
								<span className="text-[#5a5a5a] leading-5">
									Нужна нострификация / апостиль
								</span>
								<p className="font-medium text-lg">
									{countryData.requirements.nostrification}
								</p>
							</div>
							<div className="bg-secondary rounded-2xl flex flex-col justify-between gap-2 p-3 text-center">
								<span className="text-[#5a5a5a] leading-5">
									Финансовые гарантии
								</span>
								<p className="font-medium text-lg">
									{countryData.requirements.financialGuarantees}
								</p>
							</div>
						</div>
					</section>

					<section id="4" data-section="4">
						<h3 className="text-xl underline">Рецензии</h3>
						{mockdata.reviews.map((review, i) => (
							<div className="p-5 mt-3 rounded-2xl bg-secondary" key={i}>
								<div className="flex justify-between items-center">
									<div>
										<div className="flex items-center gap-2 pb-1">
											<Image
												src={review.avatar}
												width={30}
												height={30}
												alt={"Администратор"}
												className="rounded-full border-accent border-2"
											/>
											<p className="font-medium">{review.username}</p>
										</div>
										{!!review.totalReviews && (
											<span className="text-[#5A5A5A]">
												{review.totalReviews} рецензий
											</span>
										)}
									</div>

									<span className="text-[#5A5A5A]">29 ноября 2025 в 12:33</span>
								</div>
								<p className="pt-3">{review.text}</p>
								<div className="pt-2 flex justify-end gap-4">
									<button
										className={"bg-white rounded-full text-[#00A81F] px-4 py-1"}
									>
										Понравилось{" "}
										<b className="font-medium text-[#5A5A5A] ps-1">
											{review.recommended}
										</b>
									</button>
									<button
										className={"bg-white rounded-full text-[#C6363C] px-4 py-1"}
									>
										Понравилось{" "}
										<b className="font-medium text-[#5A5A5A] ps-1">
											{review.unrecommended}
										</b>
									</button>
								</div>
							</div>
						))}
					</section>
				</div>
			</div>
		</div>
	);
};

export default Page;
