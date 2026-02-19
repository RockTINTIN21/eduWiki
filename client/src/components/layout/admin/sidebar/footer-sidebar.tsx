"use client";

import {
	Logout05Icon,
	Notification01Icon,
	UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { slice } from "@/features/auth/model/slice";
import { API_UPLOADS_URL, apiGuardFetch } from "@/lib/api/api";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";

const FooterSidebar = () => {
	const user = useAppSelector((state) => state[slice.name].user);
	const dispatch = useAppDispatch();
	const { isMobile } = useSidebar();
	const router = useRouter();

	const logout = async () => {
		await apiGuardFetch("/auth/logout", {
			method: "POST",
		});

		dispatch(slice.actions.logout());

    router.replace("/");
	};

	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							{user ? (
								<SidebarMenuButton>
									<Avatar className="w-8 h-8 text-white">
										<AvatarImage
											src={`${API_UPLOADS_URL}/${user.avatarUrl}`}
											alt={user.username}
										/>
										<AvatarFallback>
											{user.username[0] + user.username[1]}
										</AvatarFallback>
									</Avatar>

									<div className="flex flex-col leading-4">
										<p className="font-medium">{user.username}</p>
										<span className="text-muted-foreground">{user.email}</span>
									</div>

									<EllipsisVertical className="ml-auto" />
								</SidebarMenuButton>
							) : (
								<div className="flex items-center gap-4">
									<Skeleton className="h-8 w-8 rounded-full" />
									<div className="space-y-2">
										<Skeleton className="h-2 w-32" />
										<Skeleton className="h-2 w-28" />
									</div>
								</div>
							)}
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
							side={isMobile ? "bottom" : "right"}
							align="end"
							sideOffset={4}
						>
							{user && (
								<>
									<DropdownMenuLabel className="p-0 font-normal">
										<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
											<Avatar className="w-8 h-8 text-white">
												<AvatarImage
													src={`${API_UPLOADS_URL}/${user.avatarUrl}`}
													alt={user.username}
												/>
												<AvatarFallback>
													{user.username[0] + user.username[1]}
												</AvatarFallback>
											</Avatar>

											<div className="flex flex-col leading-4">
												<p className="font-medium">{user.username}</p>
												<span className="text-muted-foreground">
													{user.email}
												</span>
											</div>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<HugeiconsIcon icon={UserIcon} />
											Аккаунт
										</DropdownMenuItem>
										<DropdownMenuItem>
											<HugeiconsIcon icon={Notification01Icon} />
											Уведомления
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => logout()}>
										<HugeiconsIcon icon={Logout05Icon} />
										Выйти
									</DropdownMenuItem>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
};

export default FooterSidebar;
