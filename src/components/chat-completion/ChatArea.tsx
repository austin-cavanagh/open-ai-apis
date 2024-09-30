'use client';

import React, {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  FormEvent,
} from 'react';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import TextareaAutosize from 'react-textarea-autosize';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

export default function ChatArea() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: input,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInput('');

      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: 'This is an automated response.',
          sender: 'bot',
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e as unknown as FormEvent);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[90vh] w-[500px]">
      <div className="flex-1 overflow-y-auto pb-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.sender === 'user'
                ? 'justify-end pr-4'
                : 'justify-start pl-4'
            }`}
          >
            <div
              className={`p-3 rounded-2xl break-words inline-block max-w-xs sm:max-w-md ${
                message.sender === 'user'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="pb-6">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 max-w-2xl mx-auto">
          <TextareaAutosize
            aria-label="Type your message"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            minRows={1}
            maxRows={6}
            className="flex-1 resize-none bg-transparent outline-none border-none focus:ring-0"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="ml-2 text-indigo-500 hover:text-indigo-600 focus:outline-none"
          >
            <ArrowUpCircleIcon className="h-8 w-8" />
          </button>
        </div>
      </form>
    </div>
  );
}
