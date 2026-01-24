type TimelineData = Record<string, string[]>

type VerticalTimelineProps = {
  timeline: TimelineData
}

async function getCurrentYear() {
    'use cache'
    return new Date().getFullYear();
}

export async function VerticalTimeline({ timeline }: VerticalTimelineProps) {
  const entries = Object.entries(timeline).sort(
    ([a], [b]) => Number(a) - Number(b)
  )
  const crrYear = await getCurrentYear()

  return (
    <div className="mx-auto">
      <div className="py-4">
        {entries.map(([year, events]) => (
          <div
            key={year}
            className="grid grid-cols-[5rem_2rem_1fr] gap-4"
          >
            {/* Year */}
            <div className="text-right">
              <span className="font-bold text-lg sm:text-xl text-primary">
                {year}
              </span>
            </div>

            {/* Line + Dot */}
            <div className="relative flex justify-center">
              {/* Vertical line */}
              <div className="absolute inset-y-0 w-px bg-zinc-300" />

              {/* Dot */}
              <div className="relative z-10 mt-2 w-3 h-3 rounded-full bg-primary" />
            </div>

            {/* Content */}
            <div className="space-y-1 pb-6">
              {events.map((event, index) => (
                <p
                  key={index}
                  className="leading-relaxed text-zinc-700"
                >
                  {event}
                </p>
              ))}
            </div>
          </div>
        ))}
        <div
            className="grid grid-cols-[5rem_2rem_1fr] gap-4"
          >
            {/* Year */}
            <div className="text-right">
              <span className="font-bold text-xl sm:text-2xl text-primary">
                {crrYear}
              </span>
            </div>

            {/* Line + Dot */}
            <div className="relative flex justify-center">
              {/* Vertical line */}
              <div className="absolute inset-y-0 w-px bg-zinc-300" />

              {/* Dot */}
              <div className="relative z-10 mt-2.5 w-3 h-3 rounded-full bg-primary" />
            </div>

            {/* Content */}
            <div className="pb-4">
                <p
                  className="font-bold text-xl leading-relaxed text-zinc-700"
                >
                  Hiện tại
                </p>
            </div>
          </div>
      </div>
    </div>
  )
}
