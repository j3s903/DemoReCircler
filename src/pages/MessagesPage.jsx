import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockConversations } from '../data/mockMessages';
import { mockUsers } from '../data/mockUsers';
import { mockItems } from '../data/mockItems';
import { formatRelativeTime } from '../utils/formatters';
import { Send, MessageSquare, ArrowLeft, Search } from 'lucide-react';

const MessagesPage = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, isLoggedIn } = useAuth();

  const [localConversations, setLocalConversations] = useState(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState(
    conversationId || null
  );
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (conversationId) {
      setSelectedConversationId(conversationId);
    }
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversationId, localConversations]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAFFFE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-10 h-10 text-[#4CAF50]" />
          </div>
          <h2 className="text-2xl font-bold text-[#212121] font-[Poppins] mb-2">
            Please log in to view messages
          </h2>
          <p className="text-[#757575] font-[Poppins] mb-6">
            You need to be logged in to access your conversations.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-[#4CAF50] text-white px-6 py-2.5 rounded-lg font-medium font-[Poppins] hover:bg-[#2E7D32] transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const userConversations = localConversations.filter((conv) =>
    conv.participants.includes(currentUser.id)
  );

  const filteredConversations = userConversations.filter((conv) => {
    if (!searchQuery.trim()) return true;
    const otherUserId = conv.participants.find((p) => p !== currentUser.id);
    const otherUser = mockUsers.find((u) => u.id === otherUserId);
    const item = mockItems.find((i) => i.id === conv.itemId);
    const query = searchQuery.toLowerCase();
    return (
      otherUser?.name.toLowerCase().includes(query) ||
      item?.title.toLowerCase().includes(query) ||
      conv.messages.some((m) => m.text.toLowerCase().includes(query))
    );
  });

  const selectedConversation = localConversations.find(
    (c) => c.id === selectedConversationId
  );

  const getOtherUser = (conversation) => {
    const otherUserId = conversation.participants.find(
      (p) => p !== currentUser.id
    );
    return mockUsers.find((u) => u.id === otherUserId);
  };

  const getConversationItem = (conversation) => {
    return mockItems.find((i) => i.id === conversation.itemId);
  };

  const handleSelectConversation = (convId) => {
    setSelectedConversationId(convId);
    navigate(`/messages/${convId}`, { replace: true });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConversationId) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: messageInput.trim(),
      timestamp: new Date().toISOString(),
    };

    setLocalConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessageTime: newMessage.timestamp,
            }
          : conv
      )
    );

    setMessageInput('');
    inputRef.current?.focus();
  };

  const handleBackToList = () => {
    setSelectedConversationId(null);
    navigate('/messages', { replace: true });
  };

  const totalUnread = userConversations.reduce(
    (acc, conv) => acc + conv.unread,
    0
  );

  return (
    <div className="min-h-screen bg-[#FAFFFE]">
      <div className="max-w-6xl mx-auto h-[calc(100vh-64px)]">
        <div className="flex h-full bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
          {/* Left Panel - Conversation List */}
          <div
            className={`w-full md:w-80 flex-shrink-0 border-r border-gray-100 flex flex-col ${
              selectedConversationId ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* List Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-lg font-bold text-[#212121] font-[Poppins]">
                  Messages
                </h1>
                {totalUnread > 0 && (
                  <span className="bg-[#4CAF50] text-white text-xs font-bold font-[Poppins] px-2 py-0.5 rounded-full">
                    {totalUnread}
                  </span>
                )}
              </div>
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#757575]" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-[Poppins] text-[#212121] placeholder:text-[#757575] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/30 focus:border-[#4CAF50] transition-all"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-6 text-center">
                  <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-[#757575] font-[Poppins]">
                    {searchQuery
                      ? 'No conversations match your search.'
                      : 'No conversations yet.'}
                  </p>
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const otherUser = getOtherUser(conv);
                  const item = getConversationItem(conv);
                  const lastMessage =
                    conv.messages[conv.messages.length - 1];
                  const isActive = conv.id === selectedConversationId;

                  return (
                    <button
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv.id)}
                      className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                        isActive ? 'bg-[#E8F5E9]' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={otherUser?.avatar}
                          alt={otherUser?.name}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <h3 className="text-sm font-semibold text-[#212121] font-[Poppins] truncate">
                              {otherUser?.name}
                            </h3>
                            <span className="text-[10px] text-[#757575] font-[Poppins] flex-shrink-0">
                              {formatRelativeTime(conv.lastMessageTime)}
                            </span>
                          </div>
                          {item && (
                            <p className="text-[10px] text-[#4CAF50] font-medium font-[Poppins] truncate mb-0.5">
                              {item.title}
                            </p>
                          )}
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs text-[#757575] font-[Poppins] truncate">
                              {lastMessage?.senderId === currentUser.id
                                ? 'You: '
                                : ''}
                              {lastMessage?.text}
                            </p>
                            {conv.unread > 0 && (
                              <span className="bg-[#4CAF50] text-white text-[10px] font-bold font-[Poppins] w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                                {conv.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel - Chat Area */}
          <div
            className={`flex-1 flex flex-col ${
              selectedConversationId ? 'flex' : 'hidden md:flex'
            }`}
          >
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                {(() => {
                  const otherUser = getOtherUser(selectedConversation);
                  const item = getConversationItem(selectedConversation);
                  return (
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                      <button
                        onClick={handleBackToList}
                        className="md:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors text-[#757575]"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <Link
                        to={`/profile/${otherUser?.id}`}
                        className="flex items-center gap-3 flex-1 min-w-0"
                      >
                        <img
                          src={otherUser?.avatar}
                          alt={otherUser?.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <h2 className="text-sm font-semibold text-[#212121] font-[Poppins] truncate">
                            {otherUser?.name}
                          </h2>
                          <p className="text-[10px] text-[#757575] font-[Poppins]">
                            {otherUser?.location?.area}
                          </p>
                        </div>
                      </Link>
                      {item && (
                        <Link
                          to={`/items/${item.id}`}
                          className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors flex-shrink-0"
                        >
                          <img
                            src={item.images?.[0]}
                            alt={item.title}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <span className="text-xs font-medium text-[#212121] font-[Poppins] max-w-[120px] truncate">
                            {item.title}
                          </span>
                        </Link>
                      )}
                    </div>
                  );
                })()}

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FAFFFE]">
                  {selectedConversation.messages.map((message) => {
                    const isOwn = message.senderId === currentUser.id;
                    const sender = mockUsers.find(
                      (u) => u.id === message.senderId
                    );

                    return (
                      <div
                        key={message.id}
                        className={`flex ${
                          isOwn ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`flex items-end gap-2 max-w-[75%] ${
                            isOwn ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <img
                            src={sender?.avatar}
                            alt={sender?.name}
                            className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                          />
                          <div>
                            <div
                              className={`px-4 py-2.5 rounded-2xl ${
                                isOwn
                                  ? 'bg-[#E8F5E9] text-[#212121] rounded-br-md'
                                  : 'bg-gray-100 text-[#212121] rounded-bl-md'
                              }`}
                            >
                              <p className="text-sm font-[Poppins] leading-relaxed">
                                {message.text}
                              </p>
                            </div>
                            <p
                              className={`text-[10px] text-[#757575] font-[Poppins] mt-1 ${
                                isOwn ? 'text-right' : 'text-left'
                              }`}
                            >
                              {formatRelativeTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form
                  onSubmit={handleSendMessage}
                  className="px-4 py-3 border-t border-gray-100 bg-white"
                >
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-[Poppins] text-[#212121] placeholder:text-[#757575] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/30 focus:border-[#4CAF50] transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!messageInput.trim()}
                      className="w-10 h-10 bg-[#4CAF50] text-white rounded-full flex items-center justify-center hover:bg-[#2E7D32] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center bg-[#FAFFFE]">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-[#4CAF50]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#212121] font-[Poppins] mb-1">
                    Select a conversation
                  </h3>
                  <p className="text-sm text-[#757575] font-[Poppins]">
                    Choose a conversation from the list to start messaging.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
