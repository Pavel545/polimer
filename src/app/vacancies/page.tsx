import HeroPages from "@/components/section/heroPages/HeroPages";
import VacanciesContent from "@/components/section/vacancies/vacanciesContent/content";



export default function Vacancies() {
    

    return (
        <main style={{background:'var(--temnyy-1)'}}>
            <HeroPages fon='/img/vacancies/fon.jpg' title="Вакансии" h1="Построй свое будущее вместе с нами " text='Производственная компания "Полимерные технологии" набирает все большие и большие обороты, в связи с этим компании требуется расширение рабочего персонала'/>
            <VacanciesContent/>
        </main>
    )
}