import BlogList from "@/components/section/blogPage/BlogList";
import HeroPages from "@/components/section/heroPages/HeroPages";



export default function BlogPage() {
    

    return (
        <main>
            <HeroPages fon='/img/blog/fon.jpg' title='Блог' h1="наши последние разработки" text="Избранные статьи об полимерных технологиях, данных, автоматизации, стратегиях и проверенных результатах. Советы, тенденции и новости компании"/>
            <BlogList/>
        </main>
    )
}