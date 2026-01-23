import { ImageCarousel } from "@/components/atom/imageCarousel";

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
    </div>
  );
}