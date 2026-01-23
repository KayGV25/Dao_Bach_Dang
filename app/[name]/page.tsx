import type { Metadata } from "next";

type Props = {
  params: Promise<{ name: string }>
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { name } = await params;

  return {
    title: `${name}`,
  };
}

export default async function NameHome({ params }: Props) {
  const { name } = await params;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background font-sans text-black">
      <h1>Hello {name}</h1>
    </div>
  );
}
