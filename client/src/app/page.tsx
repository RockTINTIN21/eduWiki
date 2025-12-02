import Image from "next/image";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className=" text-white">
      <div className="relative pt-52">
        <div className="absolute inset-0 bg-[url(/promo/earth.jpg)] bg-cover bg-center opacity-30" />
        <div className='bg-gray-700 opacity-30'><h1>test</h1></div>
        <div className="relative p-5 flex gap-3 flex-col md:me-80 md:ms-80 ps-4 pe-4">
          <h1 className="text-4xl font-medium w-1/2 pb-20">
            Все, что стоит делать, стоит делать за границей своих привычных горизонтов.
          </h1>
          <span>Жюль Верн</span>
          <Button className="w-max">О проекте</Button>
        </div>
      </div>

      {/*<Button variant=>О проекте</Button>*/}
    </div>
  );
}
