import { useState } from "react"
import { ChatList } from "./chat-list"
import { ChatComponent } from "./chat-component"

type Message = {
  id: number
  content: string
  sender: "user" | "bot"
}

type Chat = {
  id: string
  name: string
  lastMessage: string
  avatar: string
  messages: Message[]
}

const mockChats: Chat[] = [
  { 
    id: "1", 
    name: "Alice", 
    lastMessage: "こんにちは！", 
    avatar: "/placeholder.svg?height=40&width=40",
    messages: [{ id: 1, content: "こんにちは！Aliceさん、どのようなご用件でしょうか？", sender: "bot" }]
  },
  { 
    id: "2", 
    name: "Bob", 
    lastMessage: "お元気ですか？", 
    avatar: "/placeholder.svg?height=40&width=40",
    messages: [{ id: 1, content: "こんにちは！Bobさん、どのようなご用件でしょうか？", sender: "bot" }]
  },
  { 
    id: "3", 
    name: "Charlie", 
    lastMessage: "明日の予定は？", 
    avatar: "/placeholder.svg?height=40&width=40",
    messages: [{ id: 1, content: "こんにちは！Charlieさん、どのようなご用件でしょうか？", sender: "bot" }]
  },
]

export default function ChatApp() {
  const [chats, setChats] = useState<Chat[]>(mockChats)
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  const selectedChat = chats.find(chat => chat.id === selectedChatId)

  const onSendMessage = (chatId: string, content: string) => {
    setChats(prevChats => {
      const updatedChats = prevChats.map(chat => {
        if (chat.id === chatId) {
          const newUserMessage = { id: chat.messages.length + 1, content, sender: "user" as const }
          return {
            ...chat,
            messages: [...chat.messages, newUserMessage],
            lastMessage: content // ユーザーのメッセージを一時的にlastMessageとして設定
          }
        }
        return chat
      })
      return updatedChats
    })

    // ボットの返信を非同期で処理
    setTimeout(() => {
      setChats(prevChats => {
        const updatedChats = prevChats.map(chat => {
          if (chat.id === chatId) {
            const botResponse = `${chat.name}さん、ありがとうございます。どのようにお手伝いできますか？`
            const newBotMessage = { id: chat.messages.length + 1, content: botResponse, sender: "bot" as const }
            return {
              ...chat,
              messages: [...chat.messages, newBotMessage],
              lastMessage: botResponse // ボットの返信をlastMessageとして設定
            }
          }
          return chat
        })
        return updatedChats
      })
    }, 1000) // 1秒後にボットが返信
  }

  return (
    <div className="flex h-screen">
      <aside className="w-1/3 border-r" aria-label="チャット一覧">
        <ChatList
          chats={chats}
          onSelectChat={setSelectedChatId}
          selectedChatId={selectedChatId}
        />
      </aside>
      <main className="w-2/3">
        {selectedChat ? (
          <ChatComponent
            chatId={selectedChat.id}
            chatName={selectedChat.name}
            chatAvatar={selectedChat.avatar}
            messages={selectedChat.messages}
            onSendMessage={(content) => onSendMessage(selectedChat.id, content)}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            チャットを選択してください
          </div>
        )}
      </main>
    </div>
  )
}