import { ImageCarousel } from "@/components/atom/imageCarousel";
import { TIMELINE } from "@/constants/timeline";
import { VerticalTimeline } from "@/components/timeline";

const BG_DAO = [
  "/bg_dao_1.jpg", 
  "/bg_dao_2.jpg", 
  "/bg_dao_3.jpg", 
  "/bg_dao_4.jpg"
]

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background font-sans text-black gap-8">
      <ImageCarousel images={BG_DAO} text="Đạo Bạch Đằng" interval={5000}/>
      <section className="max-w-5xl px-4 mx-auto">
        <div className="w-full flex flex-col gap-6">
          <h1 className="text-3xl font-bold mx-auto sm:mx-0 sm:pl-5 w-fit">Lịch Sử Hình Thành</h1>
          <VerticalTimeline timeline={TIMELINE}/>
        </div>
      </section>
    </div>
  );
}