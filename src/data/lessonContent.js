import { Monitor, Cpu, Keyboard, Mouse, HardDrive, Shield, FileText, Globe, Play, Zap, Eye, Trash2, Printer, Speaker, Music, Video, Table } from 'lucide-react';

export const slides = [
  // ... (Slides 1-7 same as before) ...
  {
    id: 1,
    type: 'title',
    title: "Performing Computer Operations",
    subtitle: "Computer Systems Servicing (CSS)",
    content: "A comprehensive guide to Hardware, Software, and Safety.",
    footer: "Lesson Duration: 45 Minutes"
  },
  {
    id: 2,
    type: 'list',
    title: "Lesson Objectives",
    items: [
      "Identify computer hardware components and functions.",
      "Understand Application vs. System Software.",
      "Apply Occupational Health and Safety (OHS) standards.",
      "Perform basic data security procedures."
    ]
  },
  {
    id: 3,
    type: 'section',
    title: "Part 1: Computer Hardware",
    content: "Hardware refers to the physical components of a computer that you can touch and see."
  },
  {
    id: 4,
    type: 'detail',
    title: "Input Devices",
    icon: Keyboard,
    content: "Input devices allow you to send data TO the computer.",
    bullets: [
      "Keyboard: Used for typing text and commands.",
      "Mouse: Hand-held pointing device for navigation.",
      "Scanner/Webcam: Captures images and video."
    ]
  },
  {
    id: 5,
    type: 'detail',
    title: "The System Unit (CPU)",
    icon: Cpu,
    content: "The 'Brain' of the computer where processing happens.",
    bullets: [
      "Motherboard: Connects all parts together.",
      "CPU (Processor): Executes instructions.",
      "RAM (Memory): Temporary workspace for running apps."
    ]
  },
  {
    id: 6,
    type: 'detail',
    title: "Output Devices",
    icon: Monitor,
    content: "Output devices show the results of the computer's work.",
    bullets: [
      "Monitor: Displays the visual interface (GUI).",
      "Printer: Produces physical copies of documents.",
      "Speakers: Output audio and sound alerts."
    ]
  },
  {
    id: 7,
    type: 'detail',
    title: "Storage Devices",
    icon: HardDrive,
    content: "Where files and programs are saved permanently.",
    bullets: [
      "HDD (Hard Disk Drive): High capacity, slower mechanical drive.",
      "SSD (Solid State Drive): Faster, modern flash storage.",
      "Flash Drive (USB): Portable storage."
    ]
  },

  // --- ACTIVITY 1: Hardware Setup ---
  {
    id: 8,
    type: 'activity',
    title: "Activity 1: Office Setup",
    scenario: "You need to type a report. Select the 4 ESSENTIAL HARDWARE items.",
    mode: "hardware" // Uniquely identifies this activity
  },

  // ... (Slides 9-11 Software Section) ...
  {
    id: 9,
    type: 'section',
    title: "Part 2: Computer Software",
    content: "Software is the set of instructions that tells the hardware what to do."
  },
  {
    id: 10,
    type: 'info',
    title: "Software Types",
    content: "There are two main types of software you must know:",
    examples: [
      { name: "System Software", icon: Cpu, desc: "Runs the computer (e.g., Windows 10, macOS)." },
      { name: "Application Software", icon: FileText, desc: "Helps YOU do tasks (e.g., Word, Chrome)." }
    ]
  },
  {
    id: 11,
    type: 'list',
    title: "Common Applications",
    items: [
      "Word Processors: MS Word, Google Docs (Writing)",
      "Spreadsheets: MS Excel (Calculations)",
      "Web Browsers: Chrome, Edge (Internet)",
      "Media Players: VLC, Windows Media Player (Video)"
    ]
  },

  // --- ACTIVITY 2: Multimedia Setup (NEW SCENARIO) ---
  {
    id: 12,
    type: 'activity',
    title: "Activity 2: Multimedia Station",
    scenario: "You want to WATCH a movie with SOUND. Select the 4 items you need (Hardware & Software).",
    mode: "multimedia" // Changed from 'safety' to 'multimedia'
  },

  // ... (Slides 13-15 Safety Section) ...
  {
    id: 13,
    type: 'section',
    title: "Part 3: Health & Safety (OHS)",
    content: "OHS ensures you stay safe and healthy while working."
  },
  {
    id: 14,
    type: 'grid',
    title: "The 3 Golden Rules",
    items: [
      { name: "Posture", icon: Eye, desc: "Monitor at eye level. Feet flat." },
      { name: "Electrical", icon: Zap, desc: "No frayed wires. Don't overload." },
      { name: "Environment", icon: Trash2, desc: "Clean workspace. No food/drinks." },
    ]
  },
  {
    id: 15,
    type: 'list',
    title: "Data Security Basics",
    items: [
      "LOG OUT immediately after finishing your work.",
      "NEVER share your password with classmates.",
      "SCAN USB drives for viruses before opening files.",
      "SAVE your work frequently (Ctrl + S)."
    ],
    icon: Shield
  },

  // --- QUIZ ---
  {
    id: 16,
    type: 'quiz',
    title: "Final Assessment",
  },

  // --- FINAL SCOREBOARD ---
  {
    id: 17,
    type: 'scoreboard', // New type
    title: "Classroom Record",
    subtitle: "Raise your hand for the teacher to record your score."
  }
];

export const quizQuestions = [
  {
    question: "Which component is the 'Brain' of the computer?",
    options: ["Monitor", "CPU / System Unit", "Keyboard", "Printer"],
    answer: 1
  },
  {
    question: "Which is an INPUT device?",
    options: ["Speaker", "Monitor", "Mouse", "Printer"],
    answer: 2
  },
  {
    question: "Which software is used for browsing the internet?",
    options: ["MS Excel", "Google Chrome", "VLC Player", "Notepad"],
    answer: 1
  },
  {
    question: "What is the correct posture?",
    options: ["Feet flat on floor", "Slouching back", "Looking up at monitor", "Crossed legs"],
    answer: 0
  },
  {
    question: "What should you do with a damaged cable?",
    options: ["Use tape", "Ignore it", "Report to teacher", "Touch it"],
    answer: 2
  },
  {
    question: "Which key shortcut SAVES your work?",
    options: ["Ctrl + C", "Ctrl + V", "Ctrl + S", "Alt + F4"],
    answer: 2
  },
  {
    question: "Which device stores data PERMANENTLY?",
    options: ["RAM", "Hard Drive", "Monitor", "CPU"],
    answer: 1
  },
  {
    question: "Why is food banned near computers?",
    options: ["Spills damage hardware", "It smells bad", "Teachers are mean", "It is distracting"],
    answer: 0
  },
  {
    question: "Before using a USB drive, you must:",
    options: ["Format it", "Scan for viruses", "Copy files", "Eject it"],
    answer: 1
  },
  {
    question: "Who should know your password?",
    options: ["Only you", "Your best friend", "Your teacher", "Everyone"],
    answer: 0
  }
];