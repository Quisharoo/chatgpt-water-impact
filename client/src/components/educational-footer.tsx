import { CheckCircle, Globe } from "lucide-react";

export default function EducationalFooter() {
  const tips = [
    "Be concise in your prompts",
    "Avoid repetitive conversations", 
    "Use AI mindfully"
  ];

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold mb-4">Reduce Your AI Footprint</h3>
          <p className="text-slate-300 leading-relaxed mb-6">
            Small changes in how we use AI can make a meaningful environmental impact. Every conscious choice counts.
          </p>
          <div className="space-y-2">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="text-green-400 w-5 h-5" />
                <span className="text-slate-200">{tip}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 bg-opacity-20 rounded-full mb-4">
            <Globe className="text-green-400 text-3xl" />
          </div>
          <p className="text-slate-300 text-sm">
            Together, we can make AI more sustainable
          </p>
        </div>
      </div>
    </section>
  );
}
