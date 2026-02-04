import Image from "next/image";
import s from "./CardBlog.module.css";
import { truncateText } from "@/utils/text";

type CardBlogProps = {
  id: number;
  title: string;
  img: string;
  date: string;
  text: string;
};

export type BlogCard = {
  id: number;
  title: string;
  img: string;
  date: string;
  text: string;
};

export default function CardBlog({ title, img, date, text }: CardBlogProps) {
  return (
    <article className={s.card}>
      <div className={s.cardImg}>
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className={s.cardData}>{date}</div>

      <h3 className={s.cardTitle}>{title}</h3>

      <p className={s.cardText}>{truncateText(text, 150)}</p>
    </article>
  );
}
