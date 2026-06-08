import {
  Upload,
  MessageSquare,
  NotebookPen,
  Brain,
  ClipboardCheck,
  History,
} from "lucide-react";

const actions = [
  {
    title: "Upload PDF",
    icon: Upload,
  },
  {
    title: "AI Chat",
    icon: MessageSquare,
  },
  {
    title: "Generate Notes",
    icon: NotebookPen,
  },
  {
    title: "Create Quiz",
    icon: Brain,
  },
  {
    title: "Mock Test",
    icon: ClipboardCheck,
  },
  {
    title: "History",
    icon: History,
  },
];

export default function QuickActions() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-10">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <div
            key={action.title}
            className="
              backdrop-blur-xl
              border
              border-white/10
              rounded-3xl
              p-6
              hover:scale-105
              transition-all
              cursor-pointer
            "
          >
            <Icon size={32} />

            <h3 className="mt-4 text-xl font-semibold">
              {action.title}
            </h3>
          </div>
        );
      })}
    </div>
  );
}