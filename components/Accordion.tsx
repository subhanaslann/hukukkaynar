'use client';

import { useId, useState } from 'react';

export default function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <dl className="space-y-3">
      {items.map((it) => (
        <Item key={it.question} q={it.question} a={it.answer} />
      ))}
    </dl>
  );
}

function Item({ q, a }: { q: string; a: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-primary-100 bg-white shadow-sm">
      <dt>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-base font-semibold text-primary-900 hover:bg-primary-50"
        >
          <span>{q}</span>
          <span className="text-primary-500">{open ? '−' : '+'}</span>
        </button>
      </dt>
      <dd
        id={`${id}-panel`}
        role="region"
        hidden={!open}
        className="px-4 pb-4 text-sm leading-relaxed text-primary-700"
      >
        {a}
      </dd>
    </div>
  );
}
