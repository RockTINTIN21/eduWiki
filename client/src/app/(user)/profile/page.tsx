import {Button} from "@/components/ui/button";
import {apiGuardFetch} from "@/lib/api";
import {useAppDispatch, useAppSelector} from "@/lib/store/store";
import {authSlice} from "@/lib/store/auth/auth.slice";
import LogoutButton from "@/app/(user)/profile/LogoutButton";

const Page = () => {

  return (
    <div className="pt-20">
      <h1>test</h1>
      <LogoutButton/>
    </div>
  );
};

export default Page;