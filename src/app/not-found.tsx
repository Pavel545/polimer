// app/not-found.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '404 - Страница не найдена',
    description: 'Запрашиваемая страница не существует на нашем сайте',
    robots: {
        index: false,
        follow: true,
    },
};

export default function NotFound() {
    return (
        <section className='erPage'>
            <div className="container">
                <div className="erPageContainer">
                    <h1 className="h1">Страница не найдена</h1>

                    <p className="text-gray-500 mb-8">
                        Упс! Мы не смогли найти такую страницу
                    </p>
                    <Link
                        href="/"
                        className="butt"
                    >
                        Вернуться на главную
                    </Link>
                </div>
            </div>
        </section>
    );
}