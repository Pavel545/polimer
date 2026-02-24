'use client';
import { Fade } from "@/components/ui/Motion";
import s from "./style.module.css";
import { useState, useMemo, FormEvent, ChangeEvent } from "react";

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
  agreement: false 
};

// Вспомогательные функции для телефона
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

  // ⚠️ Убираем проверку agreement из валидации для canSubmit,
  // но оставляем её для финальной отправки
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

  const canSubmit = useMemo(() => {
    // Проверяем только поля, без agreement
    const e = validate(values);
    return Object.keys(e).length === 0;
  }, [values]);

  const handleChange = (
    key: keyof FormState,
    value: string | boolean
  ) => {
    setValues(prev => ({ ...prev, [key]: value }));
    
    // Убираем ошибку при вводе
    setErrors(prev => {
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

    // Для отправки проверяем всё, включая agreement
    const nextErrors = validateForSubmit(values);
    setErrors(nextErrors);
    
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: values.name.trim(),
        phone: digitsOnly(values.phone),
        message: values.message.trim(),
      };

      console.log("Отправка данных:", payload); // для отладки

      // Здесь будет реальная отправка
      await new Promise(resolve => setTimeout(resolve, 650));
      
      setIsSuccess(true);
      setValues(initial);
      setErrors({}); // очищаем ошибки
      
      // Автоматически скрываем успех через 3 секунды
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      
    } catch {
      setErrors({ message: "Не удалось отправить. Попробуйте ещё раз." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={s.contact}>
      <div className="container flex-center">
        <Fade className={s.contactsFormBox}>
          <>
            <h2>Остались вопросы?</h2>

            <p className={s.contactsFormText}>
              Заполните форму, и мы свяжемся с вами для обсуждения деталей и индивидуального подхода к заказу
            </p>

            <form className={s.contactsForm} onSubmit={handleSubmit} noValidate>
              <div className={s.field}>
                <input
                  className={`${s.contactsFormInput} ${errors.name ? s.inputError : ""}`}
                  value={values.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  type="text"
                  placeholder="Ваше имя"
                  autoComplete="name"
                  disabled={isSubmitting || isSuccess}
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
                  disabled={isSubmitting || isSuccess}
                />
                {errors.phone && <div className={s.errorText}>{errors.phone}</div>}
              </div>

              <div className={s.field}>
                <textarea
                  className={`${s.contactsFormTextarea} ${errors.message ? s.inputError : ""}`}
                  value={values.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Ваше сообщение"
                  disabled={isSubmitting || isSuccess}
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
                      disabled={isSubmitting || isSuccess}
                    />
                    <span className={s.checkboxCustom}></span>
                    <span className={s.checkboxText}>
                      Я ознакомился с{" "}
                      <a
                        className={s.contactsFormTextLink}
                        href="/policy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Правилами обработки персональных данных
                      </a>
                    </span>
                  </label>
                </div>
                {errors.agreement && <div className={s.errorText}>{errors.agreement}</div>}
              </div>

              <button 
                className={`butt ${s.submit} ${isSuccess ? s.success : ""}`} 
                type="submit" 
                disabled={isSubmitting || isSuccess}
              >
                {isSuccess ? "✓ Отправлено" : isSubmitting ? "Отправляем..." : "Отправить"}
              </button>
            </form>
          </>
        </Fade>
      </div>
    </section>
  )
}