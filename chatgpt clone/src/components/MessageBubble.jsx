export default function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } transition-all`}
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
          isUser
            ? "bg-gray-500 text-white rounded-br-none"
            : "bg-gray-400 text-gray-800 rounded-bl-none"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
