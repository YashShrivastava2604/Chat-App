import { useState } from "react";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Lightbox modal state
  const [modalOpen, setModalOpen] = useState(false);

  const avatarSrc = selectedUser?.profilePic || "/avatar.png";

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (!selectedUser) return null;

  return (
    <>
      <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className="avatar cursor-pointer"
              onClick={openModal}
              title="View full size"
            >
              <div className="size-14 rounded-full overflow-hidden border">
                <img
                  src={avatarSrc}
                  alt={selectedUser.fullName}
                  className="object-cover size-10 rounded-full"
                  style={{
                    objectPosition:
                      selectedUser.profilePicPosition || "center",
                  }}
                />
              </div>
            </div>

            {/* User info */}
            <div>
              <h3 className="font-medium">{selectedUser.fullName}</h3>
              <p className="text-sm text-base-content/70">
                {onlineUsers.includes(selectedUser._id)
                  ? "Online"
                  : "Offline"}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setSelectedUser(null)}
            className="p-1 rounded hover:bg-base-200"
            title="Close chat"
          >
            <X />
          </button>
        </div>
      </div>

      {/* Avatar Lightbox Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <img
            src={avatarSrc}
            alt={`Full size ${selectedUser.fullName}`}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
