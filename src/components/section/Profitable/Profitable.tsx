"use client";
import {  motion } from "framer-motion";
import s from "./Profitable.module.scss";
import ProfitableItem, { ItemType } from "./ProfitableItem";

export default function Profitable() {
    const items: ItemType[] = [
        {
            id: "01",
            align: "left",
            title: "Характеристики изделий",
            subtitle: "для удобства выбора и монтажа",
            text: "Предоставляем подробные технические характеристики наших изделий для вашего удобства"
        },
        {
            id: "02",
            align: "right",
            title: "Инструкции по монтажу",
            subtitle: "и эксплуатации",
            text: "Мы предоставляем все инструкции по правильному выбору полимерпесчаных люков и их монтажу"
        },
        {
            id: "03",
            align: "left",
            title: "Чат бот с ИИ",
            subtitle: "Быстрые ответы на ваши вопросы",
            text: "Наш чат-бот доступен 24/7 и моментально ответит клиенту по всем вопросам связанным с установкой и эксплуатацией полимерпесчаных люков, плитки поребриков и в водоотводов"
        },
        {
            id: "04",
            align: "right",
            title: "+ Ваши новые клиенты",
            subtitle: "Всё для роста клиентской базы",
            text: "Направляем потенциальных покупателей в ваши магазины. Нам важно, чтобы у вас увеличивались продажи. Это залог успешного партнерства"
        }
    ];;

    return (
        <section className={s.Profitable}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    С нами работать выгодно
                </motion.h2>

                <motion.p
                    className={`h2 ${s.ProfitableTitle}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    Всё для удобства клиента
                </motion.p>

                <div className={s.ProfitableContent}>
                    {items.map((item) => (
                        <ProfitableItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}