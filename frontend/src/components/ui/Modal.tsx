"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div
        className={`relative bg-white rounded-xl shadow-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-ghana-gray-200">
          <h2 className="text-lg font-semibold text-ghana-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-ghana-gray-400 hover:text-ghana-gray-600 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
