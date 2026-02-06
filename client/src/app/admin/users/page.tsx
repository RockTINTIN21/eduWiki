import { DataTable } from "@/features/users-table/ui/data-table";


const Page = () => {

	// const users = await apiGuardFetch<User[]>('/users')
	//   .catch(() => {
	//     return []
	//   });

	return (
		<div>
			<DataTable />
		</div>
	);
};

export default Page;
