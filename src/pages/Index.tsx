
import AppNavbar from "@/components/AppNavbar";
import VoiceAssistantMic from "@/components/VoiceAssistantMic";

function WaveformAnimation() {
  // Simple animated placeholder, can be replaced with real waveform later
  return (
    <div aria-label="Waveform" className="flex justify-center items-end gap-1 h-10 my-8">
      {[1,2,3,4,5,6,7,8].map((_, i) => (
        <div
          key={i}
          className="bg-blue-300 rounded w-2"
          style={{
            height: `${8 + Math.abs(Math.sin(Date.now()/400 + i))*32}px`,
            transition: "height 0.1s linear"
          }}
        />
      ))}
    </div>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen bg-[#151E35] flex flex-col">
      <AppNavbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm mx-auto flex flex-col items-center">
          <h1 className="text-white text-2xl md:text-3xl font-semibold text-center mt-12 tracking-wide mb-4">
            HI! HOW CAN I HELP YOU?
          </h1>
          <WaveformAnimation />
          <VoiceAssistantMic />
        </div>
      </main>
    </div>
  );
};

export default Index;
