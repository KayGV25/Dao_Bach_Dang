export default function Loading() {
    return(
        <div className="flex flex-col min-h-screen w-full items-center justify-center gap-3 bg-background">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-loading border-t-zinc-900" />
            <p className="text-loading">Loading . . .</p>
        </div>
    )
}