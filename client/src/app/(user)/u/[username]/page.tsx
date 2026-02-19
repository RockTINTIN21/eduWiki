import { CircleAlert } from "lucide-react";
import { toast } from "sonner";
import ProfileReviewCardHeader from "@/components/ui/review-card/profile-review-card-header";
import ReviewCard from "@/components/ui/review-card/review-card";
import type { ProfileResponse } from "@/features/profile/model/profile.responses";
import UserCard from "@/features/profile/ui/user-card";
import { type ApiNewError, apiNewFetch } from "@/lib/api/api";
import { PUBLIC_ENDPOINTS } from "@/lib/api/endpoints/public.endpoints";
import { Code, errorMessages } from "@/lib/api/error-messages";

const Page = async ({ params }: { params: { username: string } }) => {
	// const user = await apiFetch<{username: string}>(
	//   `${PUBLIC_ENDPOINTS.profile}/${params.username}`
	// );

	const searchParams = await params;

	let data;

	try {
		data = await apiNewFetch<ProfileResponse>(
			`${PUBLIC_ENDPOINTS.publicProfile}/${searchParams.username}`,
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
    <div className="md:w-[960px] md:mx-auto pt-20 h-screen">
      {data ? (
        <div className='space-y-6'>
          <UserCard avatarUrl={data.user.avatarUrl}
                    stats={{countReviews: data.reviews.length, countNeutral: 0, countPositives: 0, countNegatives: 0}}
                    username={data.user.username}
          />
          <h1 className='text-3xl'>Рецензии</h1>
          {data.reviews ? data.reviews.map((review) => (
            <ReviewCard
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
          )): <p>Рецензии отсутствуют</p>}


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
