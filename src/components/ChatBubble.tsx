
import React from "react";

type ChatBubbleProps = {
  message: string;
  type: "user" | "ai";
};

export default function ChatBubble({ message, type }: ChatBubbleProps) {
  return (
    <div className={`flex ${type === "user" ? "justify-end" : "justify-start"} mb-2`}>
      <span
        className={`px-4 py-2 rounded-lg max-w-xs break-words ${
          type === "user"
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-700 rounded-bl-none"
        }`}
      >
        {message}
      </span>
    </div>
  );
}
