const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("./models/Question");

dotenv.config();

const questions = [
  // ===== Operating System =====
  {
    subject: "Operating System",
    question: "What is the primary role of an operating system?",
    options: [
      "User authentication",
      "Resource management",
      "Application development",
      "Virus scanning",
    ],
    answer: 1,
  },
  {
    subject: "Operating System",
    question: "Which scheduling algorithm is non-preemptive?",
    options: ["Round Robin", "SJF", "Priority", "FCFS"],
    answer: 3,
  },
  {
    subject: "Operating System",
    question: "Which of the following is a deadlock avoidance algorithm?",
    options: ["Banker’s Algorithm", "FIFO", "Paging", "Spooling"],
    answer: 0,
  },
  {
    subject: "Operating System",
    question: "Thrashing is related to:",
    options: ["Deadlock", "Page replacement", "Multiprocessing", "Scheduling"],
    answer: 1,
  },
  {
    subject: "Operating System",
    question:
      "Which memory allocation method suffers from internal fragmentation?",
    options: ["Paging", "Segmentation", "Contiguous", "Virtual Memory"],
    answer: 0,
  },
  {
    subject: "Operating System",
    question: "In UNIX, everything is treated as a:",
    options: ["File", "Process", "Memory block", "Semaphore"],
    answer: 0,
  },
  {
    subject: "Operating System",
    question: "A process control block (PCB) does NOT contain:",
    options: ["Process state", "Program counter", "Stack", "File descriptors"],
    answer: 2,
  },
  {
    subject: "Operating System",
    question: "Which system call is used to create a new process in Unix?",
    options: ["exec()", "create()", "fork()", "start()"],
    answer: 2,
  },
  {
    subject: "Operating System",
    question: "What is a semaphore used for?",
    options: [
      "Memory allocation",
      "Process scheduling",
      "Synchronization",
      "Interrupt handling",
    ],
    answer: 2,
  },
  {
    subject: "Operating System",
    question:
      "What is the maximum number of processes that can be in the Ready state?",
    options: ["Depends on the OS", "1", "Infinite", "Fixed"],
    answer: 0,
  },

  // ===== DBMS =====
  {
    subject: "DBMS",
    question: "Which of the following is a DDL command?",
    options: ["INSERT", "UPDATE", "CREATE", "SELECT"],
    answer: 2,
  },
  {
    subject: "DBMS",
    question: "Which normal form removes transitive dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    answer: 2,
  },
  {
    subject: "DBMS",
    question: "A relation is in BCNF if:",
    options: [
      "Every determinant is a candidate key",
      "It is in 1NF",
      "It has no multivalued dependency",
      "It has only one candidate key",
    ],
    answer: 0,
  },
  {
    subject: "DBMS",
    question: "What is the purpose of foreign key?",
    options: [
      "To ensure uniqueness",
      "To enforce referential integrity",
      "To sort data",
      "To store NULL values",
    ],
    answer: 1,
  },
  {
    subject: "DBMS",
    question: "Which SQL keyword is used to remove duplicate records?",
    options: ["REMOVE", "DELETE", "DISTINCT", "UNIQUE"],
    answer: 2,
  },
  {
    subject: "DBMS",
    question: "ACID properties in DBMS stands for:",
    options: [
      "Access, Control, Integrity, Data",
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Control, Isolation, Data",
      "None",
    ],
    answer: 1,
  },
  {
    subject: "DBMS",
    question: "Which join returns rows with no matches in both tables?",
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL OUTER JOIN"],
    answer: 3,
  },
  {
    subject: "DBMS",
    question: "Which command is used to remove a table from database?",
    options: ["DROP", "DELETE", "REMOVE", "CLEAR"],
    answer: 0,
  },
  {
    subject: "DBMS",
    question: "Indexing improves:",
    options: ["Insertion", "Deletion", "Query performance", "Normalization"],
    answer: 2,
  },
  {
    subject: "DBMS",
    question: "Which SQL clause is used to group rows?",
    options: ["GROUP BY", "ORDER BY", "HAVING", "CLASSIFY BY"],
    answer: 0,
  },

  // ===== OOPs =====
  {
    subject: "OOPs",
    question: "Which of the following best defines encapsulation?",
    options: [
      "Binding data and methods together",
      "Hiding data from user",
      "Overloading methods",
      "Inheritance from base class",
    ],
    answer: 0,
  },
  {
    subject: "OOPs",
    question:
      "Which feature of OOP is used to derive a new class from an existing one?",
    options: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"],
    answer: 2,
  },
  {
    subject: "OOPs",
    question: "Which of these is NOT a type of constructor?",
    options: ["Default", "Parameterized", "Copy", "Private"],
    answer: 3,
  },
  {
    subject: "OOPs",
    question: "Which keyword is used to prevent method overriding?",
    options: ["final", "static", "private", "void"],
    answer: 0,
  },
  {
    subject: "OOPs",
    question: "Dynamic polymorphism is implemented using:",
    options: [
      "Method overloading",
      "Method overriding",
      "Interfaces",
      "Constructors",
    ],
    answer: 1,
  },
  {
    subject: "OOPs",
    question: "Abstraction focuses on:",
    options: ["Code reuse", "Implementation", "Hiding complexity", "Speed"],
    answer: 2,
  },
  {
    subject: "OOPs",
    question: "Which of these is a blueprint for creating objects?",
    options: ["Class", "Method", "Object", "Constructor"],
    answer: 0,
  },
  {
    subject: "OOPs",
    question: "Which modifier makes a method accessible only within its class?",
    options: ["public", "private", "protected", "static"],
    answer: 1,
  },
  {
    subject: "OOPs",
    question: "Which of these supports multiple inheritance in Java?",
    options: ["Classes", "Interfaces", "Objects", "Constructors"],
    answer: 1,
  },
  {
    subject: "OOPs",
    question: "Which function is called when an object is created?",
    options: ["Destructor", "Constructor", "Main", "New"],
    answer: 1,
  },

  // ===== Computer Networks =====
  {
    subject: "Computer Networks",
    question: "What is the full form of IP?",
    options: [
      "Internet Program",
      "Internet Protocol",
      "Internal Protocol",
      "Interconnect Program",
    ],
    answer: 1,
  },
  {
    subject: "Computer Networks",
    question: "Which layer in OSI model handles error detection?",
    options: ["Physical", "Network", "Data Link", "Transport"],
    answer: 2,
  },
  {
    subject: "Computer Networks",
    question: "What device connects two different networks?",
    options: ["Router", "Switch", "Hub", "Repeater"],
    answer: 0,
  },
  {
    subject: "Computer Networks",
    question: "Which protocol is used for email transfer?",
    options: ["SMTP", "FTP", "HTTP", "SNMP"],
    answer: 0,
  },
  {
    subject: "Computer Networks",
    question: "Which port does HTTPS use?",
    options: ["80", "443", "21", "25"],
    answer: 1,
  },
  {
    subject: "Computer Networks",
    question: "MAC address is:",
    options: ["Logical address", "32-bit", "Physical address", "None"],
    answer: 2,
  },
  {
    subject: "Computer Networks",
    question: "Which topology has a central hub?",
    options: ["Ring", "Bus", "Star", "Mesh"],
    answer: 2,
  },
  {
    subject: "Computer Networks",
    question: "Which protocol resolves IP to MAC address?",
    options: ["RARP", "ARP", "ICMP", "DHCP"],
    answer: 1,
  },
  {
    subject: "Computer Networks",
    question: "Which of these is not a guided media?",
    options: ["Twisted pair", "Fiber optics", "Coaxial", "Radio waves"],
    answer: 3,
  },
  {
    subject: "Computer Networks",
    question: "What is the purpose of DNS?",
    options: [
      "To route IP packets",
      "To assign MAC addresses",
      "To resolve domain names",
      "To encrypt data",
    ],
    answer: 2,
  },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Question.deleteMany({});
  await Question.insertMany(questions);
  console.log("✔ Seeded 40 questions successfully!");
  process.exit();
};

seed();
