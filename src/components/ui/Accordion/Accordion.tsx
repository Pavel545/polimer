'use client';
import { use, useState } from 'react';
import s from './accordion.module.scss';

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface Props {
  items: AccordionItem[];
  defaultOpenIndex?: number;
}

export default function Accordion({ items, defaultOpenIndex }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex ?? null
  );

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className={s.accordion}>
      {items.map((item, i) => (
        <div key={i} className={s.item}>
          <button
            className={`${s.header} ${openIndex === i ? s.active : ''}`}
            onClick={() => toggle(i)}
          >
            <span>{item.title}</span>
            <span className={`${s.icon} ${openIndex === i ? s.open : ''}`}>
              +
            </span>
          </button>

          <div
            className={`${s.content} ${
              openIndex === i ? s.active : ''
            }`}
          >
            <div className={s.inner}>{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}