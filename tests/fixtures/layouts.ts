export const BAD_LAYOUT = 'bad-layout';

export const GOOD_LAYOUT = 'eyJibG9jayI6InJvdyIsImNoaWxkcmVuIjpbeyJibG9jayI6ImNvbHVtbiIsImNoaWxkcmVuIjpbeyJibG9jayI6ImJpZy1jYXJkIiwiZmF2b3VyaXRlIjp7InRpdGxlIjoiZ21haWwiLCJ1cmwiOiJodHRwczovL21haWwuZ29vZ2xlLmNvbS9tYWlsL3UvMC8jaW5ib3giLCJpY29uIjoiaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy83LzdlL0dtYWlsX2ljb25fJTI4MjAyMCUyOS5zdmcifX0seyJibG9jayI6ImJpZy1jYXJkIiwiZmF2b3VyaXRlIjp7InRpdGxlIjoiZ2RyaXZlIiwidXJsIjoiaHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2RyaXZlL215LWRyaXZlIiwiaWNvbiI6Imh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvZC9kYS9Hb29nbGVfRHJpdmVfbG9nby5wbmcifX0seyJibG9jayI6ImJpZy1jYXJkIiwiZmF2b3VyaXRlIjp7InRpdGxlIjoiZ2NhbGVuZGFyIiwidXJsIjoiaHR0cHM6Ly9jYWxlbmRhci5nb29nbGUuY29tL2NhbGVuZGFyL3UvMC9yIiwiaWNvbiI6Imh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvYS9hNS9Hb29nbGVfQ2FsZW5kYXJfaWNvbl8lMjgyMDIwJTI5LnN2ZyJ9fV19LHsiYmxvY2siOiJyb3ciLCJjaGlsZHJlbiI6W3siYmxvY2siOiJiaWctY2FyZCIsImZhdm91cml0ZSI6eyJ0aXRsZSI6ImNoYXRncHQiLCJ1cmwiOiJodHRwczovL2NoYXQub3BlbmFpLmNvbS9jaGF0P21vZGVsPWdwdC00IiwiaWNvbiI6Imh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvMC8wNC9DaGF0R1BUX2xvZ28uc3ZnIn19LHsiYmxvY2siOiJiaWctY2FyZCIsImZhdm91cml0ZSI6eyJ0aXRsZSI6IjFwYXNzd29yZCIsInVybCI6Imh0dHBzOi8vMXBhc3N3b3JkLmNvbSIsImljb24iOiJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zLzUvNWIvMVBhc3N3b3JkX2ljb24ucG5nIn19XX1dfQ';

export const GOOD_LAYOUT_PARSED = {
    'block': 'row',
    'children': [
        {
            'block': 'column',
            'children': [
                {
                    'block': 'big-card',
                    'favourite': {
                        'title': 'gmail',
                        'url': 'https://mail.google.com/mail/u/0/#inbox',
                        'icon': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg'
                    }
                },
                {
                    'block': 'big-card',
                    'favourite': {
                        'title': 'gdrive',
                        'url': 'https://drive.google.com/drive/my-drive',
                        'icon': 'https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png'
                    }
                },
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
        {
            'block': 'row',
            'children': [
                {
                    'block': 'big-card',
                    'favourite': {
                        'title': 'chatgpt',
                        'url': 'https://chat.openai.com/chat?model=gpt-4',
                        'icon': 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
                    }
                },
                {
                    'block': 'big-card',
                    'favourite': {
                        'title': '1password',
                        'url': 'https://1password.com',
                        'icon': 'https://upload.wikimedia.org/wikipedia/commons/5/5b/1Password_icon.png'
                    }
                }
            ]
        }
    ]
};

export const PROFILE = {
    uuid: 'b3c7ada7-dd26-4521-87f4-5fe5f6b11c46',
    name: 'Default Profile',
    layout: GOOD_LAYOUT_PARSED,
};
