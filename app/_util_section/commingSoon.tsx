import Link from "next/link";

export function ComingSoon() {
    return (
        <div className="w-full h-svh flex items-center justify-center">
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-5xl font-bold">Coming Soon</h1>
                <Link href="/" className="bg-primary px-8 py-4 rounded-lg text-white font-bold hover:bg-primary/80">
                    <span>Về Trang Chủ</span>
                </Link>
            </div>
        </div>
    )
}