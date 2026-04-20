"use client";

import {
  type JSX,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import s from "./ChatPopup.module.css";
import { useMedia } from "@/lib/Media";

type Attachment =
  | {
    type: "image";
    src: string;
    alt?: string;
  }
  | {
    type: "file";
    href: string;
    name: string;
    label?: string;
  }
  | {
    type: "link";
    href: string;
    label: string;
    target?: "_blank" | "_self";
  };

type ProductCard = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  meta?: string[];
  image?: string;
  href?: string;
};

type BotPayload = {
  intent?: string;
  answer: string;
  attachments?: Attachment[];
  cards?: ProductCard[];
};

type Message = {
  id: string;
  isUser: boolean;
  timestamp: string;
  text?: string;
  payload?: BotPayload;
  isError?: boolean;
};

const FAQ_ITEMS = [
  "КАКИЕ ЛЮКИ САМЫЕ КРЕПКИЕ ДЛЯ ПРОМЫШЛЕННЫХ ЗОН?",
  "РАБОТАЕТЕ ЛИ ВЫ С ФИЗ. ЛИЦАМИ?",
  "ПРИВЕЗЁТЕ ЛЮКИ В МОЙ ГОРОД?",
  "МОЖНО ЛИ СДЕЛАТЬ ЛЮК ПО МОЕМУ ДИЗАЙНУ?",
  "КАК МНЕ УСТАНОВИТЬ ПОЛИМЕРПЕСЧАНЫЙ КОЛОДЕЦ?",
];

function formatTime(value: string): string {
  const date = new Date(value);
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

function parseInline(text: string): JSX.Element[] {
  const parts: JSX.Element[] = [];
  const chunks = text.split(/(\*\*.*?\*\*)/g);

  chunks.forEach((chunk, index) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      parts.push(
        <strong key={index} className={s.boldText}>
          {chunk.slice(2, -2)}
        </strong>
      );
      return;
    }

    parts.push(<span key={index}>{chunk}</span>);
  });

  return parts;
}

function FormattedText({ text }: { text: string }): JSX.Element {
  const lines = text.split("\n");

  return (
    <div className={s.formattedMessage}>
      {lines.map((line, index) => {
        const bulletMatch = line.match(/^\s*[-*•]\s+(.+)/);
        const numberMatch = line.match(/^\s*(\d+)\.\s+(.+)/);

        if (bulletMatch) {
          return (
            <div key={index} className={s.listItem}>
              <span className={s.bullet}>•</span>
              <span className={s.listText}>{parseInline(bulletMatch[1])}</span>
            </div>
          );
        }

        if (numberMatch) {
          return (
            <div key={index} className={s.listItem}>
              <span className={s.number}>{numberMatch[1]}.</span>
              <span className={s.listText}>{parseInline(numberMatch[2])}</span>
            </div>
          );
        }

        if (!line.trim()) {
          return <div key={index} className={s.messageLineBreak} />;
        }

        return (
          <div key={index} className={s.messageLine}>
            {parseInline(line)}
          </div>
        );
      })}
    </div>
  );
}

function BotAttachments({
  attachments,
}: {
  attachments?: Attachment[];
}): JSX.Element | null {
  if (!attachments?.length) return null;
  console.log(attachments);

  return (
    <div className={s.attachments}>
      {attachments.map((item, index) => {
        if (item.type === "image") {
          console.log(item.src);

          return (
            <div key={index} className={s.attachmentImageCard}>
              <img
                src={item.src}
                alt={item.alt || "Изображение"}
                className={s.attachmentImage}
              />
            </div>
          );
        }

        if (item.type === "file") {
          return (
            <a
              key={index}
              href={item.href}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={s.attachmentFile}
            >
              <span className={s.attachmentFileIcon}>PDF</span>
              <span className={s.attachmentFileContent}>
                <span className={s.attachmentFileLabel}>
                  {item.label || item.name}
                </span>
                <span className={s.attachmentFileName}>{item.name}</span>
              </span>
            </a>
          );
        }

        return (
          <a
            key={index}
            href={item.href}
            target={item.target || "_blank"}
            rel="noopener noreferrer"
            className={s.attachmentLink}
          >
            <span>{item.label}</span>
            <span className={s.attachmentArrow}>↗</span>
          </a>
        );
      })}
    </div>
  );
}

function BotCards({ cards }: { cards?: ProductCard[] }): JSX.Element | null {
  if (!cards?.length) return null;

  return (
    <div className={s.cardsGrid}>
      {cards.map((card) => {
        const content = (
          <>
            <div className={s.cardImageWrap}>
              {card.image ? (
                <img
                  src={card.image}
                  alt={card.title}
                  className={s.cardImage}
                />
              ) : (
                <div className={s.cardImageFallback}>ЛЮК</div>
              )}
            </div>

            <div className={s.cardBody}>
              <div className={s.cardTitle}>{card.title}</div>

              {card.subtitle ? (
                <div className={s.cardSubtitle}>{card.subtitle}</div>
              ) : null}

              {card.description ? (
                <div className={s.cardDescription}>{card.description}</div>
              ) : null}

              {card.meta?.length ? (
                <div className={s.cardMetaList}>
                  {card.meta.map((metaItem, index) => (
                    <span key={index} className={s.cardMetaChip}>
                      {metaItem}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </>
        );

        if (card.href) {
          return (
            <a
              key={card.id}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className={s.productCard}
            >
              {content}
            </a>
          );
        }

        return (
          <div key={card.id} className={s.productCard}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

function BotMessageContent({
  payload,
  fallbackText,
}: {
  payload?: BotPayload;
  fallbackText?: string;
}): JSX.Element {
  if (!payload) {
    return <FormattedText text={fallbackText || ""} />;
  }

  return (
    <div className={s.botStructured}>
      <FormattedText text={payload.answer} />
      <BotAttachments attachments={payload.attachments} />
      <BotCards cards={payload.cards} />
    </div>
  );
}

function normalizeBotResponse(raw: unknown): BotPayload {
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);

      if (parsed && typeof parsed === "object" && "answer" in parsed) {
        return {
          intent: typeof parsed.intent === "string" ? parsed.intent : "text",
          answer: typeof parsed.answer === "string" ? parsed.answer : "",
          attachments: Array.isArray(parsed.attachments) ? parsed.attachments : [],
          cards: Array.isArray(parsed.cards) ? parsed.cards : [],
        };
      }

      return {
        intent: "text",
        answer: raw,
        attachments: [],
        cards: [],
      };
    } catch {
      return {
        intent: "text",
        answer: raw,
        attachments: [],
        cards: [],
      };
    }
  }

  if (raw && typeof raw === "object") {
    const parsed = raw as Partial<BotPayload> & {
      response?: Partial<BotPayload> | string;
    };

    if ("answer" in parsed || "attachments" in parsed || "cards" in parsed) {
      return {
        intent: typeof parsed.intent === "string" ? parsed.intent : "text",
        answer: typeof parsed.answer === "string" ? parsed.answer : "",
        attachments: Array.isArray(parsed.attachments) ? parsed.attachments : [],
        cards: Array.isArray(parsed.cards) ? parsed.cards : [],
      };
    }
  }

  return {
    intent: "text",
    answer: "Извините, не удалось обработать ответ.",
    attachments: [],
    cards: [],
  };
}
export default function ChatPopup(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const lastScrollY = useRef(0);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const isMobile = useMedia("(max-width: 768px)");

  const [typedText, setTypedText] = useState<string>("");
  const [typedIndex, setTypedIndex] = useState<number>(0);
  const [typedSubIndex, setTypedSubIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;
  const shouldShowFaq = !hasMessages;

  useEffect(() => {
    const storedSessionId = localStorage.getItem("chat_session_id_v2");
    const storedMessages = localStorage.getItem("chat_messages_v2");

    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const nextId = generateSessionId();
      setSessionId(nextId);
      localStorage.setItem("chat_session_id_v2", nextId);
    }

    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages) as Message[];
        setMessages(parsed);
      } catch {
        setMessages([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chat_messages_v2", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen || !inputRef.current) return;

    const t = setTimeout(() => {
      inputRef.current?.focus();
    }, 250);

    setUnreadCount(0);

    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const last = messages[messages.length - 1];
      if (!last.isUser) {
        setUnreadCount((prev) => prev + 1);
      }
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!isOpen) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;

    const currentText = FAQ_ITEMS[typedIndex] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedSubIndex < currentText.length) {
      timeout = setTimeout(() => {
        setTypedSubIndex((prev) => prev + 1);
        setTypedText(currentText.slice(0, typedSubIndex + 1));
      }, 70);
    } else if (!isDeleting && typedSubIndex === currentText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1600);
    } else if (isDeleting && typedSubIndex > 0) {
      timeout = setTimeout(() => {
        setTypedSubIndex((prev) => prev - 1);
        setTypedText(currentText.slice(0, typedSubIndex - 1));
      }, 35);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTypedIndex((prev) => (prev + 1) % FAQ_ITEMS.length);
      }, 250);
    }

    return () => clearTimeout(timeout);
  }, [typedIndex, typedSubIndex, isDeleting, isOpen]);

  useEffect(() => {
    const handleScroll = () => {


      const currentScrollY = window.scrollY;

      if (isOpen) {
        setIsHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY <= 20) {
        setIsHidden(false);
      } else if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > 120
      ) {
        setIsHidden(true);
      }

      lastScrollY.current = currentScrollY;
    };


    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHidden]);

  const askToAPI = async (message: string): Promise<BotPayload> => {

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        session_id: sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return normalizeBotResponse(data.response ?? data);
  };

  const pushUserMessage = (text: string) => {
    const next: Message = {
      id: crypto.randomUUID(),
      isUser: true,
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, next]);
  };

  const pushBotMessage = (payload: BotPayload) => {
    const next: Message = {
      id: crypto.randomUUID(),
      isUser: false,
      payload,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, next]);
  };

  const pushErrorMessage = (text: string) => {
    const next: Message = {
      id: crypto.randomUUID(),
      isUser: false,
      text,
      timestamp: new Date().toISOString(),
      isError: true,
    };

    setMessages((prev) => [...prev, next]);
  };

  const sendMessage = async (presetText?: string): Promise<void> => {
    const value = (presetText ?? inputValue).trim();

    if (!value || isLoading) return;

    if (!presetText) {
      setInputValue("");
    }

    pushUserMessage(value);
    setIsLoading(true);

    try {
      const payload = await askToAPI(value);
      pushBotMessage(payload);
    } catch (error) {
      pushErrorMessage(
        error instanceof Error
          ? "Не удалось получить ответ. Проверьте соединение и попробуйте ещё раз."
          : "Произошла ошибка. Попробуйте позже."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = (): void => {
    const nextId = generateSessionId();
    setSessionId(nextId);
    localStorage.setItem("chat_session_id_v2", nextId);
    setMessages([]);
    setUnreadCount(0);
  };

  const lineText = useMemo(() => {
    return typedText || "";
  }, [typedText]);

  return (
    <>
      <button
        type="button"
        className={`${s.chatLauncher} ${isOpen ? s.chatLauncherHidden : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Открыть чат"
      >
        <span className={s.chatLauncherDots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>

        <span className={s.chatLauncherLabel}>{!isMobile && !isHidden ? "Спросить у ИИ-ассистента:" : "ИИ-ассистент"}</span>

        {!isMobile && !isHidden && <span className={s.chatLauncherTyping}>
          {lineText}
          <span className={s.chatLauncherCaret} />
        </span>}

        {/* {unreadCount > 0 && (
          <span className={s.chatLauncherBadge}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )} */}
      </button>

      {isOpen && (
        <>
          <div className={s.overlay} />

          <div ref={panelRef} className={s.chatPanel}>
            <div className={s.hero}>
              {shouldShowFaq && (
                <div className={s.faqRow}>
                  {FAQ_ITEMS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={s.faqChip}
                      onClick={() => sendMessage(item)}
                      disabled={isLoading}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}

              <div className={s.heroBody}>
                {!hasMessages ? (
                  <div className={s.heroTitleBox}>
                    <h2 className={s.heroTitle}>
                      УЗНАЙТЕ БОЛЬШЕ О ПРОИЗВОДСТВЕ
                      <br />
                      ПОЛИМЕРПЕСЧАНЫХ ЛЮКОВ
                    </h2>
                  </div>
                ) : (
                  <div className={s.chatMessages}>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`${s.message} ${message.isUser ? s.messageUser : s.messageBot
                          } ${message.isError ? s.messageError : ""}`}
                      >
                        <div className={s.messageContent}>
                          {message.isUser ? (
                            <p className={s.messageText}>{message.text}</p>
                          ) : (
                            <BotMessageContent
                              payload={message.payload}
                              fallbackText={message.text}
                            />
                          )}

                          <span className={s.messageTime}>
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className={`${s.message} ${s.messageBot}`}>
                        <div className={s.messageContent}>
                          <div className={s.typingIndicator}>
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
            </div>

            <div className={s.inputBar}>
              <input
                ref={inputRef}
                type="text"
                className={s.chatInput}
                placeholder={
                  isLoading
                    ? "Пожалуйста, подождите..."
                    : "Задайте любой интересующий Вас вопрос"
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={isLoading}
              />

              <button
                type="button"
                className={s.sendButton}
                onClick={() => sendMessage()}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Отправить сообщение"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M13 6L19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className={s.clearButton}
                onClick={clearHistory}
                aria-label="Очистить историю"
                title="Очистить историю"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6H21M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6M6 6V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 11V17M14 11V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}