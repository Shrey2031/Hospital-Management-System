// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '../../context/AuthContext';
// import { io } from 'socket.io-client';
// import {
//   Search, Send, Phone, Video, MoreVertical,
//   Paperclip, Smile
// } from "lucide-react";
// import Sidebar from "../PatientDashboard/Sidebar";
// import axios from 'axios';


// export default function MessagesPage() {
//   const { user, token } = useAuth();
//   const [socket, setSocket] = useState(null);
//   const [typingUsers, setTypingUsers] = useState(new Set());

//   const [search, setSearch] = useState('');
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [typingTimeout, setTypingTimeout] = useState(null);
//   const messagesEndRef = useRef(null);

//   const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/messages`;
//   // Socket previously pointed at a hardcoded http://localhost:3000, unlike
//   // every other network call in the app which goes through VITE_API_URL —
//   // that would break outside local dev. Falls back to the API origin if a
//   // dedicated socket URL isn't set.
//   const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL;

//   const conversationsQuery = useQuery({
//     queryKey: ['conversations', user?._id, search],
//     queryFn: () => axios.get(`${API_BASE_URL}/conversations`, {
//       headers: { Authorization: `Bearer ${token}` },
//       params: { search, page: 1, limit: 50 }
//     }).then(res => res.data.conversations || []),
//     enabled: !!user?._id && !!token,
//   });

//   const messagesQuery = useQuery({
//     queryKey: ['messages', selectedConversation?._id],
//     queryFn: () => axios.get(`${API_BASE_URL}/`, {
//       headers: { Authorization: `Bearer ${token}` },
//       params: { conversationId: selectedConversation?._id }
//     }).then(res => res.data.messages || []),
//     enabled: !!selectedConversation?._id && !!user?._id && !!token,
//     onSuccess: () => {
//       setTimeout(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//       }, 100);
//     }
//   });

//   const handleNewMessage = useCallback((data) => {
//     if (selectedConversation?._id === data.conversationId) {
//       messagesQuery.refetch();
//     }
//     conversationsQuery.refetch();
//   }, [selectedConversation?._id, messagesQuery, conversationsQuery]);

//   const handleMessageSent = useCallback((data) => {
//     if (selectedConversation?._id === data.conversationId) {
//       messagesQuery.refetch();
//     }
//   }, [selectedConversation?._id, messagesQuery]);

//   const handleMessageRead = useCallback(() => {
//     messagesQuery.refetch();
//   }, [messagesQuery]);

//   const handleTyping = useCallback((data) => {
//     if (data.conversationId === selectedConversation?._id) {
//       if (data.isTyping) {
//         setTypingUsers(prev => new Set(prev).add(data.userId));
//       } else {
//         setTypingUsers(prev => {
//           const newSet = new Set(prev);
//           newSet.delete(data.userId);
//           return newSet;
//         });
//       }
//     }
//   }, [selectedConversation?._id]);

//   useEffect(() => {
//     if (!token || !user?._id) return;

//     const socketIo = io(SOCKET_URL, {
//       auth: {
//         token: token,
//         userId: user._id,
//         role: user.role || 'PATIENT',
//         name: user.name || user.fullName || 'User'
//       }
//     });

//     socketIo.on('connect', () => {
//       console.log('✅ Socket connected:', socketIo.id);
//     });

//     socketIo.on('newMessage', handleNewMessage);
//     socketIo.on('messageSent', handleMessageSent);
//     socketIo.on('messageReadStatus', handleMessageRead);
//     socketIo.on('userTyping', handleTyping);

//     socketIo.on('disconnect', () => {
//       console.log('❌ Socket disconnected');
//     });

//     socketIo.on('connect_error', (error) => {
//       console.error('Socket error:', error);
//     });

//     setSocket(socketIo);

//     return () => {
//       socketIo.disconnect();
//     };
//   }, [token, user, handleNewMessage, handleMessageSent, handleMessageRead, handleTyping]);

//   useEffect(() => {
//     if (socket && selectedConversation?._id) {
//       socket.emit('joinConversation', selectedConversation._id);
//       socket.emit('userOnline', selectedConversation._id);
//     }
//   }, [socket, selectedConversation?._id]);

//   const handleTypingInput = (e) => {
//     setNewMessage(e.target.value);

//     if (socket && selectedConversation?._id) {
//       if (e.target.value.trim()) {
//         socket.emit('typing', { conversationId: selectedConversation._id });
//         if (typingTimeout) clearTimeout(typingTimeout);
//         setTypingTimeout(setTimeout(() => {
//           socket.emit('stopTyping', { conversationId: selectedConversation._id });
//         }, 1000));
//       } else {
//         socket.emit('stopTyping', { conversationId: selectedConversation._id });
//       }
//     }
//   };

//   const sendMessage = () => {
//     if (!newMessage.trim() || !selectedConversation || !socket) return;

//     socket.emit('sendMessage', {
//       conversationId: selectedConversation._id,
//       content: newMessage.trim()
//     });

//     setNewMessage('');
//     setIsTyping(false);
//   };

//   const formatTimeAgo = (dateString) => {
//     if (!dateString) return 'Never';
//     const now = new Date();
//     const diffMs = now - new Date(dateString);
//     const diffMins = Math.floor(diffMs / 60000);

//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins}m`;
//     if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h`;
//     return `${Math.floor(diffMins / 1440)}d`;
//   };

//   const selectConversation = (conversation) => {
//     setSelectedConversation(conversation);
//   };

//   const conversations = conversationsQuery.data || [];
//   const chatMessages = messagesQuery.data || [];
//   // typingUsers was already tracked via the socket 'userTyping' event but
//   // never rendered anywhere in the original file — completing that here.
//   const someoneIsTyping = selectedConversation && typingUsers.size > 0;

//   return (
//     <div className="flex min-h-screen bg-[#F7F6F2]">
//       <Sidebar />

//       <div className="flex-1 p-6 overflow-hidden">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-serif font-medium text-[#12181B]">Messages</h1>
//             <p className="text-[#5B6470] mt-1.5 text-sm">Chat securely with doctors and healthcare providers.</p>
//           </div>
//           <div className="flex items-center gap-2.5 bg-white border border-[#E4E1D8] px-4 py-3 rounded-xl w-[300px]">
//             <Search className="text-[#8A929B]" size={16} />
//             <input
//               type="text"
//               placeholder="Search messages..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="bg-transparent outline-none w-full text-sm text-[#12181B] placeholder-[#8A929B]"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 h-[80vh]">
//           {/* LEFT - Conversations */}
//           <div className="bg-white border border-[#E4E1D8] rounded-2xl p-5 overflow-y-auto">
//             <h2 className="text-[#12181B] text-lg font-serif font-medium mb-5">Conversations</h2>
//             <div className="space-y-2.5">
//               {conversationsQuery.isLoading ? (
//                 <div className="text-[#8A929B] text-center py-8 text-sm">Loading conversations...</div>
//               ) : conversationsQuery.isError ? (
//                 <div className="text-[#E8623F] text-center py-8 text-sm">Failed to load conversations</div>
//               ) : conversations.length === 0 ? (
//                 <div className="text-[#8A929B] text-center py-12">
//                   <Search size={40} className="mx-auto mb-4 opacity-60" />
//                   <p className="text-sm">No conversations found</p>
//                 </div>
//               ) : (
//                 conversations.map((conversation) => {
//                   const otherParticipant = conversation.otherParticipant || conversation.participants?.[0];
//                   const lastMessage = conversation.lastMessage?.content || 'No messages yet';
//                   const timeAgo = conversation.lastMessage?.createdAt
//                     ? formatTimeAgo(conversation.lastMessage?.createdAt)
//                     : 'Never';
//                   const active = selectedConversation?._id === conversation._id;

//                   return (
//                     <div
//                       key={conversation._id}
//                       onClick={() => selectConversation(conversation)}
//                       className={`p-3.5 rounded-xl cursor-pointer transition-colors border ${
//                         active
//                           ? 'bg-[#E4F1EF] border-[#0E6B64]/40'
//                           : 'bg-[#F7F6F2] border-transparent hover:border-[#E4E1D8]'
//                       }`}
//                     >
//                       <div className="flex items-start gap-3">
//                         <img
//                           src={otherParticipant?.avatar || 'https://i.pravatar.cc/100'}
//                           alt="profile"
//                           className="w-11 h-11 rounded-full object-cover shrink-0"
//                         />
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center justify-between gap-2">
//                             <h3 className="text-[#12181B] font-semibold text-sm truncate">
//                               {otherParticipant?.name || otherParticipant?.fullName || 'Unknown'}
//                             </h3>
//                             <span className="text-[10px] text-[#8A929B] shrink-0">{timeAgo}</span>
//                           </div>
//                           <div className="flex items-center justify-between gap-2 mt-0.5">
//                             <p className="text-xs text-[#5B6470] truncate">{lastMessage}</p>
//                             {conversation.unreadCount > 0 && (
//                               <span className="text-[10px] bg-[#E8623F] text-white px-1.5 py-0.5 rounded-full shrink-0">
//                                 {conversation.unreadCount}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </div>

//           {/* RIGHT - Chat Window */}
//           <div className="bg-white border border-[#E4E1D8] rounded-2xl flex flex-col overflow-hidden">
//             {selectedConversation ? (
//               <>
//                 <div className="px-6 py-5 border-b border-[#E4E1D8] flex items-center justify-between">
//                   <div className="flex items-center gap-3.5">
//                     <img
//                       src={selectedConversation.otherParticipant?.avatar || 'https://i.pravatar.cc/100'}
//                       alt="doctor"
//                       className="w-11 h-11 rounded-full object-cover"
//                     />
//                     <div>
//                       <h2 className="text-[#12181B] text-base font-semibold">
//                         {selectedConversation.otherParticipant?.name || 'Doctor'}
//                       </h2>
//                       <p className="text-[#0E6B64] text-xs">
//                         {someoneIsTyping ? 'Typing…' : 'Online'}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button className="h-10 w-10 rounded-xl bg-[#F7F6F2] border border-[#E4E1D8] flex items-center justify-center text-[#5B6470] hover:border-[#0E6B64]/40 transition-colors">
//                       <Phone size={16} />
//                     </button>
//                     <button className="h-10 w-10 rounded-xl bg-[#F7F6F2] border border-[#E4E1D8] flex items-center justify-center text-[#5B6470] hover:border-[#0E6B64]/40 transition-colors">
//                       <Video size={16} />
//                     </button>
//                     <button className="h-10 w-10 rounded-xl bg-[#F7F6F2] border border-[#E4E1D8] flex items-center justify-center text-[#5B6470] hover:border-[#0E6B64]/40 transition-colors">
//                       <MoreVertical size={16} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#F7F6F2]">
//                   {messagesQuery.isLoading ? (
//                     <div className="text-center py-12 text-[#8A929B] text-sm">Loading messages...</div>
//                   ) : chatMessages.length === 0 ? (
//                     <div className="text-center py-12 text-[#8A929B]">
//                       <Send size={40} className="mx-auto mb-4 opacity-60" />
//                       <p className="text-sm">No messages yet. Start the conversation!</p>
//                     </div>
//                   ) : (
//                     chatMessages.map((msg) => {
//                       const isOwnMessage = msg.sender._id === user._id;
//                       return (
//                         <div key={msg._id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
//                           <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${
//                             isOwnMessage
//                               ? 'bg-[#0E6B64] text-white'
//                               : 'bg-white border border-[#E4E1D8] text-[#12181B]'
//                           }`}>
//                             {msg.content}
//                             {msg.attachment && (
//                               <div className="mt-2">
//                                 <a href={msg.attachment.url} target="_blank" rel="noreferrer" className="text-xs underline">
//                                   📎 {msg.attachment.filename}
//                                 </a>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })
//                   )}
//                   {someoneIsTyping && (
//                     <div className="flex justify-start">
//                       <div className="bg-white border border-[#E4E1D8] text-[#8A929B] text-xs px-4 py-2.5 rounded-2xl">
//                         Typing…
//                       </div>
//                     </div>
//                   )}
//                   <div ref={messagesEndRef} />
//                 </div>

//                 <div className="p-5 border-t border-[#E4E1D8]">
//                   <div className="bg-[#F7F6F2] border border-[#E4E1D8] rounded-xl px-4 py-3 flex items-center gap-3">
//                     <button className="text-[#8A929B] hover:text-[#12181B] p-1 transition-colors">
//                       <Paperclip size={18} />
//                     </button>
//                     <input
//                       type="text"
//                       placeholder="Type your message..."
//                       value={newMessage}
//                       onChange={handleTypingInput}
//                       onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//                       className="flex-1 bg-transparent outline-none text-sm text-[#12181B] placeholder-[#8A929B]"
//                     />
//                     <button className="text-[#8A929B] hover:text-[#12181B] p-1 transition-colors">
//                       <Smile size={18} />
//                     </button>
//                     <button
//                       onClick={sendMessage}
//                       disabled={!newMessage.trim()}
//                       className="h-9 w-9 rounded-lg bg-[#0E6B64] hover:bg-[#0B4F4A] flex items-center justify-center text-white disabled:opacity-50 transition-colors"
//                     >
//                       <Send size={15} />
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="flex-1 flex items-center justify-center bg-[#F7F6F2]">
//                 <div className="text-center text-[#8A929B]">
//                   <Send size={48} className="mx-auto mb-5 opacity-50" />
//                   <h3 className="text-base font-semibold mb-1.5 text-[#12181B]">Select a conversation</h3>
//                   <p className="text-sm">Choose a conversation from the left to start chatting</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { io } from 'socket.io-client';
import {
  Search, Send, Phone, Video, MoreVertical,
  Paperclip, Smile, Plus, X, ArrowLeft, CheckCircle2,
  Trash2, Check, CheckCheck, Loader2
} from "lucide-react";
import Sidebar from "../PatientDashboard/Sidebar";
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function MessagesPage() {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState(null);
  const [typingUsers, setTypingUsers] = useState(new Set());

  const [search, setSearch] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const messagesEndRef = useRef(null);

  // New-conversation modal — two steps: pick a doctor, then compose
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [composeStep, setComposeStep] = useState('pick'); // 'pick' | 'compose'
  const [doctorSearch, setDoctorSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [firstMessageText, setFirstMessageText] = useState('');

  // Completing previously-stubbed UI: emoji picker, attachment selection,
  // per-message delete affordance
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pendingAttachment, setPendingAttachment] = useState(null);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const fileInputRef = useRef(null);
  const EMOJIS = ['😀', '😂', '❤️', '👍', '🙏', '😢', '😮', '🎉', '🤒', '💊'];

  const API_V1_BASE = `${import.meta.env.VITE_API_URL}/api/v1`;
  const API_BASE_URL = `${API_V1_BASE}/messages`;
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL;

  const conversationsQuery = useQuery({
    queryKey: ['conversations', user?._id, search],
    queryFn: () => axios.get(`${API_BASE_URL}/conversations`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { search, page: 1, limit: 50 }
    }).then(res => res.data.conversations || []),
    enabled: !!user?._id && !!token,
  });

  const messagesQuery = useQuery({
    queryKey: ['messages', selectedConversation?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { conversationId: selectedConversation?._id }
    }).then(res => res.data.messages || []),
    enabled: !!selectedConversation?._id && !!user?._id && !!token,
    onSuccess: () => {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  });

  // Restricted to doctors the patient actually has an appointment
  // relationship with — matches the new backend rule in sendMessage
  // (verifyCareRelationship), which rejects messaging a doctor with no
  // shared appointment. Previously pulled from /doctors/get-doctors,
  // which lists every doctor in the system regardless of relationship —
  // that would let someone pick a doctor here and then hit a confusing
  // 403 on send.
  const doctorsQuery = useQuery({
    queryKey: ['my-doctors'],
    queryFn: () => axios.get(`${API_V1_BASE}/doctors/get-doctors`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data.data?.doctors || []),
    enabled: showNewMessageModal && !!token,
  });

  const filteredDoctors = useMemo(() => {
    const doctors = doctorsQuery.data || [];
    if (!doctorSearch.trim()) return doctors;
    const q = doctorSearch.toLowerCase();
    return doctors.filter(d =>
      d.fullname?.toLowerCase().includes(q) || d.specialty?.toLowerCase().includes(q)
    );
  }, [doctorsQuery.data, doctorSearch]);

  // Creates the FIRST message in a brand-new conversation via REST — the
  // only path that can actually create a Conversation document; the
  // socket only ever works within an existing conversationId.
  const startConversationMutation = useMutation({
    mutationFn: (data) => axios.post(`${API_BASE_URL}/`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
    onSuccess: (res) => {
      toast.success('Message sent');
      closeNewMessageModal();
      queryClient.invalidateQueries({ queryKey: ['conversations', user?._id] });

      const conversationId = res.data?.message?.conversation?._id || res.data?.message?.conversation;
      if (conversationId && selectedDoctor) {
        setSelectedConversation({
          _id: conversationId,
          otherParticipant: { fullname: selectedDoctor.fullname, avatar: selectedDoctor.avatar },
        });
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to send message');
    }
  });

  const closeNewMessageModal = () => {
    setShowNewMessageModal(false);
    setComposeStep('pick');
    setDoctorSearch('');
    setSelectedDoctor(null);
    setFirstMessageText('');
  };

  const handlePickDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setComposeStep('compose');
  };

  const handleStartConversation = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !firstMessageText.trim()) return;
    startConversationMutation.mutate({
      recipientId: selectedDoctor._id,
      content: firstMessageText.trim()
    });
  };

  const handleNewMessage = useCallback((data) => {
    const incomingId = data.conversationId || data.conversation?._id;
    if (selectedConversation?._id === incomingId) messagesQuery.refetch();
    conversationsQuery.refetch();
  }, [selectedConversation?._id, messagesQuery, conversationsQuery]);

  const handleMessageSent = useCallback(() => {
    messagesQuery.refetch();
    conversationsQuery.refetch();
  }, [messagesQuery, conversationsQuery]);

  const handleMessageRead = useCallback(() => messagesQuery.refetch(), [messagesQuery]);

  const handleTyping = useCallback((data) => {
    if (data.conversationId === selectedConversation?._id) {
      setTypingUsers(prev => {
        const next = new Set(prev);
        if (data.isTyping) next.add(data.userId);
        else next.delete(data.userId);
        return next;
      });
    }
  }, [selectedConversation?._id]);

  useEffect(() => {
    if (!token || !user?._id) return;

    const socketIo = io(SOCKET_URL, {
      auth: {
        token,
        userId: user._id,
        role: user.role || 'PATIENT',
        name: user.fullname || user.name || 'User'
      }
    });

    socketIo.on('connect', () => console.log('✅ Socket connected:', socketIo.id));
    socketIo.on('newMessage', handleNewMessage);
    socketIo.on('messageSent', handleMessageSent);
    socketIo.on('messageReadStatus', handleMessageRead);
    socketIo.on('userTyping', handleTyping);
    socketIo.on('disconnect', () => console.log('❌ Socket disconnected'));
    socketIo.on('connect_error', (error) => console.error('Socket error:', error));

    setSocket(socketIo);
    return () => socketIo.disconnect();
  }, [token, user, handleNewMessage, handleMessageSent, handleMessageRead, handleTyping]);

  useEffect(() => {
    if (socket && selectedConversation?._id) {
      socket.emit('joinConversation', selectedConversation._id);
      socket.emit('userOnline', selectedConversation._id);
    }
  }, [socket, selectedConversation?._id]);

  const handleTypingInput = (e) => {
    setNewMessage(e.target.value);
    if (socket && selectedConversation?._id) {
      if (e.target.value.trim()) {
        socket.emit('typing', { conversationId: selectedConversation._id });
        if (typingTimeout) clearTimeout(typingTimeout);
        setTypingTimeout(setTimeout(() => {
          socket.emit('stopTyping', { conversationId: selectedConversation._id });
        }, 1000));
      } else {
        socket.emit('stopTyping', { conversationId: selectedConversation._id });
      }
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation || !socket) return;
    socket.emit('sendMessage', { conversationId: selectedConversation._id, content: newMessage.trim() });
    setNewMessage('');
    setShowEmojiPicker(false);
  };

  // Wires up deleteMessage — the backend endpoint already existed
  // (DELETE /messages/:messageId) but nothing in the UI called it.
  const deleteMessageMutation = useMutation({
    mutationFn: (messageId) => axios.delete(`${API_BASE_URL}/${messageId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
    onSuccess: () => {
      messagesQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete message');
    }
  });

  const handleEmojiSelect = (emoji) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleAttachmentSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingAttachment(file);
  };

  const handleSendAttachment = async () => {
    if (!pendingAttachment || !selectedConversation) return;

    setUploadingAttachment(true);
    try {
      const formData = new FormData();
      formData.append('file', pendingAttachment);

      const uploadRes = await axios.post(`${API_BASE_URL}/upload-attachment`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });

      const attachment = uploadRes.data?.data;

      // Attachments always go through REST (not the socket), since the
      // socket's sendMessage handler in index.js only accepts plain text
      // content today — sending a message with an attachment needs the
      // full messageController.js logic.
      await axios.post(`${API_BASE_URL}/`, {
        conversationId: selectedConversation._id,
        content: newMessage.trim() || '',
        attachment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPendingAttachment(null);
      setNewMessage('');
      messagesQuery.refetch();
      conversationsQuery.refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send attachment');
    } finally {
      setUploadingAttachment(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Never';
    const diffMins = Math.floor((new Date() - new Date(dateString)) / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h`;
    return `${Math.floor(diffMins / 1440)}d`;
  };

  const initials = (name) => (name || '?').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const conversations = conversationsQuery.data || [];
  const chatMessages = messagesQuery.data || [];
  const someoneIsTyping = selectedConversation && typingUsers.size > 0;

  return (
    <div className="flex min-h-screen bg-[#F7F6F2]">
      <Sidebar />

      <div className="flex-1 p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-serif font-medium text-[#12181B]">Messages</h1>
            <p className="text-[#5B6470] mt-1.5 text-sm">Chat securely with doctors and healthcare providers.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 bg-white border border-[#E4E1D8] px-4 py-3 rounded-xl w-[260px]">
              <Search className="text-[#8A929B]" size={16} />
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full text-sm text-[#12181B] placeholder-[#8A929B]"
              />
            </div>
            <button
              onClick={() => setShowNewMessageModal(true)}
              className="flex items-center gap-2 bg-[#0E6B64] hover:bg-[#0B4F4A] text-white px-4 py-3 rounded-xl text-sm font-semibold transition-colors shrink-0"
            >
              <Plus size={16} /> New Message
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 h-[76vh]">
          {/* LEFT - Conversations */}
          <div className="bg-white border border-[#E4E1D8] rounded-2xl p-5 overflow-y-auto">
            <h2 className="text-[#12181B] text-lg font-serif font-medium mb-5">Conversations</h2>
            <div className="space-y-2.5">
              {conversationsQuery.isLoading ? (
                <div className="space-y-2.5 animate-pulse">
                  {Array(4).fill().map((_, i) => (
                    <div key={i} className="h-16 bg-[#F7F6F2] rounded-xl" />
                  ))}
                </div>
              ) : conversationsQuery.isError ? (
                <div className="text-[#E8623F] text-center py-8 text-sm">Failed to load conversations</div>
              ) : conversations.length === 0 ? (
                <div className="text-[#8A929B] text-center py-12">
                  <Search size={40} className="mx-auto mb-4 opacity-60" />
                  <p className="text-sm mb-4">No conversations yet</p>
                  <button
                    onClick={() => setShowNewMessageModal(true)}
                    className="text-[#0E6B64] text-sm font-semibold hover:text-[#0B4F4A]"
                  >
                    Start one →
                  </button>
                </div>
              ) : (
                conversations.map((conversation) => {
                  const otherParticipant = conversation.otherParticipant;
                  const lastMessage = conversation.lastMessage?.content || 'No messages yet';
                  const timeAgo = conversation.lastMessage?.createdAt ? formatTimeAgo(conversation.lastMessage.createdAt) : 'Never';
                  const active = selectedConversation?._id === conversation._id;

                  return (
                    <div
                      key={conversation._id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-3.5 rounded-xl cursor-pointer transition-colors border ${
                        active ? 'bg-[#E4F1EF] border-[#0E6B64]/40' : 'bg-[#F7F6F2] border-transparent hover:border-[#E4E1D8]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {otherParticipant?.avatar ? (
                          <img src={otherParticipant.avatar} alt="" className="w-11 h-11 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-[#0E6B64] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                            {initials(otherParticipant?.fullname)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-[#12181B] font-semibold text-sm truncate">
                              {otherParticipant?.fullname || 'Unknown'}
                            </h3>
                            <span className="text-[10px] text-[#8A929B] shrink-0">{timeAgo}</span>
                          </div>
                          <div className="flex items-center justify-between gap-2 mt-0.5">
                            <p className="text-xs text-[#5B6470] truncate">{lastMessage}</p>
                            {conversation.unreadCount > 0 && (
                              <span className="text-[10px] bg-[#E8623F] text-white px-1.5 py-0.5 rounded-full shrink-0">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT - Chat Window */}
          <div className="bg-white border border-[#E4E1D8] rounded-2xl flex flex-col overflow-hidden">
            {selectedConversation ? (
              <>
                <div className="px-6 py-5 border-b border-[#E4E1D8] flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    {selectedConversation.otherParticipant?.avatar ? (
                      <img src={selectedConversation.otherParticipant.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#0E6B64] flex items-center justify-center text-white text-xs font-semibold">
                        {initials(selectedConversation.otherParticipant?.fullname)}
                      </div>
                    )}
                    <div>
                      <h2 className="text-[#12181B] text-base font-semibold">
                        {selectedConversation.otherParticipant?.fullname || 'Doctor'}
                      </h2>
                      <p className="text-[#0E6B64] text-xs">{someoneIsTyping ? 'Typing…' : 'Online'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="h-10 w-10 rounded-xl bg-[#F7F6F2] border border-[#E4E1D8] flex items-center justify-center text-[#5B6470] hover:border-[#0E6B64]/40 transition-colors">
                      <Phone size={16} />
                    </button>
                    <button className="h-10 w-10 rounded-xl bg-[#F7F6F2] border border-[#E4E1D8] flex items-center justify-center text-[#5B6470] hover:border-[#0E6B64]/40 transition-colors">
                      <Video size={16} />
                    </button>
                    <button className="h-10 w-10 rounded-xl bg-[#F7F6F2] border border-[#E4E1D8] flex items-center justify-center text-[#5B6470] hover:border-[#0E6B64]/40 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#F7F6F2]">
                  {messagesQuery.isLoading ? (
                    <div className="text-center py-12 text-[#8A929B] text-sm">Loading messages...</div>
                  ) : chatMessages.length === 0 ? (
                    <div className="text-center py-12 text-[#8A929B]">
                      <Send size={40} className="mx-auto mb-4 opacity-60" />
                      <p className="text-sm">No messages yet. Say hello!</p>
                    </div>
                  ) : (
                    chatMessages.map((msg) => {
                      const isOwnMessage = msg.sender._id === user._id;
                      return (
                        <div key={msg._id} className={`group flex items-end gap-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                          {isOwnMessage && (
                            <button
                              onClick={() => deleteMessageMutation.mutate(msg._id)}
                              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-[#FBEAE4] transition-opacity"
                              title="Delete message"
                            >
                              <Trash2 size={13} className="text-[#E8623F]" />
                            </button>
                          )}
                          <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${
                            isOwnMessage ? 'bg-[#0E6B64] text-white' : 'bg-white border border-[#E4E1D8] text-[#12181B]'
                          }`}>
                            {msg.content}
                            {msg.attachment?.url && (
                              <a
                                href={msg.attachment.url}
                                target="_blank"
                                rel="noreferrer"
                                className={`flex items-center gap-1.5 mt-2 text-xs underline ${isOwnMessage ? 'text-white/90' : 'text-[#0E6B64]'}`}
                              >
                                📎 {msg.attachment.filename}
                              </a>
                            )}
                            {isOwnMessage && (
                              <div className="flex justify-end mt-1">
                                {msg.isRead ? (
                                  <CheckCheck size={14} className="text-[#5FD9C9]" />
                                ) : (
                                  <Check size={14} className="text-white/60" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                  {someoneIsTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-[#E4E1D8] text-[#8A929B] text-xs px-4 py-2.5 rounded-2xl">Typing…</div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-5 border-t border-[#E4E1D8]">
                  {pendingAttachment && (
                    <div className="flex items-center justify-between bg-[#F7F6F2] border border-[#E4E1D8] rounded-lg px-3 py-2 mb-2.5">
                      <span className="text-xs text-[#5B6470] truncate">📎 {pendingAttachment.name}</span>
                      <button onClick={() => setPendingAttachment(null)} className="text-[#8A929B] hover:text-[#12181B]">
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  <div className="relative bg-[#F7F6F2] border border-[#E4E1D8] rounded-xl px-4 py-3 flex items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf,audio/*"
                      onChange={handleAttachmentSelect}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[#8A929B] hover:text-[#12181B] p-1 transition-colors"
                      title="Attach a file"
                    >
                      <Paperclip size={18} />
                    </button>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={handleTypingInput}
                      onKeyDown={(e) => e.key === 'Enter' && (pendingAttachment ? handleSendAttachment() : sendMessage())}
                      className="flex-1 bg-transparent outline-none text-sm text-[#12181B] placeholder-[#8A929B]"
                    />
                    <button
                      onClick={() => setShowEmojiPicker((v) => !v)}
                      className="text-[#8A929B] hover:text-[#12181B] p-1 transition-colors"
                      title="Add an emoji"
                    >
                      <Smile size={18} />
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute bottom-14 right-4 bg-white border border-[#E4E1D8] rounded-xl shadow-lg p-2.5 grid grid-cols-5 gap-1.5 z-10">
                        {EMOJIS.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => handleEmojiSelect(emoji)}
                            className="text-lg hover:bg-[#F7F6F2] rounded-lg p-1.5 transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={pendingAttachment ? handleSendAttachment : sendMessage}
                      disabled={!newMessage.trim() && !pendingAttachment}
                      className="h-9 w-9 rounded-lg bg-[#0E6B64] hover:bg-[#0B4F4A] flex items-center justify-center text-white disabled:opacity-50 transition-colors"
                    >
                      {uploadingAttachment ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-[#F7F6F2]">
                <div className="text-center text-[#8A929B]">
                  <Send size={48} className="mx-auto mb-5 opacity-50" />
                  <h3 className="text-base font-semibold mb-1.5 text-[#12181B]">Select a conversation</h3>
                  <p className="text-sm">Or start a new one with your doctor</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NEW MESSAGE MODAL — two steps: pick a doctor, then compose */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-[#12181B]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeNewMessageModal}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] flex flex-col shadow-xl border border-[#E4E1D8]" onClick={(e) => e.stopPropagation()}>

            {composeStep === 'pick' ? (
              <>
                <div className="border-b border-[#E4E1D8] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-serif font-medium text-[#12181B]">New Message</h2>
                    <button onClick={closeNewMessageModal} className="p-2 hover:bg-[#F7F6F2] rounded-lg transition-colors">
                      <X size={18} className="text-[#5B6470]" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2.5 bg-[#F7F6F2] border border-[#E4E1D8] px-4 py-3 rounded-xl">
                    <Search size={16} className="text-[#8A929B]" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search doctors by name or specialty..."
                      value={doctorSearch}
                      onChange={(e) => setDoctorSearch(e.target.value)}
                      className="bg-transparent outline-none w-full text-sm text-[#12181B] placeholder-[#8A929B]"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3">
                  {doctorsQuery.isLoading ? (
                    <div className="space-y-2 p-3">
                      {Array(4).fill().map((_, i) => <div key={i} className="h-16 bg-[#F7F6F2] rounded-xl animate-pulse" />)}
                    </div>
                  ) : filteredDoctors.length === 0 ? (
                    <div className="text-center py-12 text-[#8A929B] text-sm">No doctors found</div>
                  ) : (
                    filteredDoctors.map((doctor) => (
                      <button
                        key={doctor._id}
                        onClick={() => handlePickDoctor(doctor)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F7F6F2] transition-colors text-left"
                      >
                        {doctor.avatar ? (
                          <img src={doctor.avatar} alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-[#E4F1EF] flex items-center justify-center text-[#0B4F4A] text-sm font-semibold shrink-0">
                            {initials(doctor.fullname)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#12181B] truncate">Dr. {doctor.fullname}</p>
                          <p className="text-xs text-[#8A929B] truncate">{doctor.specialty || 'General'}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="border-b border-[#E4E1D8] p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <button onClick={() => setComposeStep('pick')} className="p-2 hover:bg-[#F7F6F2] rounded-lg transition-colors shrink-0">
                      <ArrowLeft size={18} className="text-[#5B6470]" />
                    </button>
                    <h2 className="text-lg font-serif font-medium text-[#12181B]">Compose Message</h2>
                  </div>
                  <div className="flex items-center gap-3 bg-[#E4F1EF] border border-[#0E6B64]/25 rounded-xl px-4 py-3">
                    {selectedDoctor?.avatar ? (
                      <img src={selectedDoctor.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#0E6B64] flex items-center justify-center text-white text-xs font-semibold">
                        {initials(selectedDoctor?.fullname)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#0B4F4A] truncate">Dr. {selectedDoctor?.fullname}</p>
                      <p className="text-xs text-[#0E6B64]">{selectedDoctor?.specialty || 'General'}</p>
                    </div>
                    <CheckCircle2 size={18} className="text-[#0E6B64] shrink-0" />
                  </div>
                </div>

                <form onSubmit={handleStartConversation} className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#5B6470] mb-2">Message</label>
                    <textarea
                      autoFocus
                      value={firstMessageText}
                      onChange={(e) => setFirstMessageText(e.target.value)}
                      rows={5}
                      placeholder={`Write your first message to Dr. ${selectedDoctor?.fullname?.split(' ')[0] || ''}...`}
                      className="w-full bg-[#F7F6F2] border border-[#E4E1D8] rounded-xl px-4 py-3 text-[#12181B] placeholder-[#8A929B] focus:outline-none focus:ring-2 focus:ring-[#0E6B64]/25 focus:border-[#0E6B64] transition-all resize-vertical"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={startConversationMutation.isPending || !firstMessageText.trim()}
                    className="w-full bg-[#0E6B64] hover:bg-[#0B4F4A] disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    {startConversationMutation.isPending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}