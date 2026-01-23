'use client'

interface SpecificBoldParagraphsProps {
  text: string
  boldText: string[]
}

export function SpecificBoldParagraphs({
  text,
  boldText
}: SpecificBoldParagraphsProps) {
  if (boldText.length === 0) {
    return <p>{text}</p>
  }

  // Escape special regex chars safely
  const escaped = boldText.map(str =>
    str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  )

  const regex = new RegExp(`(${escaped.join('|')})`, 'g')

  const parts = text.split(regex)

  return (
    <p>
      {parts.map((part, index) =>
        boldText.includes(part) ? (
          <strong key={index}>{part}</strong>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </p>
  )
}
