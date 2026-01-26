import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import SidebarNavigation from "@/components/SidebarNavigation/SidebarNavigation";
import Tabs from "@/components/Tabs/Tabs";

const navigationList = [
	{ title: "О программе", id: 0 },
	{ title: "Требования", id: 1 },
	{ title: "Рецензии", id: 2 },
];

interface ProgramData {
	aboutProgram: {
		name: string;
		description: string;
	};
	requirements: {
		id: string;
		language: string;
		requirements: {
			title: string;
			text: string | string[];
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

const data: ProgramData = {
	aboutProgram: {
		name: "Белградский университет",
		description:
			"Университет был основан в 1808 году как Белградская высшая школа. 27 февраля 1905 года королевским указом был преобразован в университет. Интенсивный рост университета наблюдался после Второй мировой войны.\n" +
			"В 1990-е годы университет (как студенты, так и преподаватели) был одним из центров оппозиции Слободану Милошевичу. После «бульдозерной революции» университет получил бо́льшую автономию, а также начал присоединение к Болонскому процессу.",
	},
	requirements: [
		{
			id: "0",
			language: "Сербский",
			requirements: [
				{ title: "Стоимость", text: "2000 € в год" },
				{ title: "Уровень языка", text: "B1" },
				{ title: "Дополнительные экзамены", text: ["Математика"] },
				{ title: "Математика", text: "До 28 декабря" },
				{ title: "Обязательное собеседование", text: "Да" },
				{ title: "Творческое задание", text: "Нет" },
			],
		},
		{
			id: "1",
			language: "Английский",
			requirements: [
				{ title: "Стоимость", text: "2000 € в год" },
				{ title: "Уровень языка", text: "B1" },
				{ title: "Дополнительные экзамены", text: ["Математика"] },
				{ title: "Математика", text: "До 28 декабря" },
				{ title: "Обязательное собеседование", text: "Да" },
				{ title: "Творческое задание", text: "Нет" },
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
	title: data.aboutProgram.name,
};

const Page = () => {
	return (
		<div className="mx-4 md:w-[960px] md:mx-auto py-14 mt-4">
			<Breadcrumbs />
			<div className="flex gap-3 flex-col md:flex-row relative">
				<SidebarNavigation navigationList={navigationList} />

				<div className="md:w-[80%] flex flex-col gap-6">
					<section id="0" data-section="0">
						<h3 className="text-xl mb-3 underline">О программе</h3>
						<div>
							<h2 className="text-xl !mb-0">{data.aboutProgram.name}</h2>
							<p>{data.aboutProgram.description}</p>
						</div>
					</section>

					<section id="1" data-section="1">
						<h3 className="text-xl underline">Требования</h3>

						<Tabs
							items={data.requirements.map((requirement) => ({
								label: requirement.language,
								key: requirement.id,
								children: requirement.requirements.map((item, index) => (
									<div
										className="bg-secondary rounded-2xl flex flex-col md:flex-row justify-between md:justify-start gap-2 p-4"
										key={index}
									>
										<span className="text-[#5a5a5a] leading-5 md:w-1/2">
											{item.title}
										</span>
										{Array.isArray(item.text) ? (
											<div className="flex gap-2 flex-wrap md:w-1/2">
												{item.text.map((item, i) => (
													<p
														key={i}
														className="text-md border-black border-[1px] rounded-md px-2"
													>
														{item}
													</p>
												))}
											</div>
										) : (
											<p className="font-medium text-md md:1/2">{item.text}</p>
										)}
									</div>
								)),
							}))}
						/>
					</section>

					<section id="2" data-section="2">
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
