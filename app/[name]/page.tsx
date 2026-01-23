import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { CONTENT_LOADERS, type ContentKey } from '@/constants/registry'
import { SpecificBoldParagraphs } from '@/components/atom/specificBoldParagraph'

type Props = {
  params: Promise<{ name: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { name } = await params

  if (!(name in CONTENT_LOADERS)) {
    return {
      title: 'Trang không tồn tại',
    }
  }

  const content = await CONTENT_LOADERS[name as ContentKey]()

  return {
    title: content.title,
  }
}

export default async function NameHome({ params }: Props) {
  const { name } = await params

  if (!(name in CONTENT_LOADERS)) {
    redirect('/')
  }

  const content = await CONTENT_LOADERS[name as ContentKey]()
  const paragraphs = content.general.split("\n")

  return (
    <div className="flex flex-col w-full bg-background font-sans text-black gap-8">
      <h1 className="text-4xl w-full font-bold">{content.title}</h1>
      <div className='flex flex-col gap-4'>
        {paragraphs.map((paragraph, index) => (
          <SpecificBoldParagraphs text={paragraph} boldText={content.boldText} key={index}/>
        ))}
      </div>
    </div>
  )
}
