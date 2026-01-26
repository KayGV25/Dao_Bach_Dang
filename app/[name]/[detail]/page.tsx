import type { Metadata } from "next";
import {
  CONTENT_LOADERS,
  ContentKey,
  IMAGES_LOADERS,
  type ImagesKey,
} from "@/constants/registry";
import { MasonryGallery } from "@/components/mansory";
import { COMING_SOON, MANSONRY_LIST } from "@/constants/util";
import { ComingSoon } from "@/app/_util_section/commingSoon";
import { SpecificBoldParagraphs } from "@/components/atom/specificBoldParagraph";

type Props = {
  params: Promise<{ detail: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { detail } = await params;
  const content = await CONTENT_LOADERS[detail as ContentKey]();
  return {
    title: content.title,
  };
}

export default async function DetailHome({ params }: Props) {
  const { detail } = await params;
  if (COMING_SOON.includes(detail)) {
    return <ComingSoon />;
  }

  let images: string[] | null = null;
  if (MANSONRY_LIST.includes(detail)) {
    images = await IMAGES_LOADERS[detail as ImagesKey]();
  }

  const content = await CONTENT_LOADERS[detail as ContentKey]();
  const paragraphs = content.general.split("\n")

  return (
    <div className="px-14 py-8 max-w-6xl mx-auto">
      <div className="flex flex-col w-full bg-background font-sans text-black gap-8 ">
        <h1 className="text-4xl w-full font-bold">{content.title}</h1>
        <div className='flex flex-col gap-4'>
            {paragraphs.map((paragraph, index) => (
                <SpecificBoldParagraphs text={paragraph} boldText={content.boldText} key={index}/>
            ))}
            { MANSONRY_LIST.includes(detail) && images !== null && (
                <MasonryGallery images={images}/>
            )}
        </div>
      </div>
    </div>
  );
}
