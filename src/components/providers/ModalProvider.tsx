"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import PopupForm from "../ui/PopupForm/PopupForm";

type ModalContextValue = {
  isRequestOpen: boolean;
  openRequest: () => void;
  closeRequest: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const value = useMemo<ModalContextValue>(
    () => ({
      isRequestOpen,
      openRequest: () => setIsRequestOpen(true),
      closeRequest: () => setIsRequestOpen(false),
    }),
    [isRequestOpen]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}

      {/* Модалка рендерится один раз глобально */}
      {isRequestOpen && <PopupForm onClose={value.closeRequest} />}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
