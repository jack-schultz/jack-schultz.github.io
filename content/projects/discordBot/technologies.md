## Tech & Skills Used

- **Python, discord.py and pycord**  
  Designed and implemented an event-driven system handling voice state
  updates, channel lifecycle management, and Discord API integration.
- **SQLite**  
  Implemented persistent data storage to maintain system state across
  crashes and restarts, including automatic schema updates and
  forward-compatible migrations.
- **Database Architecture**  
  Created a database abstraction layer to separate persistence logic from
  business logic, improving maintainability, extensibility, and code clarity.
- **Asynchronous Programming**  
  Managed concurrent Discord events safely, implementing synchronization
  logic to prevent race conditions and ensure consistent system state.
- **Fault-Tolerant System Design**  
  Built recovery-safe logic to prevent orphaned channels and ensure reliable
  operation during rapid user interactions, disconnects, and restarts.
- **Event-Driven Architecture**  
  Structured the bot around Discord's real-time event system, enabling
  scalable and responsive handling of channel creation, deletion, and
  user interaction.
- **Interactive UI Systems**  
  Developed persistent control panels using interactive components, allowing
  users to dynamically configure channel permissions and settings.
- **Linux Deployment & Systemd**  
  Deployed and managed the bot as a system service on a self-hosted Linux
  server, ensuring automatic startup and crash recovery. Later migrated to
  enterprise hosting solution to mitigate residential network and power outages.
- **Version Control & Open Source Practices**  
  Used Git and GitHub for version control, structured commits, documentation,
  and iterative feature development.
- **Production Debugging & Reliability**  
  Diagnosed and resolved real-world issues including race conditions,
  stale state, and edge cases arising from asynchronous event timing.
