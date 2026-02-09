import PsLine from '@/components/ui/psLine/psLine';
import s from './style.module.css';
import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs';

type HeroPages = {
    title: string;
    h1: string;
    text?: string;
    fon:string;
}

export default function HeroPages({ title, h1, text, fon }: HeroPages) {


    return (
        <section style={{background: `url(${fon}) center / cover no-repeat`}} className={s.HeroPages}>
            <PsLine />
            <BreadCrumbs items={[{ title: title }]} />
            <div className={"container " + s.HeroPagesText}>
                <div className={s.HeroPagesContent}>
                    <h1 className="h1">{h1}</h1>
                    <p className={s.HeroPagesContentText}>
                        {text}
                    </p>
                </div>
            </div>
        </section>
    )
}