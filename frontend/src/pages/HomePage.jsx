
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <>

      <div className="min-h-screen bg-base-200 overflow-hidden">
        {/* animated blobs */}
      <div
        className="fixed w-[600px] h-[600px] bg-primary opacity-30 rounded-full filter blur-3xl animate-blob"
        style={{ top: "-10%", left: "-10%" }}
      />
      <div
        className="fixed w-[500px] h-[500px] bg-secondary opacity-35 rounded-full filter blur-2xl animate-blob animation-delay-2000"
        style={{ top: "0%", right: "-15%" }}
      />
      <div
        className="fixed w-[550px] h-[550px] bg-accent opacity-20 rounded-full filter blur-2xl animate-blob animation-delay-4000"
        style={{ top: "50%", right: "24%" }}
      />
      
        <div className="flex items-center justify-center pt-20 px-4 z-20">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex text-lg h-full rounded-lg overflow-hidden z-20">
              <Sidebar />
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
