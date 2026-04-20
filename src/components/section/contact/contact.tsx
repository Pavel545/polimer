"use client";

import { Fade } from "@/components/ui/Motion";
import s from "./style.module.css";
import { useState, useMemo, FormEvent, ChangeEvent, useEffect, useRef } from "react";
import Image from "next/image";

type FormState = {
  name: string;
  phone: string;
  message: string;
  agreement: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  phone: "",
  message: "",
  agreement: false,
};

function digitsOnly(v: string) {
  return v.replace(/\D/g, "");
}

function formatPhoneRU(input: string): string {
  let d = digitsOnly(input);

  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;

  d = d.slice(0, 11);

  const p = d.slice(1);
  const a = p.slice(0, 3);
  const b = p.slice(3, 6);
  const c = p.slice(6, 8);
  const e = p.slice(8, 10);

  let out = "+7";
  if (a) out += ` (${a}`;
  if (a.length === 3) out += `)`;
  if (b) out += ` ${b}`;
  if (c) out += `-${c}`;
  if (e) out += `-${e}`;

  return out;
}

function isPhoneComplete(masked: string): boolean {
  return digitsOnly(masked).length === 11;
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  const name = values.name.trim();
  if (name.length < 2) {
    errors.name = "Введите имя (минимум 2 символа)";
  } else if (name.length > 50) {
    errors.name = "Имя не должно превышать 50 символов";
  }

  if (!isPhoneComplete(values.phone)) {
    errors.phone = "Введите корректный номер телефона";
  }

  const msg = values.message.trim();
  if (msg.length < 10) {
    errors.message = "Сообщение должно быть минимум 10 символов";
  } else if (msg.length > 500) {
    errors.message = "Сообщение не должно превышать 500 символов";
  }

  return errors;
}

function validateForSubmit(values: FormState): FormErrors {
  const errors = validate(values);

  if (!values.agreement) {
    errors.agreement = "Необходимо согласие на обработку данных";
  }

  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const timerRef = useRef<number | null>(null);

  const canSubmit = useMemo(() => {
    const e = validate(values);
    return Object.keys(e).length === 0;
  }, [values]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleChange = (key: keyof FormState, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));

    setErrors((prev) => {
      if (!prev[key]) return prev;
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneRU(e.target.value);
    handleChange("phone", formatted);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nextErrors = validateForSubmit(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: values.name.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
        topic: "Форма обратной связи",
      };

      const response = await fetch("/api/send-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result?.fields && typeof result.fields === "object") {
          setErrors(result.fields);
        } else {
          setErrors({
            message: result?.error || "Не удалось отправить. Попробуйте ещё раз.",
          });
        }
        return;
      }

      setIsSuccess(true);
      setValues(initial);
      setErrors({});

      timerRef.current = window.setTimeout(() => {
        setIsSuccess(false);
      }, 2500);
    } catch {
      setErrors({
        message: "Не удалось отправить. Проверьте соединение и попробуйте ещё раз.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={s.contact}>
      <div className={`container ${s.contactContent}`}>
        <Fade className={s.contactsFormBox}>
          <>
            <h2>Остались вопросы?</h2>

            <p className={s.contactsFormText}>
              Заполните форму, и мы свяжемся с вами для обсуждения деталей и
              индивидуального подхода к заказу
            </p>

            {isSuccess ? (
              <div className={s.successBox} aria-live="polite">
                <div className={s.successIcon}>✓</div>
                <div className={s.successTitle}>Спасибо!</div>
                <div className={s.successDescription}>
                  Ваша заявка отправлена. Мы скоро свяжемся с вами.
                </div>
              </div>
            ) : (
              <form className={s.contactsForm} onSubmit={handleSubmit} noValidate>
                <div className={s.field}>
                  <input
                    className={`${s.contactsFormInput} ${errors.name ? s.inputError : ""}`}
                    value={values.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    type="text"
                    placeholder="Ваше имя"
                    autoComplete="name"
                    disabled={isSubmitting}
                  />
                  {errors.name && <div className={s.errorText}>{errors.name}</div>}
                </div>

                <div className={s.field}>
                  <input
                    className={`${s.contactsFormInput} ${errors.phone ? s.inputError : ""}`}
                    value={values.phone}
                    onChange={handlePhoneChange}
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    inputMode="tel"
                    autoComplete="tel"
                    disabled={isSubmitting}
                  />
                  {errors.phone && <div className={s.errorText}>{errors.phone}</div>}
                </div>

                <div className={s.field}>
                  <textarea
                    className={`${s.contactsFormTextarea} ${errors.message ? s.inputError : ""}`}
                    value={values.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Ваше сообщение"
                    disabled={isSubmitting}
                  />
                  {errors.message && <div className={s.errorText}>{errors.message}</div>}
                </div>

                <div className={s.field}>
                  <div className={s.checkboxWrapper}>
                    <label className={s.checkboxLabel}>
                      <input
                        type="checkbox"
                        className={s.checkboxInput}
                        checked={values.agreement}
                        onChange={(e) => handleChange("agreement", e.target.checked)}
                        disabled={isSubmitting}
                      />
                      <span className={s.checkboxCustom}></span>
                      <span className={s.checkboxText}>
                        Я даю согласие на обработку персональных данных в
                        соответствии с{" "}
                        <a
                          className={s.contactsFormTextLink}
                          href="/politiko"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Политикой конфиденциальности
                        </a>
                      </span>
                    </label>
                  </div>
                  {errors.agreement && (
                    <div className={s.errorText}>{errors.agreement}</div>
                  )}
                </div>

                <button
                  className={`butt ${s.submit}`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправляем..." : "Отправить"}
                </button>
              </form>
            )}
          </>
        </Fade>

        <div className={s.contactDecor}>
          <Image
            className={s.contactDecorImg}
            src={"/img/contact/decor.png"}
            alt="Схематичное изображение люка"
            width={900}
            height={600}
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}