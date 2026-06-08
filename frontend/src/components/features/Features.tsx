const features = [
  "Upload PDFs",
  "Ask Questions",
  "Generate Notes",
  "Semantic Search",
  "Chat History",
  "AI Powered Learning",
  "Generate Quizzes on the spot",
];

export default function Features() {
  return (
    <section
      className="
        py-24
        px-6
      "
    >
      <h2
        className="
          text-center
          text-4xl
          font-bold
        "
      >
        Features
      </h2>

      <div
        className="
        backdrop-blur-xl
        bg-white/5
        border
        border-white/10
        rounded-2xl
        p-6
        transition-all
        duration-300
        hover:scale-105
        "
      >
        {features.map((feature) => (
          <div
            key={feature}
            className="
              backdrop-blur-xl
              border
              border-white/10
              rounded-2xl
              p-6
            "
          >
            {feature}
          </div>
        ))}
      </div>
    </section>
  );
}