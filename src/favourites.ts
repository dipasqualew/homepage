export interface Favourite {
  title: string;
  url: string;
  icon: string;
};

import img1Password from './assets/1password.webp'
import imgChatgpt from './assets/chatgpt.webp'
import imgGdrive from './assets/gdrive.webp'
import imgGmail from './assets/gmail.webp'


export const FAVOURITES: Record<string, Favourite> = {
  chatgpt: {
    "title": "chatgpt",
    "url": "https://chat.openai.com/chat",
    "icon": imgChatgpt
  },
  gdrive: {
    "title": "gdrive",
    "url": "https://drive.google.com/drive/my-drive",
    "icon": imgGdrive
  },
  gmail: {
    "title": "gmail",
    "url": "https://mail.google.com/mail/u/0/#inbox",
    "icon": imgGmail
  },
  onepassword: {
    "title": "1password",
    "url": "https://1password.com",
    "icon": img1Password,
  }
}

console.log(FAVOURITES);
