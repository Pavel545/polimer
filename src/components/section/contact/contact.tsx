'use client';
import { Fade } from "@/components/ui/Motion";
import s from "./style.module.css";

export default function Contact() {

    return (
        <section className={s.contact}>
            <div className="container flex-center">
                <Fade className={s.contactsFormBox}>
                    <>
                        <h2 >Остались вопросы?</h2>

                        <p className={s.contactsFormText}>
                            Заполните форму, и мы свяжемся с вами для обсуждения деталей и индивидуального подхода к заказу
                        </p>

                        <form className={s.contactsForm} action="">
                            <input
                                className={s.contactsFormInput}
                                required
                                type="text"
                                placeholder="Ваше имя"
                            />
                            <input
                                className={s.contactsFormInput}
                                required
                                type="tel"
                                placeholder="+7 (_ _ _) _ _ _-_ _-_ _"
                            />
                            <textarea
                                className={s.contactsFormTextarea}
                                required
                                placeholder="Ваше сообщение"
                            />
                            <button className="butt" type="submit">
                             Отправить
                            </button>
                        </form>

                        <p className={s.contactsFormText + " " + s.contactsFormPs}>
                            Нажимая кнопку “Отправить”, Вы подтверждаете что ознакомились с{" "}
                            <a
                                className={s.contactsFormTextLink}
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Правилами обработки персональных данных
                            </a>
                        </p>

                    </>
                </Fade>
            </div>
        </section>
    )
}