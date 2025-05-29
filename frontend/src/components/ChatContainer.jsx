import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../lib/utils";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // Lightbox modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const openImageModal = (src) => {
    setModalImageSrc(src);
    setModalOpen(true);
  };

  const closeImageModal = () => {
    setModalOpen(false);
    setModalImageSrc(null);
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 flex flex-col overflow-auto z-20">
        <ChatHeader />

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => {
            const isMe = message.senderId === authUser._id;
            const avatarSrc = isMe
              ? authUser.profilePic || "/avatar.png"
              : selectedUser.profilePic || "/avatar.png";

            return (
              <div
                key={message._id || idx}
                className={`chat ${isMe ? "chat-end" : "chat-start"}`}
              >
                <div
                  className="chat-image avatar cursor-pointer"
                  onClick={() => openImageModal(avatarSrc)}
                >
                  <div className="size-12 rounded-full border">
                    <img
                      src={avatarSrc}
                      alt="profile"
                      className="object-cover size-10 rounded-full"
                      style={{
                        objectPosition: isMe
                          ? authUser.profilePicPosition || "center"
                          : selectedUser.profilePicPosition || "center",
                      }}
                    />
                  </div>
                </div>

                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>

                <div className="chat-bubble flex flex-col break-words max-w-full sm:max-w-[70%]">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p className="break-words">{message.text}</p>}
                </div>
                <div ref={messageEndRef} />
              </div>
            );
          })}
        </div>

        <MessageInput />
      </div>

      {modalOpen && modalImageSrc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeImageModal}
        >
          <img
            src={modalImageSrc}
            alt="Full-size profile"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={closeImageModal}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
