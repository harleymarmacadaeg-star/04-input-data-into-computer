import { Keyboard, HardDrive, Monitor, CheckCircle, Database, Globe, FileText, Shield, Cloud, Server, Eye, AlertTriangle, Search, Save, Settings } from 'lucide-react';

export const slides = [
  { id: 1, type: 'title', title: "LO 2: Input Data into Computer", subtitle: "Discussion & Practical Application", icon: Keyboard },
  
  // TOPIC 1
  { id: 2, type: 'section', title: "Topic 1: Selecting the Right Tool", content: "Choosing the correct software is the first step in data integrity." },
  { id: 3, type: 'grid', title: "Primary Application Tools", items: [
    { name: "Word Processors", icon: FileText, desc: "For text-heavy reports." },
    { name: "Spreadsheets", icon: Database, desc: "For numeric calculations." },
    { name: "Web Browsers", icon: Globe, desc: "For online research." }
  ]},
  { id: 4, type: 'activity_apps', title: "Activity 1: Software Selection", instruction: "Pick the correct tool!", mode: "apps" },

  // TOPIC 2
  { id: 5, type: 'section', title: "Topic 2: MS Word Standards", content: "Professional documents must follow specific SOPs." },
  { id: 6, type: 'list', title: "Common MS Word SOPs", items: ["Bold for headings", "Center for titles", "Bullets for lists"], icon: Settings },
  { id: 7, type: 'activity_word', title: "Activity 2: Word Processing", instruction: "Format the title.", mode: "word" },

  // TOPIC 3
  { id: 8, type: 'section', title: "Topic 3: Data Computation (Excel)", content: "Excel automates calculations." },
  {
    id: 9,
    type: 'grid',
    title: "The Power of Formulas",
    items: [
      { name: "The '=' Sign", icon: AlertTriangle, desc: "The trigger for calculations. Without it, Excel sees only text." },
      { name: "Cell References", icon: Search, desc: "Linking to cells like 'B2' makes your data update automatically." },
      { name: "Functions", icon: Save, desc: "Use =SUM() or =AVERAGE() to perform complex math instantly." }
    ]
  },
  { id: 10, type: 'activity_excel', title: "Activity 3: Excel Mastery", instruction: "Calculate the average.", mode: "excel" },

  // TOPIC 4 & 5
  { id: 11, type: 'activity_storage', title: "Activity 4: Storage Hierarchy", instruction: "Classify storage.", mode: "storage" },
  { id: 12, type: 'activity_ergo', title: "Activity 5: Ergonomics Audit", instruction: "Check posture.", mode: "ergo" },
  { id: 13, type: 'activity_input', title: "Activity 6: Precision Data Entry", instruction: "Type the definition exactly.", targetText: "Data integrity is the maintenance of, and the assurance of, the accuracy and consistency of data.", mode: "input" },

  // FINAL ASSESSMENT
  { id: 14, type: 'quiz', title: "Comprehensive Quiz" },
  { id: 15, type: 'scoreboard', title: "Final Record" }
];

export const quizQuestions = [
  // --- Original 5 Items ---
  { question: "Which software is best for calculating budgets?", options: ["Word", "Excel", "Chrome", "PowerPoint"], answer: 1 },
  { question: "Which is a volatile storage?", options: ["SSD", "HDD", "RAM", "Flash Drive"], answer: 2 },
  { question: "Which Excel symbol starts a formula?", options: ["+", "@", "=", "#"], answer: 2 },
  { question: "Proper ergonomics requires feet to be:", options: ["Crossed", "Dangling", "Flat on floor", "Tucked under chair"], answer: 2 },
  { question: "To make text darker and thicker, use:", options: ["Italic", "Underline", "Bold", "Strikethrough"], answer: 2 },
  
  // --- Restored 10 Missing Items ---
  { question: "What is the result of =AVERAGE(80, 90, 100)?", options: ["80", "85", "90", "270"], answer: 2 },
  { question: "What is the shortcut to save a document?", options: ["Ctrl+C", "Ctrl+V", "Ctrl+S", "Ctrl+Z"], answer: 2 },
  { question: "Which of the following is an example of Cloud storage?", options: ["Hard Drive", "Google Drive", "RAM", "CD-ROM"], answer: 1 },
  { question: "The 20-20-20 rule helps prevent:", options: ["Back pain", "Virus", "Eye strain", "Data loss"], answer: 2 },
  { question: "Where is data stored permanently?", options: ["RAM", "Secondary Storage", "CPU Cache", "Registers"], answer: 1 },
  { question: "ICT stands for:", options: ["Information & Communication Tech", "Internet & Computer Tool", "Intelligent Code Type", "Integrated Cell Task"], answer: 0 },
  { question: "Word Processors are primarily used for:", options: ["Calculations", "Browsing", "Narrative Reports", "Gaming"], answer: 2 },
  { question: "Input accuracy is ensured by:", options: ["Typing fast", "Double-checking work", "Using small fonts", "Deleting files"], answer: 1 },
  { question: "ROM stands for:", options: ["Random Only Memory", "Read Only Memory", "Ready On Media", "Real Output Mode"], answer: 1 },
  { question: "Which alignment puts text in the middle?", options: ["Left", "Right", "Center", "Justify"], answer: 2 }
];