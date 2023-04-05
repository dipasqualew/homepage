import { Bookmark, Profile } from '../../src/profiles';

export type BookmarkKeys = 'gmail' | 'gdrive' | 'gcalendar' | 'chatgpt' | 'onepassword';

export const BOOKMARKS: Record<BookmarkKeys, Bookmark> = {
    gmail: {
        label: 'gmail',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
        rows: [
            {
                title: 'home',
                url: 'https://mail.google.com/mail/u/0/#inbox',
            },
            {
                title: 'work',
                url: 'https://mail.google.com/mail/u/1/#inbox'
            }
        ]
    },
    gdrive: {
        label: 'gdrive',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png',
        rows: [
            {
                title: 'home',
                url: 'https://drive.google.com/drive/my-drive',
            }
        ]
    },
    gcalendar: {
        label: 'gcalendar',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg',
        rows: [
            {
                title: 'home',
                url: 'https://calendar.google.com/calendar/u/0/r',
            }
        ]
    },
    chatgpt: {
        label: 'chatgpt',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
        rows: [
            {
                title: '4.0',
                url: 'https://chat.openai.com/chat?model=gpt-4',
            },
            {
                title: '3.5',
                url: 'https://chat.openai.com/chat?model=text-davinci-002-render-sha',
            }
        ]
    },
    onepassword: {
        label: '1password',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/1Password_icon.png/240px-1Password_icon.png',
        rows: [
            {
                title: 'home',
                url: 'https://my.1password.com',
            },
            {
                title: 'work',
                url: 'https://test-work-company-nope.1password.com',
            }
        ]
    }
};

export const BAD_PROFILE = 'bad-profile';

export const PROFILE_EMPTY: Profile = {
    uuid: 'b450bcb0-03f6-4d61-b732-b1917849a795',
    name: 'Empty Profile',
    root: {
        uuid: 'a9742fc6-61d3-4bdd-acc5-d2a79ca61366',
        type: 'container',
        direction: 'row',
        children: [],
    }
};

export const PROFILE_SIMPLE: Profile = {
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
                bookmark: BOOKMARKS.chatgpt
            }
        ]
    },
};

export const PROFILE_DEFAULT: Profile = {
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
                                bookmark: BOOKMARKS.gmail
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
                                bookmark: BOOKMARKS.gdrive
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
                                bookmark: BOOKMARKS.gcalendar
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
                        bookmark: BOOKMARKS.chatgpt
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
                        bookmark: BOOKMARKS.onepassword
                    }
                ]
            }
        ]
    }
};

export const PROFILES = {
    PROFILE_EMPTY,
    PROFILE_SIMPLE,
    PROFILE_DEFAULT,
};
