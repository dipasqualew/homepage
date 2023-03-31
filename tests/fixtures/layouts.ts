export const BAD_LAYOUT = 'bad-layout';

export const GOOD_LAYOUT_PARSED = {
    'block': 'root',
    'children': [
        {
            'block': 'row',
            'children': [
                {
                    'block': 'column',
                    'children': [
                        {
                            'block': 'row',
                            'children': [
                                {
                                    'block': 'big-card',
                                    'favourite': {
                                        'title': 'gmail',
                                        'url': 'https://mail.google.com/mail/u/0/#inbox',
                                        'icon': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg'
                                    }
                                },
                            ]
                        },
                        {
                            'block': 'row',
                            'children': [
                                {
                                    'block': 'big-card',
                                    'favourite': {
                                        'title': 'gdrive',
                                        'url': 'https://drive.google.com/drive/my-drive',
                                        'icon': 'https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png'
                                    }
                                },
                            ]
                        },
                        {
                            'block': 'row',
                            'children': [
                                {
                                    'block': 'big-card',
                                    'favourite': {
                                        'title': 'gcalendar',
                                        'url': 'https://calendar.google.com/calendar/u/0/r',
                                        'icon': 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg'
                                    }
                                }
                            ]
                        },
                    ]
                },
                {
                    'block': 'column',
                    'children': [
                        {
                            'block': 'big-card',
                            'favourite': {
                                'title': 'chatgpt',
                                'url': 'https://chat.openai.com/chat?model=gpt-4',
                                'icon': 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
                            }
                        },
                    ]
                },
                {
                    'block': 'column',
                    'children': [
                        {
                            'block': 'big-card',
                            'favourite': {
                                'title': '1password',
                                'url': 'https://1password.com',
                                'icon': 'https://upload.wikimedia.org/wikipedia/commons/5/5b/1Password_icon.png'
                            }
                        }
                    ]
                },
            ]
        },
    ]
};

export const GOOD_LAYOUT_STRING = JSON.stringify(GOOD_LAYOUT_PARSED);

export const PROFILE = {
    uuid: 'b3c7ada7-dd26-4521-87f4-5fe5f6b11c46',
    name: 'Default Profile',
    layout: GOOD_LAYOUT_PARSED,
};
