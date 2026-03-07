
import ChatHeader from "@/app/__components/chat/ChatHeader";
import InputBar from "@/app/__components/chat/InputBar";
import MessageSearch from "@/app/__components/chat/MessageSearch";
import UserCard from "@/app/__components/chat/UserCard";
import UserMessage from "@/app/__components/chat/UserMessage";

export default async function MessagesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      {/* ── SIDEBAR ── */}
      <aside className="w-72 shrink-0 flex flex-col bg-gray-900 border-r border-gray-800 h-full">
        {/* Search */}
        <MessageSearch />

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2 py-1"> <UserCard /> </div>
      </aside>

      {/* ── CHAT AREA ── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Chat Header */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800"> <ChatHeader userId={id} /> </div>

        {/* Messages */}
        <div className="flex-1  overflow-y-auto px-6 py-6 flex flex-col gap-3 bg-gray-90"> <UserMessage receiverId={id} /> </div>

        {/* Input Bar */}
        <InputBar />
      </main>
    </div>
  );
}
