
import { Mic } from "lucide-react";

export default function VoiceAssistantMic({
  onClick,
  disabled = false,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`flex flex-col items-center justify-center mt-4 rounded-full bg-[#243359] shadow-lg w-16 h-16 transition hover:bg-[#2b447a] focus:outline-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Activate voice assistant"
    >
      <Mic className="w-8 h-8 text-white" />
    </button>
  );
}
