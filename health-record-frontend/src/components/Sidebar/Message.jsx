

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { io } from 'socket.io-client';
import {
  Search, Send, Phone, Video, MoreVertical, 
  Paperclip, Smile
} from "lucide-react";
import Sidebar from "../PatientDashboard/Sidebar";
import axios from 'axios';

export default function MessagesPage() {
  const { user, token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [typingUsers, setTypingUsers] = useState(new Set());

  const [search, setSearch] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const messagesEndRef = useRef(null);

  const API_BASE_URL = 'http://localhost:3000/api/v1/messages';
  const conversationsQuery = useQuery({
    queryKey: ['conversations', user?._id, search],
    queryFn: () => axios.get(`${API_BASE_URL}/conversations`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { search, page: 1, limit: 50 }
    }).then(res => res.data.conversations || []),
    enabled: !!user?._id && !!token,
  });

  // 🔥 2. SELECTED CONVERSATION MESSAGES
  const messagesQuery = useQuery({
    queryKey: ['messages', selectedConversation?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { conversationId: selectedConversation?._id }
    }).then(res => res.data.messages || []),
    enabled: !!selectedConversation?._id && !!user?._id && !!token,
    onSuccess: (data) => {
      // Auto-scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  });
  // 🔥 SOCKET.IO CONNECTION - YOUR EXISTING SETUP
 // 🔥 ADD ALL MISSING HANDLERS - Copy-paste this block
const handleNewMessage = useCallback((data) => {
  console.log('📨 New message:', data.content);
  if (selectedConversation?._id === data.conversationId) {
    messagesQuery.refetch();
  }
  conversationsQuery.refetch();
}, [selectedConversation?._id, messagesQuery, conversationsQuery]);

const handleMessageSent = useCallback((data) => {
  console.log('✅ Your message sent:', data.content);
  if (selectedConversation?._id === data.conversationId) {
    messagesQuery.refetch();
  }
}, [selectedConversation?._id, messagesQuery]);

// 🔥 ADD THESE MISSING HANDLERS
const handleMessageRead = useCallback((data) => {
  console.log('📖 Message read:', data.messageId);
  // Update read status in UI
  messagesQuery.refetch();
}, [messagesQuery]);

const handleTyping = useCallback((data) => {
  console.log('⌨️ Typing:', data.userId, data.isTyping);
  if (data.conversationId === selectedConversation?._id) {
    if (data.isTyping) {
      setTypingUsers(prev => new Set(prev).add(data.userId));
    } else {
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(data.userId);
        return newSet;
      });
    }
  }
}, [selectedConversation?._id]);

// 🔥 Socket connection with ALL handlers
useEffect(() => {
  if (!token || !user?._id) return;

  const socketIo = io('http://localhost:3000', {
    auth: {
      token: token,
      userId: user._id,
      role: user.role || 'PATIENT',
      name: user.name || user.fullName || 'User'
    }
  });

  socketIo.on('connect', () => {
    console.log('✅ Socket connected:', socketIo.id);
  });

  // 🔥 ALL EVENT HANDLERS
  socketIo.on('newMessage', handleNewMessage);
  socketIo.on('messageSent', handleMessageSent);
  socketIo.on('messageReadStatus', handleMessageRead);  // ✅ Now defined
  socketIo.on('userTyping', handleTyping);

  socketIo.on('disconnect', () => {
    console.log('❌ Socket disconnected');
  });

  socketIo.on('connect_error', (error) => {
    console.error('Socket error:', error);
  });

  setSocket(socketIo);

  return () => {
    socketIo.disconnect();
  };
}, [token, user, handleNewMessage, handleMessageSent, handleMessageRead, handleTyping]);

  // 🔥 JOIN CONVERSATION
  useEffect(() => {
    if (socket && selectedConversation?._id) {
      socket.emit('joinConversation', selectedConversation._id);
      socket.emit('userOnline', selectedConversation._id);
    }
  }, [socket, selectedConversation?._id]);

  // 🔥 TYPING EFFECT
  const handleTypingInput = (e) => {
    setNewMessage(e.target.value);
    
    if (socket && selectedConversation?._id) {
      if (e.target.value.trim()) {
        socket.emit('typing', {
          conversationId: selectedConversation._id
        });
        if (typingTimeout) clearTimeout(typingTimeout);
        setTypingTimeout(setTimeout(() => {
          socket.emit('stopTyping', { conversationId: selectedConversation._id });
        }, 1000));
      } else {
        socket.emit('stopTyping', { conversationId: selectedConversation._id });
      }
    }
  };

  // 🔥 SEND MESSAGE - USES YOUR SOCKET
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation || !socket) return;

    socket.emit('sendMessage', {
      conversationId: selectedConversation._id,
      content: newMessage.trim()
    });

    setNewMessage('');
    setIsTyping(false);
  };


  const formatTimeAgo = (dateString) => {
  if (!dateString) return 'Never';
  const now = new Date();
  const diffMs = now - new Date(dateString);
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffMins < 1440) return `${Math.floor(diffMins/60)}h`;
  return `${Math.floor(diffMins/1440)}d`;
};

  // 🔥 1. CONVERSATIONS LIST




  // 🔥 Send message
  // const sendMessage = async () => {
  //   if (!newMessage.trim() || !selectedConversation) return;

  //   try {
  //     const response = await axios.post(`${API_BASE_URL}/`, {
  //       conversationId: selectedConversation._id,
  //       content: newMessage.trim()
  //     }, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });

  //     setNewMessage('');
  //     // Refetch messages to show new message
  //     window.dispatchEvent(new CustomEvent('refetchMessages'));
  //   } catch (error) {
  //     console.error('Send message error:', error);
  //   }
  // };

  // 🔥 Select conversation
  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const conversations = conversationsQuery.data || [];
  const chatMessages = messagesQuery.data || [];

  return (
    <div className="flex min-h-screen bg-[#dfe6f7]">
      <Sidebar />

      <div className="flex-1 p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-[#081028]">Messages</h1>
            <p className="text-gray-600 mt-2">Chat securely with doctors and healthcare providers.</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-md w-[320px]">
            <Search className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 h-[82vh]">
          {/* LEFT - Conversations */}
          <div className="bg-[#08153b] rounded-3xl p-5 shadow-2xl overflow-y-auto">
            <h2 className="text-white text-2xl font-bold mb-6">Conversations</h2>
            <div className="space-y-4">
              {conversationsQuery.isLoading ? (
                <div className="text-gray-400 text-center py-8">Loading conversations...</div>
              ) : conversationsQuery.isError ? (
                <div className="text-red-400 text-center py-8">Failed to load conversations</div>
              ) : conversations.length === 0 ? (
                <div className="text-gray-400 text-center py-12">
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No conversations found</p>
                </div>
              ) : (
                conversations.map((conversation) => {
                  const otherParticipant = conversation.otherParticipant || conversation.participants?.[0];
                  const lastMessage = conversation.lastMessage?.content || 'No messages yet';
                  const timeAgo = conversation.lastMessage?.createdAt 
                    ? formatTimeAgo(conversation.lastMessage?.createdAt)
                    : 'Never';

                  return (
                    <div
                      key={conversation._id}
                      onClick={() => selectConversation(conversation)}
                      className={`p-4 rounded-2xl cursor-pointer transition hover:bg-white/10 ${
                        selectedConversation?._id === conversation._id
                          ? 'bg-gradient-to-r from-[#7f5af0] to-[#4f6df5]'
                          : 'bg-white/5'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={otherParticipant?.avatar || 'https://i.pravatar.cc/100'}
                          alt="profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-white font-semibold truncate">
                              {otherParticipant?.name || otherParticipant?.fullName || 'Unknown'}
                            </h3>
                            <span className="text-xs text-gray-300">
                              {timeAgo}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1 truncate max-w-[200px]">
                            {lastMessage}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <span className="ml-auto text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT - Chat Window */}
          <div className="bg-[#08153b] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedConversation.otherParticipant?.avatar || 'https://i.pravatar.cc/100'}
                      alt="doctor"
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-white text-xl font-semibold">
                        {selectedConversation.otherParticipant?.name || 'Doctor'}
                      </h2>
                      <p className="text-green-400 text-sm">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                      <Phone size={18} />
                    </button>
                    <button className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                      <Video size={18} />
                    </button>
                    <button className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-gradient-to-b from-[#08153b] to-[#0d1c4d]">
                  {messagesQuery.isLoading ? (
                    <div className="text-center py-12 text-gray-400">Loading messages...</div>
                  ) : chatMessages.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <Send className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    chatMessages.map((msg) => {
                      const isOwnMessage = msg.sender._id === user._id;
                      return (
                        <div
                          key={msg._id}
                          className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] px-5 py-4 rounded-3xl text-sm shadow-lg ${
                            isOwnMessage
                              ? 'bg-gradient-to-r from-[#7f5af0] to-[#4f6df5] text-white'
                              : 'bg-white/10 text-gray-200'
                          }`}>
                            {msg.content}
                            {msg.attachment && (
                              <div className="mt-2">
                                <a href={msg.attachment.url} target="_blank" className="text-xs underline">
                                  📎 {msg.attachment.filename}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-5 border-t border-white/10">
                  <div className="bg-white/10 rounded-2xl px-4 py-3 flex items-center gap-3">
                    <button className="text-gray-300 hover:text-white p-2">
                      <Paperclip size={20} />
                    </button>
                    <input
                    type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={handleTypingInput}  // 🔥 Typing effect
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                       className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400"
                        />
                    <button className="text-gray-300 hover:text-white p-2">
                      <Smile size={20} />
                    </button>
                    <button 
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="h-11 w-11 rounded-xl bg-gradient-to-r from-[#7f5af0] to-[#4f6df5] flex items-center justify-center text-white shadow-lg disabled:opacity-50"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-[#08153b] to-[#0d1c4d] rounded-3xl">
                <div className="text-center text-gray-400">
                  <Send className="w-20 h-20 mx-auto mb-6 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                  <p>Choose a conversation from the left to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}