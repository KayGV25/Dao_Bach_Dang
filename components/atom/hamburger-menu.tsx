'use client'

import type { KeyboardEvent } from 'react';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

export function HamburgerMenu({ isOpen, onToggle }: Props) {
  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  }

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className="flex flex-col justify-center items-center gap-1 p-2 cursor-pointer"
    >
      <span className={`block w-6 h-0.5 bg-background transition ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
      <span className={`block w-6 h-0.5 bg-background transition ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`block w-6 h-0.5 bg-background transition ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
    </button>
  );
}
