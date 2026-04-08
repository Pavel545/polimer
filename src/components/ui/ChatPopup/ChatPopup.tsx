"use client";

import { type JSX, useState, useEffect, useRef } from "react";
import Image from "next/image";
import s from "./ChatPopup.module.css";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
};

type ChatSession = {
  id: string;
  messages: Message[];
  createdAt: Date;
};

// Компонент для форматирования текста сообщений
const FormattedMessage = ({ text }: { text: string }) => {
  const formatText = (content: string) => {
    // Разделяем на строки
    const lines = content.split('\n');

    return lines.map((line, lineIndex) => {
      // Проверяем на маркированный список (строки начинающиеся с -, *, • или цифр с точкой)
      const bulletMatch = line.match(/^[\s]*[-*•]\s+(.+)/);
      const numberMatch = line.match(/^[\s]*(\d+)\.\s+(.+)/);

      if (bulletMatch) {
        return (
          <div key={lineIndex} className={s.listItem}>
            <span className={s.bullet}>•</span>
            <span className={s.listText}>{formatInline(bulletMatch[1])}</span>
          </div>
        );
      }

      if (numberMatch) {
        return (
          <div key={lineIndex} className={s.listItem}>
            <span className={s.number}>{numberMatch[1]}.</span>
            <span className={s.listText}>{formatInline(numberMatch[2])}</span>
          </div>
        );
      }

      // Проверка на жирный текст (между **)
      if (line.includes('**')) {
        return (
          <div key={lineIndex} className={s.messageLine}>
            {formatInline(line)}
          </div>
        );
      }

      // Обычный текст
      if (line.trim()) {
        return (
          <div key={lineIndex} className={s.messageLine}>
            {formatInline(line)}
          </div>
        );
      }

      // Пустая строка - добавляем отступ
      return <div key={lineIndex} className={s.messageLineBreak} />;
    });
  };

  const formatInline = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    // Регулярное выражение для поиска **жирного текста**
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      // Добавляем текст до жирного
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      // Добавляем жирный текст
      parts.push(<strong key={match.index} className={s.boldText}>{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }

    // Добавляем оставшийся текст
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return <div className={s.formattedMessage}>{formatText(text)}</div>;
};

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Initialize chat session
  useEffect(() => {
    const initSession = () => {
      const storedSessionId = localStorage.getItem("chat_session_id");
      const storedMessages = localStorage.getItem("chat_messages");

      if (storedSessionId && storedMessages) {
        setSessionId(storedSessionId);
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } else {
        const newSessionId = generateSessionId();
        setSessionId(newSessionId);
        localStorage.setItem("chat_session_id", newSessionId);

        // const welcomeMessage: Message = {
        //   id: Date.now().toString(),
        //   text: "Здравствуйте! Я виртуальный помощник компании 73Полимер. Чем могу помочь?\n\nВы можете спросить меня о:\n• типах люков\n• характеристиках продукции\n• условиях доставки\n• ценах и наличии",
        //   isUser: false,
        //   timestamp: new Date(),
        // };
        // setMessages([welcomeMessage]);
        // localStorage.setItem("chat_messages", JSON.stringify([welcomeMessage]));
      }
    };

    initSession();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Track unread messages when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.isUser) {
        setUnreadCount(prev => prev + 1);
      }
    }
  }, [messages, isOpen]);

  // ESC closes chat
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeChat();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Block body scroll when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(e.target as Node) && isOpen) {
        closeChat();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const generateSessionId = (): string => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const toggleChat = (): void => setIsOpen((prev) => !prev);
  const closeChat = (): void => setIsOpen(false);

  const saveMessages = (updatedMessages: Message[]) => {
    localStorage.setItem("chat_messages", JSON.stringify(updatedMessages));
  };

  const sendMessageToAPI = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch("https://73polimer-acr-agency.waw0.amvera.tech/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.answer);

      return data.response || data.answer || "Извините, произошла ошибка. Пожалуйста, попробуйте позже.";
    } catch (error) {
      console.error("Chat API error:", error);
      throw new Error("Не удалось отправить сообщение. Проверьте подключение к интернету.");
    }
  };

  const sendMessage = async (): Promise<void> => {
    if (!inputValue.trim() || isLoading) return;

    const userMessageText = inputValue.trim();
    setInputValue("");

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      isUser: true,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setIsLoading(true);

    try {
      const botResponse = await sendMessageToAPI(userMessageText);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      saveMessages(finalMessages);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error instanceof Error ? error.message : "Произошла ошибка. Пожалуйста, попробуйте позже.",
        isUser: false,
        timestamp: new Date(),
        isError: true,
      };

      const errorMessages = [...updatedMessages, errorMessage];
      setMessages(errorMessages);
      saveMessages(errorMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const clearHistory = (): void => {
    if (confirm("Очистить историю сообщений?")) {
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      localStorage.setItem("chat_session_id", newSessionId);

      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "Здравствуйте! Я виртуальный помощник компании 73Полимер. Чем могу помочь?\n\nВы можете спросить меня о:\n• типах люков\n• характеристиках продукции\n• условиях доставки\n• ценах и наличии",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      localStorage.setItem("chat_messages", JSON.stringify([welcomeMessage]));
      setUnreadCount(0);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        type="button"
        className={`${s.chatButton} ${isOpen ? s.chatButtonHidden : ""}`}
        onClick={toggleChat}
        aria-label="Открыть чат"
      >
        Спросить у ИИ-ассистента
        {unreadCount > 0 && (
          <span className={s.chatButtonBadge}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div className={s.overlay} />

          {/* Chat Window */}
          <div ref={chatWindowRef} className={s.chatWindow}>
            <div className={s.faq}>

            </div>

            {/* Messages Area */}
            <div className={s.chatMessages}>
              {messages.length === 0 ? (
                <div className={s.emptyState}>
                  <p>Напишите нам, и мы поможем!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${s.message} ${message.isUser ? s.messageUser : s.messageBot
                      } ${message.isError ? s.messageError : ""}`}
                  >
                    <div className={s.messageContent}>
                      {message.isUser ? (
                        <p className={s.messageText}>{message.text}</p>
                      ) : (
                        <FormattedMessage text={message.text} />
                      )}
                      <span className={s.messageTime}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className={`${s.message} ${s.messageBot}`}>
                  <div className={s.messageContent}>
                    <div className={s.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={s.chatInputArea}>
              <input
                ref={inputRef}
                type="text"
                className={s.chatInput}
                placeholder={isLoading ? "Пожалуйста, подождите..." : "Введите сообщение..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                type="button"
                className={s.chatSend}
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Отправить сообщение"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
             <button
                  type="button"
                  className={s.chatClear}
                  onClick={clearHistory}
                  aria-label="Очистить историю"
                  title="Очистить историю"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H21M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 11V17M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}