import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chat {
  id: string;
  postedBy: string;
  message: string;
  replies: Reply[];
  timestamp: string;
  likes: number; // New field for likes
}

export interface Reply {
  repliedBy: string;
  message: string;
  likes: number; // New field for likes
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:3000/chats';

  constructor(private http: HttpClient) { }

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseUrl);
  }

  getChatById(id: string): Observable<Chat> {
    return this.http.get<Chat>(`${this.baseUrl}/${id}`);
  }

  createChat(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>(this.baseUrl, chat);
  }

  updateChat(id: string, chat: Chat): Observable<Chat> {
    return this.http.put<Chat>(`${this.baseUrl}/${id}`, chat);
  }

  deleteChat(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
