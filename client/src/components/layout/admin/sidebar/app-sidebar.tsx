import {Calendar, Home, Inbox, Search, Settings, Users} from "lucide-react";
import FooterSidebar from "@/components/layout/admin/sidebar/footer-sidebar";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
	{
		title: "Главная",
		url: "dashboard",
		icon: Home,
	},
];

const administrationItems = [
	{
		title: "Страны",
		url: "#",
		icon: Inbox,
	},
	{
		title: "Университеты",
		url: "#",
		icon: Calendar,
	},
	{
		title: "Программы",
		url: "#",
		icon: Search,
	},
	{
		title: "Пользователи",
		url: "users",
		icon: Users,
	},
	{
		title: "Тикеты",
		url: "#",
		icon: Settings,
	},
];

const statisticsItems = [
	{
		title: "Статистика",
		url: "#",
		icon: Inbox,
	},
];

export function AppSidebar() {
	return (
		<Sidebar className="border-none p-3" variant="inset">
			<SidebarHeader className='flex items-center gap-3 flex-row text-primary w-full '>
        <h3 className="font-medium text-xl !mb-1">EduWiki</h3>
        <span
          className={`border-s ps-2 text-sm leading-4 border-l-primary`}
        >
						Учись
						<br />
						глобально
					</span>
      </SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>

					<SidebarGroupLabel>Администрирование</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{administrationItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>

					<SidebarGroupLabel>Статистика</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{statisticsItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<FooterSidebar />
		</Sidebar>
	);
}
