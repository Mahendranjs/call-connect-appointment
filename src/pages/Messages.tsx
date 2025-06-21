
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Search, Filter, Phone } from 'lucide-react';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      contact: 'John Smith',
      phone: '+1 (555) 123-4567',
      lastMessage: 'Thanks for the follow-up call!',
      timestamp: '2 hours ago',
      unread: 2,
      status: 'delivered'
    },
    {
      id: 2,
      contact: 'Sarah Johnson',
      phone: '+1 (555) 987-6543',
      lastMessage: 'Can we reschedule our appointment?',
      timestamp: '1 day ago',
      unread: 0,
      status: 'read'
    },
    {
      id: 3,
      contact: 'Mike Wilson',
      phone: '+1 (555) 456-7890',
      lastMessage: 'Your message was delivered but not read',
      timestamp: '2 days ago',
      unread: 1,
      status: 'delivered'
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'contact',
      content: 'Hi, I missed your call earlier. What did you need?',
      timestamp: '10:30 AM',
      status: 'delivered'
    },
    {
      id: 2,
      sender: 'me',
      content: 'No problem! I was calling to follow up on your appointment request.',
      timestamp: '10:35 AM',
      status: 'read'
    },
    {
      id: 3,
      sender: 'contact',
      content: 'Thanks for the follow-up call!',
      timestamp: '2:15 PM',
      status: 'delivered'
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="h-8 w-8 text-blue-600" />
          SMS & Chat
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage SMS conversations and follow-ups</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Conversations
              <Button size="sm" variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer transition-all duration-200 hover:bg-accent ${
                    selectedConversation === conversation.id ? 'bg-accent border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{conversation.contact}</h4>
                    {conversation.unread > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{conversation.phone}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {conversation.lastMessage}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{conversation.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2 transition-all duration-200">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">John Smith</CardTitle>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col h-full p-0">
                <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-80">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg transition-all duration-200 ${
                          message.sender === 'me'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                      rows={2}
                    />
                    <Button className="self-end transition-all duration-200 hover:scale-105">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;
