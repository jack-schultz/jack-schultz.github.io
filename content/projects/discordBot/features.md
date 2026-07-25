## Features

- **Automatic Channel Creation & Cleanup**  
  Channels are created when needed and automatically deleted
  when empty, reducing channel bloat and keeping the server
  clean.
- **User-Controlled Permissions**  
  Users can lock their temporary channels, hide them from others,
  or create personalised access lists (whitelist/blacklist), all
  from a persistent control panel.
- **Persistent Interface**  
  Each channel has an associated text panel with buttons and live
  information, helping users understand and manage their voice
  channel with ease. No commands needed.
- **Crash-Resistant State Management**  
  Channel data is saved to a local database (SQLite), ensuring the
  bot can recover and clean up correctly even after restarts or crashes.
- **Built for Real Use**  
  The bot was designed to run 24/7, respond to rapid user activity,
  and operate reliably even in high-turnover environments with
  multiple overlapping events.
