"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import s from "./PopupForm.module.css";

type Props = {
  onClose: () => void;
};

type FormState = {
  name: string;
  phone: string; // masked
  message: string;
  agreement: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = { 
  name: "", 
  phone: "", 
  message: "",
  agreement: false 
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

// Валидация только полей (без agreement)
function validateFields(values: FormState): FormErrors {
  const errors: FormErrors = {};

  const name = values.name.trim();
  if (name.length < 2) errors.name = "Введите имя (минимум 2 символа).";

  if (!isPhoneComplete(values.phone)) errors.phone = "Введите корректный номер телефона.";

  const msg = values.message.trim();
  if (msg.length < 10) errors.message = "Сообщение должно быть минимум 10 символов.";

  return errors;
}

// Полная валидация для отправки
function validateForSubmit(values: FormState): FormErrors {
  const errors = validateFields(values);
  
  if (!values.agreement) {
    errors.agreement = "Необходимо согласие на обработку данных";
  }
  
  return errors;
}

export default function PopupForm({ onClose }: Props) {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Проверяем только поля для активации кнопки
  const canSubmit = useMemo(() => {
    const e = validateFields(values);
    return Object.keys(e).length === 0;
  }, [values]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const onChange = (key: keyof FormState) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let next: string | boolean = e.target.value;
      
      if (key === "phone") {
        next = formatPhoneRU(e.target.value);
      }
      
      setValues((p) => ({ ...p, [key]: next }));

      setErrors((prev) => {
        if (!prev[key]) return prev;
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((p) => ({ ...p, agreement: e.target.checked }));
    setErrors((prev) => {
      if (!prev.agreement) return prev;
      const copy = { ...prev };
      delete copy.agreement;
      return copy;
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateForSubmit(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: values.name.trim(),
        phone: digitsOnly(values.phone),
        message: values.message.trim(),
      };

      console.log("Отправка данных:", payload);

      await new Promise((r) => setTimeout(r, 650));
      setIsSuccess(true);
      setValues(initial);
    } catch {
      setErrors((p) => ({ ...p, message: "Не удалось отправить. Попробуйте ещё раз." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAll = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className={s.popOverley} onMouseDown={closeAll} role="dialog" aria-modal="true">
      <AnimatePresence initial={false}>
        <motion.div
          className={s.popBox}
          onMouseDown={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <button type="button" className={s.close} onClick={closeAll} aria-label="Закрыть" />

          {!isSuccess ? (
            <>
              <h3 className={s.popTitle}>Оставить Заявку</h3>
              <p className={s.popText}>
                Заполните форму, и мы свяжемся с вами для обсуждения деталей и
                индивидуального подхода к заказу
              </p>

              <form className={s.popForm} onSubmit={onSubmit} noValidate>
                <div className={s.field}>
                  <input
                    className={`${s.popFormInput} ${errors.name ? s.inputError : ""}`}
                    value={values.name}
                    onChange={onChange("name")}
                    type="text"
                    placeholder="Ваше имя"
                    autoComplete="name"
                    disabled={isSubmitting}
                  />
                  {errors.name && <div className={s.errorText}>{errors.name}</div>}
                </div>

                <div className={s.field}>
                  <input
                    className={`${s.popFormInput} ${errors.phone ? s.inputError : ""}`}
                    value={values.phone}
                    onChange={onChange("phone")}
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
                    className={`${s.popFormTextarea} ${errors.message ? s.inputError : ""}`}
                    value={values.message}
                    onChange={onChange("message")}
                    placeholder="Ваше сообщение"
                    disabled={isSubmitting}
                  />
                  {errors.message && <div className={s.errorText}>{errors.message}</div>}
                </div>

                <div className={s.field}>
                  <label className={s.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      className={s.checkboxInput}
                      checked={values.agreement}
                      onChange={onCheckboxChange}
                      disabled={isSubmitting}
                    />
                    <span className={s.checkboxCustom}></span>
                    <span className={s.checkboxText}>
                      Я ознакомился с{" "}
                      <a
                        className={s.popFormTextLink}
                        href="/policy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Правилами обработки персональных данных
                      </a>
                    </span>
                  </label>
                  {errors.agreement && <div className={s.errorText}>{errors.agreement}</div>}
                </div>

                <button 
                  className={`butt ${s.submit}`} 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправляем..." : "Отправить"}
                </button>
              </form>
            </>
          ) : (
            <motion.div
              className={s.success}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={s.successIcon}>
                <svg width="54" height="54" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className={s.successTitle}>СПАСИБО ЗА ЗАЯВКУ!</h3>
              <p className={s.successText}>
                Ваша заявка в обработке. Наш сотрудник свяжется с вами в ближайшее время
              </p>

              <button type="button" className={`butt ${s.successBtn}`} onClick={closeAll}>
                Закрыть
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}