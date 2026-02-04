import { title } from "process";
import s from "./stye.module.css";

export default function Geography() {
  const okrug = [
    {
      title: "Центральный",
      name:'Центральный федеральный округ',
      rayon:[
        
      ]
    },
    {
      title: "Северо-Западный",
    },
    {
      title: "Южный",
    },
    {
      title: "Северо-Кавказский",
    },
    ,
    {
      title: "Приволжский",
    },
    {
      title: "Уральский",
    },
    {
      title: "Сибирский",
    },
    {
      title: "Дальневосточный",
    },
  ];
  return (
    <section className={s.geography}>
      <div className="container">
        <h2 className="h2">Наша география</h2>

        <div className={s.geographyContent}></div>
      </div>
    </section>
  );
}
