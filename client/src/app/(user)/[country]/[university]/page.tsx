import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Accordion from "@/components/ui/accordion";

import GalleryCarousel from "@/components/ui/gallery-carousel/GalleryCarousel";
import SidebarNavigation from "@/components/ui/sidebar-navigation";
import Tabs from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";

const navigationList = [
	{ title: "О университете", id: 0 },
	{ title: "Фотографии", id: 1 },
	{ title: "Требования", id: 2 },
	{ title: "Направления", id: 3 },
	{ title: "Рецензии", id: 4 },
];

interface UniversityData {
	aboutUniversity: {
		bgImage: string;
		regionCode: string;
		name: string;
		description: string;
		features: {
			title: string;
			text: string;
		}[];
	};
	images: string[];
	requirements: {
		title: string;
		text: string | string[];
	}[];
	programs: {
		title: string;
		id: string;
		programs: {
			name: string;
			id: string;
		}[];
	}[];
	reviews: {
		username: string;
		avatar: string;
		date: Date;
		totalReviews: number;
		text: string;
		recommended: number;
		unrecommended: number;
	}[];
}

const data: UniversityData = {
	aboutUniversity: {
		bgImage: "/images/countries/belgrade.jpg",
		regionCode: "RS",
		name: "Белградский университет",
		description:
			"Университет был основан в 1808 году как Белградская высшая школа. 27 февраля 1905 года королевским указом был преобразован в университет. Интенсивный рост университета наблюдался после Второй мировой войны.\n" +
			"В 1990-е годы университет (как студенты, так и преподаватели) был одним из центров оппозиции Слободану Милошевичу. После «бульдозерной революции» университет получил бо́льшую автономию, а также начал присоединение к Болонскому процессу.",
		features: [
			{ title: "Место в мире", text: "387" },
			{ title: "Город", text: "Белград" },
			{ title: "Кол-во студентов", text: "90 000" },
			{ title: "Год основания", text: "1808 г." },
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
	requirements: [
		{ title: "Базовый уровень языка", text: "B1" },
		{ title: "Минимальный возраст для студенческой визы", text: "18 лет" },
		{
			title: "Документы для поступления",
			text: [
				"Аттестат 9/11 классов",
				"Паспорт",
				"Диплом",
				"Медицинская справка",
				"Рекомендательное письмо",
			],
		},
		{ title: "Сроки подачи документов", text: "До 28 декабря" },
		{
			title: "Обязательность страховки / финансовой гарантии",
			text: "От 2000 €",
		},
	],
	programs: [
		{
			title: "Информатика и IT",
			id: "1234",
			programs: [
				{ name: "Buisness and Management", id: "14145" },
				{ name: "Buisness and Management", id: "14140" },
			],
		},
		{
			title: "Информатика и IT",
			id: "1232",
			programs: [
				{ name: "Buisness and Management", id: "14144" },
				{ name: "Buisness and Management", id: "14147" },
			],
		},
		{
			title: "Информатика и IT",
			id: "1233",
			programs: [
				{ name: "Buisness and Management", id: "14143" },
				{ name: "Buisness and Management", id: "14142" },
			],
		},
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

export const metadata: Metadata = {
	title: data.aboutUniversity.name,
};

interface PageProps {
	params: Promise<{
		country: string;
		university: string;
	}>;
}

const Page = async ({ params }: PageProps) => {
	const { country, university } = await params;

	return (
		<div className="mx-4 md:w-[960px] md:mx-auto py-14 mt-4">

			<div className="flex gap-3 flex-col md:flex-row relative">
				<SidebarNavigation navigationList={navigationList} />

				<div className="md:w-[80%] flex flex-col gap-6">
					<section id="0" data-section="0">
						<h3 className="text-xl mb-3 underline">О университете</h3>

						<div className="flex flex-col gap-3">
							<div
								className={`bg-center h-52 rounded-2xl p-3 flex 
              flex-col justify-between`}
								style={{
									backgroundImage: `url(${data.aboutUniversity.bgImage})`,
								}}
							>
								<div className="flex justify-between">
									<div className="flex gap-2 bg-[#F3F3F3] px-4 py-1 rounded-full w-max items-center">
										<span className="font-medium">
											{data.aboutUniversity.name}
										</span>
										<Image
											src={`https://flagsapi.com/${data.aboutUniversity.regionCode}/flat/64.png`}
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

								<div className="flex gap-4 ms-auto">
									<Button className="px-7" variant="secondary">
										Учусь здесь
									</Button>
								</div>
							</div>

							<div>
								<h2 className="text-xl !mb-0">{data.aboutUniversity.name}</h2>
								<p>{data.aboutUniversity.description}</p>
							</div>

							<div
								className="relative grid grid-cols-2 md:grid-cols-4 text-center
              bg-secondary rounded-2xl p-3 md:px-20 items-center"
							>
								<div className="absolute left-3 right-3 top-1/2 h-px bg-[#d0d0d0] md:hidden pointer-events-none" />

								{data.aboutUniversity.features.map((feature, i) => (
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

					<section id="1" data-section="1">
						<h3 className="text-xl underline">Фотографии</h3>
						<GalleryCarousel images={data.images} />
					</section>

					<section id="2" data-section="2">
						<h3 className="text-xl underline">Требования</h3>

						<div className="flex flex-col gap-3">
							{data.requirements.map((requirement, i) => (
								<div
									className="bg-secondary rounded-2xl flex flex-col md:flex-row justify-between md:justify-start gap-2 p-4"
									key={i}
								>
									<span className="text-[#5a5a5a] leading-5 md:w-1/2">
										{requirement.title}
									</span>
									{Array.isArray(requirement.text) ? (
										<div className="flex gap-2 flex-wrap md:w-1/2">
											{requirement.text.map((item, i) => (
												<p
													key={i}
													className="text-md border-black border-[1px] rounded-md px-2"
												>
													{item}
												</p>
											))}
										</div>
									) : (
										<p className="font-medium text-md md:1/2">
											{requirement.text}
										</p>
									)}
								</div>
							))}
						</div>
					</section>

					<section id="3" data-section="3">
						<h3 className="text-xl underline">Программы и направления</h3>

						<Tabs
							items={[
								{
									key: "1",
									label: "Бакалавр",
									children: (
										<Accordion
											key={data.programs[0].id}
											tabs={[
												{
													title: data.programs[0].title,
													key: "test",
													children: (
														<div className="flex gap-2 flex-wrap">
															{data.programs[0].programs.map((program) => (
																<Link
																	href={`/${country}/${university}/${program.id}`}
																	className="bg-secondary rounded-full px-4 py-2 mt-3 text-[#5a5a5a] hover:bg-accent
                                transition duration-100 hover: hover:text-white"
																	key={program.id}
																>
																	{program.name}
																</Link>
															))}
														</div>
													),
												},
											]}
										/>
									),
								},
								{
									key: "2",
									label: "Магистратура",
									children: (
										<Accordion
											key={data.programs[1].id}
											tabs={[
												{
													title: data.programs[1].title,
													key: "test",
													children: (
														<div className="flex gap-2 flex-wrap">
															{data.programs[1].programs.map((program) => (
																<Link
																	href={`/${country}/${university}/${program.id}`}
																	className="bg-secondary rounded-full px-4 py-2 mt-3 text-[#5a5a5a] hover:bg-accent
                                transition duration-100 hover: hover:text-white"
																	key={program.id}
																>
																	{program.name}
																</Link>
															))}
														</div>
													),
												},
											]}
										/>
									),
								},
								{
									key: "3",
									label: "Докторантура",
									children: (
										<Accordion
											key={data.programs[2].id}
											tabs={[
												{
													title: data.programs[2].title,
													key: "test",
													children: (
														<div className="flex gap-2 flex-wrap">
															{data.programs[2].programs.map((program) => (
																<Link
																	href={`/${country}/${university}/${program.id}`}
																	className="bg-secondary rounded-full px-4 py-2 mt-3 text-[#5a5a5a] hover:bg-accent
                                transition duration-100 hover: hover:text-white"
																	key={program.id}
																>
																	{program.name}
																</Link>
															))}
														</div>
													),
												},
											]}
										/>
									),
								},
							]}
						/>
					</section>

					<section id="4" data-section="4">
						<h3 className="text-xl underline">Рецензии</h3>
						{data.reviews.map((review, i) => (
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
