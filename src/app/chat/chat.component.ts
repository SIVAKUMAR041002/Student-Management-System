import { Component, OnInit } from '@angular/core';
import { ChatService, Chat } from './../chat.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chats: Chat[] = [];
  newMessage: string = '';
  username: string = '';
  replyFields: { [key: string]: boolean } = {}; // Track reply field visibility

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getUser().username;
    this.loadChats();
  }

  loadChats(): void {
    this.chatService.getChats().subscribe((chats) => {
      this.chats = chats;
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const newChat: Chat = {
        id: Math.random().toString(36).substr(2, 9),
        postedBy: this.username,
        message: this.newMessage,
        replies: [],
        timestamp: new Date().toISOString(),
        likes: 0 // Initialize likes
      };

      this.chatService.createChat(newChat).subscribe((chat) => {
        this.chats.push(chat);
        this.newMessage = '';
      });
    }
  }

  addReply(chatId: string, replyMessage: string): void {
    const chat = this.chats.find(c => c.id === chatId);
    if (chat && replyMessage.trim()) {
      const newReply = {
        repliedBy: this.username,
        message: replyMessage,
        likes: 0 // Initialize likes
      };
      chat.replies.push(newReply);

      this.chatService.updateChat(chatId, chat).subscribe(() => {
        this.replyFields[chatId] = false; // Hide reply field after adding
      });
    }
  }

  likeChat(chatId: string): void {
    const chat = this.chats.find(c => c.id === chatId);
    if (chat) {
      chat.likes++;
      this.chatService.updateChat(chatId, chat).subscribe();
    }
  }

  likeReply(chatId: string, reply: any): void {
    reply.likes++;
    const chat = this.chats.find(c => c.id === chatId);
    if (chat) {
      this.chatService.updateChat(chatId, chat).subscribe();
    }
  }

  toggleReplyField(chatId: string): void {
    this.replyFields[chatId] = !this.replyFields[chatId];
  }
}
