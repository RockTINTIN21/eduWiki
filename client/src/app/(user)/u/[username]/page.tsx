

import { CircleAlert } from "lucide-react";
import { toast } from "sonner";
import ProfileReviewCardHeader from "@/components/ui/review-card/profile-review-card-header";
import ReviewCard from "@/components/ui/review-card/review-card";
import type { ProfileResponse } from "@/features/profile/model/profile.responses";
import UserCard from "@/features/profile/ui/user-card";
import {type ApiNewError, apiNewFetch} from "@/lib/api/api";
import { PUBLIC_ENDPOINTS } from "@/lib/api/endpoints/public.endpoints";
import { Code, errorMessages } from "@/lib/api/error-messages";
import {cookies} from "next/headers";


const Page = async ({ params }: { params: { username: string } }) => {
  const searchParams = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value; // Получить конкретную куку

	let data: ProfileResponse | undefined;

	try {
		data = await apiNewFetch<ProfileResponse>(
			`${PUBLIC_ENDPOINTS.publicProfile}/${searchParams.username}`,
      {headers: {'Cookie': `access_token=${token}`}}
		);
		console.log("data", data);
	} catch (error) {
		const err = error as ApiNewError;
		if (err.code === Code.UNKNOWN_ERROR) {
			toast.error(errorMessages[err.code], { position: "top-center" });
		}
		console.error(err.message);
	}

	return (
    <div className="md:w-[960px] md:mx-auto pt-20 px-4 lg:px-0 h-screen">
      {data ? (
        <div className='space-y-6'>
          <UserCard
            isOwnProfile={data.user.isOwner}
            avatarUrl={data.user.avatarUrl}
                    stats={data.user.stats}
                    username={data.user.username}
          />

          <div>
            <h1 className='text-3xl'>Рецензии</h1>
            <div className='space-y-4 pt-2'>
              {data.reviews.length ? data.reviews.map((review) => (
                <ReviewCard
                  isOwnCard={data.user.isOwner}
                  id={review.id}
                  type={review.type}
                  createdAt={review.createdAt}
                  dislikes={review.dislikes}
                  text={review.text}
                  likes={review.likes}
                  key={review.id}
                >
                  <ProfileReviewCardHeader country={review.country} university={review.university} />
                </ReviewCard>
              )): <p>Рецензии отсутствуют</p>
              }
            </div>

          </div>
        </div>
      ) :
        <div className='text-center flex flex-col items-center pt-48'>
          <CircleAlert size={60} strokeWidth={1} />
          <h1 className='text-4xl'>Этого аккаунта не существует</h1>
          <p>Попробуйте найти; кого - то; другого.</p>
        </div>
      }
    </div>
  )
}

export default Page;
