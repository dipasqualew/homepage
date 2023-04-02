import { Favourite, Layout } from '../../src/profiles';

export type BookmarkKeys = 'gmail' | 'gdrive' | 'gcalendar' | 'chatgpt' | 'onepassword';

export const BOOKMARKS: Record<BookmarkKeys, Favourite> = {
    gmail: {
        title: 'gmail',
        url: 'https://mail.google.com/mail/u/0/#inbox',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg'
    },
    gdrive: {
        title: 'gdrive',
        url: 'https://drive.google.com/drive/my-drive',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png'
    },
    gcalendar: {
        title: 'gcalendar',
        url: 'https://calendar.google.com/calendar/u/0/r',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg'
    },
    chatgpt: {
        title: 'chatgpt',
        url: 'https://chat.openai.com/chat?model=gpt-4',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
    },
    onepassword: {
        title: '1password',
        url: 'https://1password.com',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/1Password_icon.png/240px-1Password_icon.png'
    }
};

export const BAD_LAYOUT = 'bad-layout';

export const PROFILE_EMPTY: Layout = {
    uuid: 'b450bcb0-03f6-4d61-b732-b1917849a795',
    name: 'Empty Profile',
    root: {
        uuid: 'a9742fc6-61d3-4bdd-acc5-d2a79ca61366',
        type: 'container',
        direction: 'row',
        children: [],
    }
};

export const PROFILE_SIMPLE: Layout = {
    uuid: '49195e73-defe-46fb-a2a7-34f9595d0899',
    name: 'Simple Profile',
    root: {
        uuid: '2a4787d1-191e-435d-bbeb-21efd8c3507b',
        type: 'container',
        direction: 'row',
        children: [
            {
                uuid: 'fe1114a7-c78e-4f96-a776-5412714c7b9d',
                type: 'big-card',
                favourite: BOOKMARKS.chatgpt
            }
        ]
    },
};

export const PROFILE_DEFAULT: Layout = {
    uuid: 'b3c7ada7-dd26-4521-87f4-5fe5f6b11c46',
    name: 'Default Profile',
    root: {
        uuid: 'a9742fc6-61d3-4bdd-acc5-d2a79ca61366',
        type: 'container',
        direction: 'row',
        children: [
            {
                uuid: '59818718-2234-4180-b804-58fbd1e0ecd0',
                type: 'container',
                direction: 'column',
                children: [
                    {
                        uuid: 'a74e78a5-ae90-4be8-bdf5-9c05141c9727',
                        type: 'container',
                        direction: 'row',
                        children: [
                            {
                                uuid: 'd2666124-820a-4325-a4be-e0eaf48cfddb',
                                type: 'big-card',
                                favourite: BOOKMARKS.gmail
                            }
                        ]
                    },
                    {
                        uuid: '6f4f3c0a-22e4-4e06-bc6f-18f3327bcecf',
                        type: 'container',
                        direction: 'row',
                        children: [
                            {
                                uuid: 'bba07d7a-cba9-45c1-a1ea-801a1a1a5169',
                                type: 'big-card',
                                favourite: BOOKMARKS.gdrive
                            }
                        ]
                    },
                    {
                        uuid: 'f2c7569d-af3b-4c22-aa75-09efb3aecbb9',
                        type: 'container',
                        direction: 'row',
                        children: [
                            {
                                uuid: '53467b43-5220-4609-b3b5-33c50d0afc7f',
                                type: 'big-card',
                                favourite: BOOKMARKS.gcalendar
                            }
                        ]
                    }
                ]
            },
            {
                uuid: '03ff8e02-c9b4-43fc-bedd-ad5ee33f940a',
                type: 'container',
                direction: 'row',
                children: [
                    {
                        uuid: 'fe1114a7-c78e-4f96-a776-5412714c7b9d',
                        type: 'big-card',
                        favourite: BOOKMARKS.chatgpt
                    }
                ]
            },
            {
                uuid: '7e7584c3-f379-4899-8af8-e967c8d5a429',
                type: 'container',
                direction: 'row',
                children: [
                    {
                        uuid: '590fafc8-21e8-4e75-aebb-07e4dc8706fa',
                        type: 'big-card',
                        favourite: BOOKMARKS.onepassword
                    }
                ]
            }
        ]
    }
};
