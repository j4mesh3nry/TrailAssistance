// Enterprise-Grade Higher-Ed Mock Dataset
// Realistic university student records, academic tickets with multi-stage audit logs, and feedback

export const INITIAL_STUDENTS = [
  {
    id: "STD-2024-001",
    studentId: "2024-10492",
    name: "Alex Morgan",
    email: "alex.morgan@demo.edu",
    avatar: "AM",
    role: "undergraduate",
    college: "College of Information Technology & Computing",
    program: "BS Computer Science",
    yearOfStudy: "4th Year - Senior",
    academicStanding: "Dean's Lister",
    gpa: "3.88",
    phone: "+1 (555) 342-8910",
    advisor: "Dr. Sarah Vance",
    enrolledUnits: 18,
    clearanceStatus: "Pending Advising Review",
    createdAt: "2024-08-15T08:00:00.000Z"
  },
  {
    id: "STD-2024-002",
    studentId: "2024-10503",
    name: "Elena Rostova",
    email: "elena.rostova@demo.edu",
    avatar: "ER",
    role: "undergraduate",
    college: "College of Engineering",
    program: "BS Electrical Engineering",
    yearOfStudy: "3rd Year - Junior",
    academicStanding: "Good Standing",
    gpa: "3.65",
    phone: "+1 (555) 891-2345",
    advisor: "Prof. Marcus Thorne",
    enrolledUnits: 19,
    clearanceStatus: "Cleared",
    createdAt: "2024-08-16T09:30:00.000Z"
  },
  {
    id: "STD-2024-003",
    studentId: "2024-10614",
    name: "Marcus Chen",
    email: "marcus.chen@demo.edu",
    avatar: "MC",
    role: "graduate",
    college: "Graduate School of Data Science",
    program: "MS Artificial Intelligence",
    yearOfStudy: "2nd Year - Master's",
    academicStanding: "High Honors",
    gpa: "3.94",
    phone: "+1 (555) 432-6789",
    advisor: "Dr. Eleanor Wu",
    enrolledUnits: 12,
    clearanceStatus: "Cleared",
    createdAt: "2024-08-18T10:15:00.000Z"
  },
  {
    id: "STD-2024-004",
    studentId: "2024-10725",
    name: "Sophia Patel",
    email: "sophia.patel@demo.edu",
    avatar: "SP",
    role: "undergraduate",
    college: "College of Business Administration",
    program: "BS Financial Technology",
    yearOfStudy: "2nd Year - Sophomore",
    academicStanding: "Good Standing",
    gpa: "3.52",
    phone: "+1 (555) 765-4321",
    advisor: "Prof. Arthur Pendelton",
    enrolledUnits: 18,
    clearanceStatus: "Pending Financial Hold",
    createdAt: "2024-08-20T11:00:00.000Z"
  },
  {
    id: "STD-2024-005",
    studentId: "2024-10836",
    name: "Liam Henderson",
    email: "liam.henderson@demo.edu",
    avatar: "LH",
    role: "undergraduate",
    college: "College of Information Technology & Computing",
    program: "BS Cybersecurity",
    yearOfStudy: "4th Year - Senior",
    academicStanding: "Dean's Lister",
    gpa: "3.82",
    phone: "+1 (555) 908-1122",
    advisor: "Dr. Sarah Vance",
    enrolledUnits: 15,
    clearanceStatus: "Pending Graduation Audit",
    createdAt: "2024-08-22T13:45:00.000Z"
  },
  {
    id: "STD-2024-006",
    studentId: "2024-10947",
    name: "Zoe Takahashi",
    email: "zoe.takahashi@demo.edu",
    avatar: "ZT",
    role: "undergraduate",
    college: "College of Architecture & Design",
    program: "BS Architecture",
    yearOfStudy: "3rd Year - Junior",
    academicStanding: "Good Standing",
    gpa: "3.71",
    phone: "+1 (555) 345-6712",
    advisor: "Prof. Aris Thorne",
    enrolledUnits: 21,
    clearanceStatus: "Cleared",
    createdAt: "2024-08-25T14:20:00.000Z"
  },
  {
    id: "STD-2024-007",
    studentId: "2024-11058",
    name: "Carlos Mendez",
    email: "carlos.mendez@demo.edu",
    avatar: "CM",
    role: "undergraduate",
    college: "College of Engineering",
    program: "BS Mechanical Engineering",
    yearOfStudy: "1st Year - Freshman",
    academicStanding: "Good Standing",
    gpa: "3.40",
    phone: "+1 (555) 678-9012",
    advisor: "Prof. Marcus Thorne",
    enrolledUnits: 17,
    clearanceStatus: "Cleared",
    createdAt: "2024-08-28T08:30:00.000Z"
  },
  {
    id: "STD-2024-008",
    studentId: "2024-11169",
    name: "Amina Al-Mansoor",
    email: "amina.almansoor@demo.edu",
    avatar: "AA",
    role: "graduate",
    college: "College of Information Technology & Computing",
    program: "MS Information Security",
    yearOfStudy: "1st Year - Master's",
    academicStanding: "High Honors",
    gpa: "3.96",
    phone: "+1 (555) 234-9876",
    advisor: "Dr. Sarah Vance",
    enrolledUnits: 12,
    clearanceStatus: "Cleared",
    createdAt: "2024-09-01T09:10:00.000Z"
  },
  {
    id: "STD-2024-009",
    studentId: "2024-11270",
    name: "David Kim",
    email: "david.kim@demo.edu",
    avatar: "DK",
    role: "undergraduate",
    college: "College of Science & Mathematics",
    program: "BS Applied Mathematics",
    yearOfStudy: "2nd Year - Sophomore",
    academicStanding: "Probationary Review",
    gpa: "2.84",
    phone: "+1 (555) 543-2109",
    advisor: "Dr. Eleanor Wu",
    enrolledUnits: 14,
    clearanceStatus: "Academic Advising Required",
    createdAt: "2024-09-02T10:50:00.000Z"
  },
  {
    id: "STD-2024-010",
    studentId: "2024-11381",
    name: "Isabella Rossi",
    email: "isabella.rossi@demo.edu",
    avatar: "IR",
    role: "exchange",
    college: "College of Arts & Sciences",
    program: "International Exchange - Media Studies",
    yearOfStudy: "3rd Year - Exchange",
    academicStanding: "Good Standing",
    gpa: "3.68",
    phone: "+1 (555) 789-0123",
    advisor: "Prof. Arthur Pendelton",
    enrolledUnits: 16,
    clearanceStatus: "Cleared",
    createdAt: "2024-09-03T11:40:00.000Z"
  },
  {
    id: "STD-2024-011",
    studentId: "2024-11492",
    name: "Maya Lin",
    email: "maya.lin@demo.edu",
    avatar: "ML",
    role: "undergraduate",
    college: "College of Information Technology & Computing",
    program: "BS Software Engineering",
    yearOfStudy: "3rd Year - Junior",
    academicStanding: "Dean's Lister",
    gpa: "3.91",
    phone: "+1 (555) 456-7890",
    advisor: "Dr. Sarah Vance",
    enrolledUnits: 18,
    clearanceStatus: "Cleared",
    createdAt: "2024-09-04T12:15:00.000Z"
  },
  {
    id: "STD-2024-012",
    studentId: "2024-11503",
    name: "Julian Vance",
    email: "julian.vance@demo.edu",
    avatar: "JV",
    role: "undergraduate",
    college: "College of Business Administration",
    program: "BS Accountancy",
    yearOfStudy: "4th Year - Senior",
    academicStanding: "Good Standing",
    gpa: "3.55",
    phone: "+1 (555) 123-9874",
    advisor: "Prof. Arthur Pendelton",
    enrolledUnits: 15,
    clearanceStatus: "Pending Library Clearance",
    createdAt: "2024-09-05T13:20:00.000Z"
  },
  {
    id: "STD-2024-013",
    studentId: "2024-11614",
    name: "Chloe Bennett",
    email: "chloe.bennett@demo.edu",
    avatar: "CB",
    role: "alumni",
    college: "College of Information Technology & Computing",
    program: "BS Computer Science (Class of 2023)",
    yearOfStudy: "Graduated - Alumni",
    academicStanding: "Cum Laude",
    gpa: "3.78",
    phone: "+1 (555) 654-3210",
    advisor: "Dr. Sarah Vance",
    enrolledUnits: 0,
    clearanceStatus: "Complete Record Archived",
    createdAt: "2024-09-06T14:10:00.000Z"
  },
  {
    id: "STD-2024-014",
    studentId: "2024-11725",
    name: "Tariq Malik",
    email: "tariq.malik@demo.edu",
    avatar: "TM",
    role: "undergraduate",
    college: "College of Engineering",
    program: "BS Civil Engineering",
    yearOfStudy: "2nd Year - Sophomore",
    academicStanding: "Good Standing",
    gpa: "3.48",
    phone: "+1 (555) 876-5432",
    advisor: "Prof. Marcus Thorne",
    enrolledUnits: 19,
    clearanceStatus: "Cleared",
    createdAt: "2024-09-07T15:00:00.000Z"
  },
  {
    id: "STD-2024-015",
    studentId: "2024-11836",
    name: "Lucas Silva",
    email: "lucas.silva@demo.edu",
    avatar: "LS",
    role: "student-staff",
    college: "College of Information Technology & Computing",
    program: "BS Information Systems",
    yearOfStudy: "3rd Year - Junior (Lab Assistant)",
    academicStanding: "Dean's Lister",
    gpa: "3.85",
    phone: "+1 (555) 321-7654",
    advisor: "Dr. Sarah Vance",
    enrolledUnits: 16,
    clearanceStatus: "Cleared",
    createdAt: "2024-09-08T16:30:00.000Z"
  },
  {
    id: "STD-2024-016",
    studentId: "2024-11947",
    name: "Hannah Schmidt",
    email: "hannah.schmidt@demo.edu",
    avatar: "HS",
    role: "undergraduate",
    college: "College of Science & Mathematics",
    program: "BS Chemistry",
    yearOfStudy: "4th Year - Senior",
    academicStanding: "Good Standing",
    gpa: "3.60",
    phone: "+1 (555) 432-1098",
    advisor: "Dr. Eleanor Wu",
    enrolledUnits: 15,
    clearanceStatus: "Laboratory Safety Clearance Pending",
    createdAt: "2024-09-09T09:45:00.000Z"
  }
];

export const INITIAL_TICKETS = [
  {
    id: "TKT-8491",
    ticketNumber: "TKT-8491",
    studentId: "2024-10492",
    studentName: "Alex Morgan",
    studentEmail: "alex.morgan@demo.edu",
    studentProgram: "BS Computer Science",
    title: "Senior Capstone II Prerequisite Override Request",
    category: "Academic Advising",
    urgency: "urgent",
    status: "under_review",
    purposeOfVisit: "Dean's Approval for Concurrent Capstone Enrollment",
    preferredMeetingSlot: "2026-09-08T14:00",
    meetingMode: "Dean's Office (Room 302B)",
    preferredContact: "University Email",
    assignedStaff: "Dr. Sarah Vance (College Dean)",
    details: "I am in my final academic year and need approval to take CS-499 Capstone Project II concurrently with CS-408 Distributed Systems. All other foundational core prerequisites have been satisfied with an A grade. Delaying this course would postpone my expected June 2027 graduation date.",
    additionalInfo: {
      currentSemesterUnits: "18",
      plannedGraduation: "June 2027",
      targetCourseCode: "CS-499 & CS-408",
      specialization: "Cloud Architecture"
    },
    resolutionNotes: "",
    createdAt: "2026-09-04T08:30:00.000Z",
    updatedAt: "2026-09-05T09:15:00.000Z",
    resolvedAt: null,
    timeline: [
      {
        id: "TL-001",
        action: "Ticket Created",
        actor: "Alex Morgan (Student)",
        note: "Submitted urgent academic advising request via Student Portal.",
        timestamp: "2026-09-04T08:30:00.000Z",
        statusBadge: "submitted"
      },
      {
        id: "TL-002",
        action: "Assigned & Triaged",
        actor: "Advising Center Intake Desk",
        note: "Routed to Dr. Sarah Vance for Dean's Prerequisite Waiver review.",
        timestamp: "2026-09-04T10:15:00.000Z",
        statusBadge: "under_review"
      },
      {
        id: "TL-003",
        action: "Transcript Evaluation",
        actor: "Dr. Sarah Vance (College Dean)",
        note: "Reviewed student transcript. Overall GPA is 3.88 with exemplary performance in prerequisite coursework. Preparing conditional enrollment add slip.",
        timestamp: "2026-09-05T09:15:00.000Z",
        statusBadge: "under_review"
      }
    ],
    studentNotes: [
      {
        id: "SN-001",
        author: "Alex Morgan",
        text: "Thank you Dr. Vance! I have uploaded my unofficial transcript to the records portal as requested.",
        timestamp: "2026-09-05T11:20:00.000Z"
      }
    ]
  },
  {
    id: "TKT-8488",
    ticketNumber: "TKT-8488",
    studentId: "2024-10492",
    studentName: "Alex Morgan",
    studentEmail: "alex.morgan@demo.edu",
    studentProgram: "BS Computer Science",
    title: "University Library Physical Hold Clearance Appeal",
    category: "Clearance & Graduation",
    urgency: "medium",
    status: "resolved",
    purposeOfVisit: "Clearance Sign-off for Lost Textbook Replacement",
    preferredMeetingSlot: "2026-09-02T11:00",
    meetingMode: "Library Administrative Desk",
    preferredContact: "University Email",
    assignedStaff: "Elena Rostova (Clearance Desk)",
    details: "I replaced the misplaced reference textbook 'Modern Operating Systems 4th Ed' with a brand new hardcover copy received by Chief Librarian Mr. Hastings on August 30. Please release the enrollment hold on my student account.",
    additionalInfo: {
      receiptNumber: "LIB-REC-9921",
      replacementItem: "Modern Operating Systems 4th Ed ISBN-13: 978-0133591620",
      clearingDepartment: "University Central Library"
    },
    resolutionNotes: "Official replacement receipt verified with Central Library circulation desk. Student financial hold released and clearance ledger updated.",
    createdAt: "2026-09-01T10:00:00.000Z",
    updatedAt: "2026-09-02T15:30:00.000Z",
    resolvedAt: "2026-09-02T15:30:00.000Z",
    timeline: [
      {
        id: "TL-004",
        action: "Ticket Created",
        actor: "Alex Morgan (Student)",
        note: "Submitted clearance verification request with attached proof of replacement receipt.",
        timestamp: "2026-09-01T10:00:00.000Z",
        statusBadge: "submitted"
      },
      {
        id: "TL-005",
        action: "Under Review",
        actor: "Elena Rostova (Clearance Desk)",
        note: "Cross-checked with library inventory tracking. Replacement book received in pristine condition.",
        timestamp: "2026-09-02T10:45:00.000Z",
        statusBadge: "under_review"
      },
      {
        id: "TL-006",
        action: "Hold Removed & Resolved",
        actor: "Elena Rostova (Clearance Desk)",
        note: "System hold #HLD-4481 cleared in SIS. Student notified via email.",
        timestamp: "2026-09-02T15:30:00.000Z",
        statusBadge: "resolved"
      }
    ],
    studentNotes: []
  },
  {
    id: "TKT-8482",
    ticketNumber: "TKT-8482",
    studentId: "2024-10725",
    studentName: "Sophia Patel",
    studentEmail: "sophia.patel@demo.edu",
    studentProgram: "BS Financial Technology",
    title: "Emergency Semester II Tuition Grant Appeal",
    category: "Financial Aid & Scholarships",
    urgency: "urgent",
    status: "scheduled",
    purposeOfVisit: "Financial Aid Committee Review for Hardship Grant",
    preferredMeetingSlot: "2026-09-07T13:30",
    meetingMode: "Financial Aid Boardroom (Room 105)",
    preferredContact: "SMS & Email",
    assignedStaff: "Elena Rostova (Aid Officer)",
    details: "Unforeseen medical expenses within my immediate family have caused a temporary liquidity shortfall for the final tuition installment. Requesting deferment or consideration under the Dean's Emergency Hardship Assistance Fund.",
    additionalInfo: {
      requestedAssistance: "$1,250.00 Hardship Grant",
      currentSemesterBalance: "$1,850.00",
      academicStanding: "Good Standing (GPA 3.52)"
    },
    resolutionNotes: "",
    createdAt: "2026-09-03T14:15:00.000Z",
    updatedAt: "2026-09-04T16:00:00.000Z",
    resolvedAt: null,
    timeline: [
      {
        id: "TL-007",
        action: "Ticket Created",
        actor: "Sophia Patel (Student)",
        note: "Submitted emergency financial aid hardship application with documentation.",
        timestamp: "2026-09-03T14:15:00.000Z",
        statusBadge: "submitted"
      },
      {
        id: "TL-008",
        action: "Priority Assessment",
        actor: "Elena Rostova (Aid Officer)",
        note: "Documents verified. Financial hardship criteria met under Policy Section 4-B.",
        timestamp: "2026-09-04T09:30:00.000Z",
        statusBadge: "under_review"
      },
      {
        id: "TL-009",
        action: "Hearing Scheduled",
        actor: "Elena Rostova (Aid Officer)",
        note: "Scheduled in-person interview with Student Assistance Committee for Sept 7 at 1:30 PM.",
        timestamp: "2026-09-04T16:00:00.000Z",
        statusBadge: "scheduled"
      }
    ],
    studentNotes: []
  },
  {
    id: "TKT-8479",
    ticketNumber: "TKT-8479",
    studentId: "2024-10614",
    studentName: "Marcus Chen",
    studentEmail: "marcus.chen@demo.edu",
    studentProgram: "MS Artificial Intelligence",
    title: "GPU Cluster Resource Allocation Petition for Thesis Research",
    category: "Academic Advising",
    urgency: "high",
    status: "under_review",
    purposeOfVisit: "HPC Research Lab Compute Hours Authorization",
    preferredMeetingSlot: "2026-09-06T15:00",
    meetingMode: "Virtual Zoom Consultation",
    preferredContact: "University Email",
    assignedStaff: "Dr. Sarah Vance (College Dean)",
    details: "Conducting large-scale training runs for thesis on transformer quantization. Requesting an additional 250 node-hours on the College HPC Cluster and access to the A100 node tier.",
    additionalInfo: {
      facultyAdvisor: "Dr. Eleanor Wu",
      projectTitle: "Low-Rank Adaptation in Edge Neural Architectures",
      requestedHours: "250 Node Hours"
    },
    resolutionNotes: "",
    createdAt: "2026-09-03T11:00:00.000Z",
    updatedAt: "2026-09-04T14:20:00.000Z",
    resolvedAt: null,
    timeline: [
      {
        id: "TL-010",
        action: "Ticket Created",
        actor: "Marcus Chen (Graduate Student)",
        note: "Submitted computational resource petition endorsed by thesis advisor.",
        timestamp: "2026-09-03T11:00:00.000Z",
        statusBadge: "submitted"
      },
      {
        id: "TL-011",
        action: "Advisor Endorsement Verified",
        actor: "Prof. Marcus Thorne",
        note: "Confirmed Dr. Wu's formal endorsement letter is on file. Transferred to Dean for IT allocation approval.",
        timestamp: "2026-09-04T14:20:00.000Z",
        statusBadge: "under_review"
      }
    ],
    studentNotes: []
  },
  {
    id: "TKT-8475",
    ticketNumber: "TKT-8475",
    studentId: "2024-10503",
    studentName: "Elena Rostova",
    studentEmail: "elena.rostova@demo.edu",
    studentProgram: "BS Electrical Engineering",
    title: "Cross-College Minor in Computer Engineering Petition",
    category: "Enrollment & Registration",
    urgency: "medium",
    status: "scheduled",
    purposeOfVisit: "Dual Degree / Minor Curriculum Mapping Consultation",
    preferredMeetingSlot: "2026-09-09T10:00",
    meetingMode: "Dean's Office (Room 302)",
    preferredContact: "University Email",
    assignedStaff: "Prof. Marcus Thorne (Academic Advisor)",
    details: "I would like to declare an official minor in Embedded Systems & Computer Engineering. I have already satisfied 9 elective units and need the curriculum cross-walk approved before registration closes.",
    additionalInfo: {
      major: "BS Electrical Engineering",
      targetMinor: "Embedded Systems",
      unitsCompleted: "78 Units"
    },
    resolutionNotes: "",
    createdAt: "2026-09-02T13:00:00.000Z",
    updatedAt: "2026-09-04T11:30:00.000Z",
    resolvedAt: null,
    timeline: [
      {
        id: "TL-012",
        action: "Ticket Created",
        actor: "Elena Rostova (Student)",
        note: "Submitted minor declaration request.",
        timestamp: "2026-09-02T13:00:00.000Z",
        statusBadge: "submitted"
      },
      {
        id: "TL-013",
        action: "Advising Slot Assigned",
        actor: "Prof. Marcus Thorne",
        note: "Scheduled curricular advising session for Sept 9 at 10:00 AM.",
        timestamp: "2026-09-04T11:30:00.000Z",
        statusBadge: "scheduled"
      }
    ],
    studentNotes: []
  },
  {
    id: "TKT-8470",
    ticketNumber: "TKT-8470",
    studentId: "2024-10836",
    studentName: "Liam Henderson",
    studentEmail: "liam.henderson@demo.edu",
    studentProgram: "BS Cybersecurity",
    title: "Official Graduation Degree Audit & Deficiency Verification",
    category: "Clearance & Graduation",
    urgency: "high",
    status: "under_review",
    purposeOfVisit: "Dean's Certification of Degree Completion",
    preferredMeetingSlot: "2026-09-08T15:30",
    meetingMode: "Dean's Office (Room 302B)",
    preferredContact: "University Email",
    assignedStaff: "Dr. Sarah Vance (College Dean)",
    details: "Final semester degree audit check for Winter 2026 graduation. One general education elective (HUM-102) was taken at an accredited partner institution during summer term and needs formal equivalency sign-off.",
    additionalInfo: {
      transferCourse: "HUM-102 Ethics & Society",
      institution: "State Community College",
      equivalentCourse: "PHIL-201"
    },
    resolutionNotes: "",
    createdAt: "2026-09-02T09:20:00.000Z",
    updatedAt: "2026-09-03T16:45:00.000Z",
    resolvedAt: null,
    timeline: [
      {
        id: "TL-014",
        action: "Ticket Created",
        actor: "Liam Henderson (Student)",
        note: "Submitted graduation audit request with certified partner transcript.",
        timestamp: "2026-09-02T09:20:00.000Z",
        statusBadge: "submitted"
      },
      {
        id: "TL-015",
        action: "Curriculum Cross-Check",
        actor: "Dean's Office Records Clerk",
        note: "Verified syllabus alignment for HUM-102. Forwarded to Dean Vance for official signature.",
        timestamp: "2026-09-03T16:45:00.000Z",
        statusBadge: "under_review"
      }
    ],
    studentNotes: []
  },
  {
    id: "TKT-8465",
    ticketNumber: "TKT-8465",
    studentId: "2024-11270",
    studentName: "David Kim",
    studentEmail: "david.kim@demo.edu",
    studentProgram: "BS Applied Mathematics",
    title: "Academic Probation Consultation & Recovery Learning Plan",
    category: "Academic Advising",
    urgency: "urgent",
    status: "scheduled",
    purposeOfVisit: "Mandatory Academic Standing Review with Dean",
    preferredMeetingSlot: "2026-09-07T11:00",
    meetingMode: "Dean's Private Consultation Suite",
    preferredContact: "SMS & Phone",
    assignedStaff: "Dr. Sarah Vance (College Dean)",
    details: "I received a notice regarding my term GPA dropping below 3.0. I experienced severe health issues during midterm week which impacted my MATH-310 performance. I am seeking guidance to draft a formal academic improvement contract.",
    additionalInfo: {
      cumulativeGPA: "2.84",
      probationTerm: "Fall 2026",
      actionNeeded: "Academic Improvement Contract (AIC)"
    },
    resolutionNotes: "",
    createdAt: "2026-09-01T16:00:00.000Z",
    updatedAt: "2026-09-03T09:00:00.000Z",
    resolvedAt: null,
    timeline: [
      {
        id: "TL-016",
        action: "Ticket Created",
        actor: "David Kim (Student)",
        note: "Filed mandatory academic standing consultation ticket.",
        timestamp: "2026-09-01T16:00:00.000Z",
        statusBadge: "submitted"
      },
      {
        id: "TL-017",
        action: "Dean's Personal Review",
        actor: "Dr. Sarah Vance (College Dean)",
        note: "Reviewed medical documentation. Scheduled an in-person confidential consultation for Sept 7 at 11:00 AM to finalize the recovery learning plan.",
        timestamp: "2026-09-03T09:00:00.000Z",
        statusBadge: "scheduled"
      }
    ],
    studentNotes: []
  },
  {
    id: "TKT-8460",
    ticketNumber: "TKT-8460",
    studentId: "2024-10947",
    studentName: "Zoe Takahashi",
    studentEmail: "zoe.takahashi@demo.edu",
    studentProgram: "BS Architecture",
    title: "Overload Enrollment Petition (21 Units) for Studio Sequence",
    category: "Enrollment & Registration",
    urgency: "high",
    status: "resolved",
    purposeOfVisit: "Dean's Approval for Unit Overload Exemption",
    preferredMeetingSlot: "2026-08-30T14:00",
    meetingMode: "Dean's Office (Room 302)",
    preferredContact: "University Email",
    assignedStaff: "Dr. Sarah Vance (College Dean)",
    details: "Requesting overload permission to take 21 units (including ARCH-302 Advanced Design Studio and ARCH-315 Structural Systems) to remain on track for accelerated 5-year B.Arch track. Cumulative GPA is 3.71.",
    additionalInfo: {
      standardMaxUnits: "18 Units",
      requestedUnits: "21 Units",
      cumulativeGPA: "3.71"
    },
    resolutionNotes: "Overload granted based on consistent academic excellence (>3.70 GPA) and Dean's List standing for 3 consecutive semesters. Registrar authorized.",
    createdAt: "2026-08-29T10:30:00.000Z",
    updatedAt: "2026-08-31T14:15:00.000Z",
    resolvedAt: "2026-08-31T14:15:00.000Z",
    timeline: [
      {
        id: "TL-018",
        action: "Ticket Created",
        actor: "Zoe Takahashi (Student)",
        note: "Submitted 21-unit overload application with academic justification.",
        timestamp: "2026-08-29T10:30:00.000Z",
        statusBadge: "submitted"
      },
      {
        id: "TL-019",
        action: "Review & Approval",
        actor: "Dr. Sarah Vance (College Dean)",
        note: "Petition approved. Maximum unit ceiling in registrar portal raised from 18 to 21 units.",
        timestamp: "2026-08-31T14:15:00.000Z",
        statusBadge: "resolved"
      }
    ],
    studentNotes: []
  },
  {
    id: "TKT-8455",
    ticketNumber: "TKT-8455",
    studentId: "2024-11058",
    studentName: "Carlos Mendez",
    studentEmail: "carlos.mendez@demo.edu",
    studentProgram: "BS Mechanical Engineering",
    title: "Midterm Grade Verification & Re-scoring Inquiry (PHYS-201)",
    category: "Student Grievance & Appeal",
    urgency: "medium",
    status: "under_review",
    purposeOfVisit: "Formal Inquiry regarding Exam Rubric Calculation",
    preferredMeetingSlot: "2026-09-08T16:00",
    meetingMode: "Physics Department Conference Room",
    preferredContact: "University Email",
    assignedStaff: "Prof. Marcus Thorne (Academic Advisor)",
    details: "In Midterm Examination 1 for General Physics (PHYS-201), Problem 4 (thermodynamics) had correct derivation steps but was marked with zero partial credit due to an alleged arithmetic calculation omission. Seeking formal rubric mediation.",
    additionalInfo: {
      courseCode: "PHYS-201",
      section: "Section B - Prof. Henderson",
      examPaperAttached: "Yes"
    },
    resolutionNotes: "",
    createdAt: "2026-09-02T14:50:00.000Z",
    updatedAt: "2026-09-04T10:00:00.000Z",
    resolvedAt: null,
    timeline: [
      {
        id: "TL-020",
        action: "Ticket Created",
        actor: "Carlos Mendez (Student)",
        note: "Filed formal exam grade review petition with annotated test paper.",
        timestamp: "2026-09-02T14:50:00.000Z",
        statusBadge: "submitted"
      },
      {
        id: "TL-021",
        action: "Ombudsman Intake",
        actor: "Prof. Marcus Thorne",
        note: "Contacted Course Coordinator Prof. Henderson to request original grading rubric for Problem 4.",
        timestamp: "2026-09-04T10:00:00.000Z",
        statusBadge: "under_review"
      }
    ],
    studentNotes: []
  },
  {
    id: "TKT-8450",
    ticketNumber: "TKT-8450",
    studentId: "2024-11169",
    studentName: "Amina Al-Mansoor",
    studentEmail: "amina.almansoor@demo.edu",
    studentProgram: "MS Information Security",
    title: "Security Clearance Endorsement for National Cybersecurity Fellowship",
    category: "Academic Advising",
    urgency: "high",
    status: "submitted",
    purposeOfVisit: "Dean's Letter of Recommendation & Security Endorsement",
    preferredMeetingSlot: "2026-09-10T14:00",
    meetingMode: "Dean's Office (Room 302B)",
    preferredContact: "University Email",
    assignedStaff: "Dr. Sarah Vance (College Dean)",
    details: "Selected as a finalist for the National Cybersecurity Fellowship Grant. Requires an official institutional security endorsement and Dean's signed letter of verification before the Sept 15 federal deadline.",
    additionalInfo: {
      fellowshipGrant: "National Cybersecurity Research Initiative ($25,000)",
      submissionDeadline: "September 15, 2026",
      institutionalSigner: "College Dean"
    },
    resolutionNotes: "",
    createdAt: "2026-09-05T07:45:00.000Z",
    updatedAt: "2026-09-05T07:45:00.000Z",
    resolvedAt: null,
    timeline: [
      {
        id: "TL-022",
        action: "Ticket Created",
        actor: "Amina Al-Mansoor (Graduate Student)",
        note: "Submitted fellowship verification request with federal paperwork checklist.",
        timestamp: "2026-09-05T07:45:00.000Z",
        statusBadge: "submitted"
      }
    ],
    studentNotes: []
  },
  {
    id: "TKT-8445",
    ticketNumber: "TKT-8445",
    studentId: "2024-11492",
    studentName: "Maya Lin",
    studentEmail: "maya.lin@demo.edu",
    studentProgram: "BS Software Engineering",
    title: "Industry Internship Credit Accreditation for Fall Semester",
    category: "Academic Advising",
    urgency: "medium",
    status: "resolved",
    purposeOfVisit: "Co-op & Internship Unit Conversion (SE-395)",
    preferredMeetingSlot: "2026-08-26T11:00",
    meetingMode: "Advising Center (Room 201)",
    preferredContact: "University Email",
    assignedStaff: "Prof. Marcus Thorne (Academic Advisor)",
    details: "Completed 480 hours of full-stack software engineering internship at Anthropic Cloud Labs. Requesting approval to convert this co-op experience into 3 elective credits for SE-395 Professional Practice.",
    additionalInfo: {
      company: "Anthropic Cloud Labs",
      supervisorEvaluation: "Exceeds Expectations (10/10)",
      hoursLogged: "480 Hours"
    },
    resolutionNotes: "Internship portfolio, timesheets, and employer evaluation verified. 3 academic units approved and credited to Degree Audit for SE-395.",
    createdAt: "2026-08-25T11:00:00.000Z",
    updatedAt: "2026-08-28T16:00:00.000Z",
    resolvedAt: "2026-08-28T16:00:00.000Z",
    timeline: [
      {
        id: "TL-023",
        action: "Ticket Created",
        actor: "Maya Lin (Student)",
        note: "Submitted co-op evaluation package.",
        timestamp: "2026-08-25T11:00:00.000Z",
        statusBadge: "submitted"
      },
      {
        id: "TL-024",
        action: "Portfolio Evaluated",
        actor: "Prof. Marcus Thorne",
        note: "Evaluated technical report and verified employer verification signatures.",
        timestamp: "2026-08-27T14:30:00.000Z",
        statusBadge: "under_review"
      },
      {
        id: "TL-025",
        action: "Units Credited & Resolved",
        actor: "Prof. Marcus Thorne",
        note: "Accredited 3 credits for SE-395. Recorded in student ledger.",
        timestamp: "2026-08-28T16:00:00.000Z",
        statusBadge: "resolved"
      }
    ],
    studentNotes: []
  },
  {
    id: "TKT-8440",
    ticketNumber: "TKT-8440",
    studentId: "2024-11503",
    studentName: "Julian Vance",
    studentEmail: "julian.vance@demo.edu",
    studentProgram: "BS Accountancy",
    title: "CPA Licensure Review Class Conflict Rescheduling",
    category: "Enrollment & Registration",
    urgency: "medium",
    status: "submitted",
    purposeOfVisit: "Section Transfer Request for ACC-401",
    preferredMeetingSlot: "2026-09-09T14:30",
    meetingMode: "Business Department Office",
    preferredContact: "University Email",
    assignedStaff: "Advising Intake Queue",
    details: "Due to the mandatory Saturday CPA Review lecture series, my schedule conflicts with ACC-401 Auditing Theory Section A. Requesting transfer into Section C which meets Tuesday/Thursday evenings.",
    additionalInfo: {
      currentSection: "ACC-401 Sec A (Sat 8:00 AM)",
      targetSection: "ACC-401 Sec C (Tue/Thu 6:00 PM)",
      reason: "CPA Board Examination Prep"
    },
    resolutionNotes: "",
    createdAt: "2026-09-05T12:00:00.000Z",
    updatedAt: "2026-09-05T12:00:00.000Z",
    resolvedAt: null,
    timeline: [
      {
        id: "TL-026",
        action: "Ticket Created",
        actor: "Julian Vance (Student)",
        note: "Submitted section transfer request.",
        timestamp: "2026-09-05T12:00:00.000Z",
        statusBadge: "submitted"
      }
    ],
    studentNotes: []
  },
  {
    id: "TKT-8435",
    ticketNumber: "TKT-8435",
    studentId: "2024-11614",
    studentName: "Chloe Bennett",
    studentEmail: "chloe.bennett@demo.edu",
    studentProgram: "BS Computer Science (Class of 2023)",
    title: "Official Certified Transcript with Dean's Seal for Overseas Graduate School",
    category: "Clearance & Graduation",
    urgency: "high",
    status: "resolved",
    purposeOfVisit: "Alumni Expedited Records & Apostille Seal",
    preferredMeetingSlot: "2026-08-20T10:00",
    meetingMode: "Records & Archives Center",
    preferredContact: "University Email",
    assignedStaff: "Dean's Office Records Clerk",
    details: "I am an alumna applying for a doctoral program in Zurich. Need an expedited certified transcript sealed with the Dean of Science seal and official English certification.",
    additionalInfo: {
      destinationInstitution: "ETH Zurich Admissions Office",
      graduationYear: "2023",
      degree: "BS Computer Science (Cum Laude)"
    },
    resolutionNotes: "Official sealed electronic credential dispatched via secure parchment exchange to ETH Zurich. Tracking code provided to student.",
    createdAt: "2026-08-19T09:00:00.000Z",
    updatedAt: "2026-08-21T11:20:00.000Z",
    resolvedAt: "2026-08-21T11:20:00.000Z",
    timeline: [
      {
        id: "TL-027",
        action: "Ticket Created",
        actor: "Chloe Bennett (Alumni)",
        note: "Submitted expedited alumni credential request.",
        timestamp: "2026-08-19T09:00:00.000Z",
        statusBadge: "submitted"
      },
      {
        id: "TL-028",
        action: "Dean's Seal Applied",
        actor: "Dean's Office Records Clerk",
        note: "Dean Vance applied official university cryptographic seal to PDF credential.",
        timestamp: "2026-08-20T15:00:00.000Z",
        statusBadge: "under_review"
      },
      {
        id: "TL-029",
        action: "Delivered & Resolved",
        actor: "Dean's Office Records Clerk",
        note: "Sent through National Student Clearinghouse. Closed.",
        timestamp: "2026-08-21T11:20:00.000Z",
        statusBadge: "resolved"
      }
    ],
    studentNotes: []
  },
  {
    id: "TKT-8430",
    ticketNumber: "TKT-8430",
    studentId: "2024-11836",
    studentName: "Lucas Silva",
    studentEmail: "lucas.silva@demo.edu",
    studentProgram: "BS Information Systems",
    title: "Computer Lab Network Switch Replacement Procurement Authorization",
    category: "Special Accommodation & Wellness",
    urgency: "low",
    status: "resolved",
    purposeOfVisit: "Student Staff Hardware Requisition Approval",
    preferredMeetingSlot: "2026-08-24T16:00",
    meetingMode: "IT Infrastructure Office",
    preferredContact: "University Email",
    assignedStaff: "Dr. Sarah Vance (College Dean)",
    details: "As student lab manager for Lab 402, 3 ports on the Cisco 48-port switch failed during the networking practical exam. Requesting sign-off on the warranty replacement requisition form.",
    additionalInfo: {
      labRoom: "Room 402 CIS Networking Lab",
      hardwareTag: "HW-SW-9021",
      estimatedCost: "$0 (Covered under Cisco SMARTnet)"
    },
    resolutionNotes: "Warranty replacement RMA #889211 authorized and signed. Replacement switch arrived and configured.",
    createdAt: "2026-08-23T14:00:00.000Z",
    updatedAt: "2026-08-25T17:00:00.000Z",
    resolvedAt: "2026-08-25T17:00:00.000Z",
    timeline: [
      {
        id: "TL-030",
        action: "Ticket Created",
        actor: "Lucas Silva (Student Staff)",
        note: "Submitted RMA replacement authorization form.",
        timestamp: "2026-08-23T14:00:00.000Z",
        statusBadge: "submitted"
      },
      {
        id: "TL-031",
        action: "Authorized & Resolved",
        actor: "Dr. Sarah Vance (College Dean)",
        note: "Dean signed warranty return. IT staff scheduled swap.",
        timestamp: "2026-08-25T17:00:00.000Z",
        statusBadge: "resolved"
      }
    ],
    studentNotes: []
  },
  {
    id: "TKT-8425",
    ticketNumber: "TKT-8425",
    studentId: "2024-11947",
    studentName: "Hannah Schmidt",
    studentEmail: "hannah.schmidt@demo.edu",
    studentProgram: "BS Chemistry",
    title: "Laboratory Chemical Safety Protocol Exemption for Senior Thesis",
    category: "Clearance & Graduation",
    urgency: "urgent",
    status: "under_review",
    purposeOfVisit: "Environmental Health & Safety Dean Endorsement",
    preferredMeetingSlot: "2026-09-08T09:30",
    meetingMode: "Chemistry Department Head Office",
    preferredContact: "University Email",
    assignedStaff: "Dr. Eleanor Wu (Science Advisor)",
    details: "Senior research on catalytic synthesis requires access to the high-vacuum inert gas glovebox outside normal laboratory hours (7:00 PM - 10:00 PM). Requesting Dean's joint safety endorsement with EH&S.",
    additionalInfo: {
      labFacility: "Advanced Synthesis Lab 314",
      safetyCertificationLevel: "Biosafety Level 2 & Hazmat Class C",
      facultyMentor: "Dr. Klaus Richter"
    },
    resolutionNotes: "",
    createdAt: "2026-09-04T15:00:00.000Z",
    updatedAt: "2026-09-05T08:30:00.000Z",
    resolvedAt: null,
    timeline: [
      {
        id: "TL-032",
        action: "Ticket Created",
        actor: "Hannah Schmidt (Student)",
        note: "Submitted extended lab hours safety permit with faculty endorsement.",
        timestamp: "2026-09-04T15:00:00.000Z",
        statusBadge: "submitted"
      },
      {
        id: "TL-033",
        action: "Safety Protocol Review",
        actor: "Dr. Eleanor Wu",
        note: "Coordinating with Campus Safety Officer Mr. Ramos for keycard permission review.",
        timestamp: "2026-09-05T08:30:00.000Z",
        statusBadge: "under_review"
      }
    ],
    studentNotes: []
  }
];

export const INITIAL_RATINGS = [
  {
    id: "RTG-101",
    studentName: "Alex Morgan",
    studentEmail: "alex.morgan@demo.edu",
    studentId: "2024-10492",
    rating: 5,
    category: "Dean's Office Walk-in Assistance",
    feedback: "Dr. Vance and the advising staff were extremely helpful in quickly resolving my graduation clearance override. The real-time tracker kept me informed at every step!",
    responseQuality: "Outstanding",
    waitTimeMinutes: 8,
    createdAt: "2026-09-02T16:00:00.000Z"
  },
  {
    id: "RTG-102",
    studentName: "Zoe Takahashi",
    studentEmail: "zoe.takahashi@demo.edu",
    studentId: "2024-10947",
    rating: 5,
    category: "Enrollment Overload Approval",
    feedback: "The process of petitioning for an overload used to take 2 weeks with paper forms. Through TrailAssistance, it was processed and approved in under 48 hours. Incredible improvement!",
    responseQuality: "Outstanding",
    waitTimeMinutes: 12,
    createdAt: "2026-08-31T15:00:00.000Z"
  },
  {
    id: "RTG-103",
    studentName: "Maya Lin",
    studentEmail: "maya.lin@demo.edu",
    studentId: "2024-11492",
    rating: 5,
    category: "Internship Accreditation",
    feedback: "Prof. Thorne was very supportive and thorough during the internship credit evaluation. Clear rubrics and fast responses.",
    responseQuality: "Outstanding",
    waitTimeMinutes: 5,
    createdAt: "2026-08-28T17:00:00.000Z"
  },
  {
    id: "RTG-104",
    studentName: "Lucas Silva",
    studentEmail: "lucas.silva@demo.edu",
    studentId: "2024-11836",
    rating: 4,
    category: "IT Hardware Requisition",
    feedback: "Smooth sign-off by the Dean's desk. The automated notification when my RMA was stamped helped our lab maintain uninterrupted exams.",
    responseQuality: "Very Good",
    waitTimeMinutes: 15,
    createdAt: "2026-08-26T09:00:00.000Z"
  },
  {
    id: "RTG-105",
    studentName: "Chloe Bennett",
    studentEmail: "chloe.bennett@demo.edu",
    studentId: "2024-11614",
    rating: 5,
    category: "Alumni Transcript Request",
    feedback: "As an overseas alumni, getting certified records can be stressful. The Dean's office sent my apostille documents directly to ETH Zurich without any delay. Highly recommended!",
    responseQuality: "Outstanding",
    waitTimeMinutes: 10,
    createdAt: "2026-08-21T14:30:00.000Z"
  },
  {
    id: "RTG-106",
    studentName: "Elena Rostova",
    studentEmail: "elena.rostova@demo.edu",
    studentId: "2024-10503",
    rating: 4,
    category: "Curricular Advising",
    feedback: "Great UI and intuitive booking for the advising session. The meeting link and room location were clearly indicated on the confirmation slip.",
    responseQuality: "Very Good",
    waitTimeMinutes: 10,
    createdAt: "2026-08-20T11:45:00.000Z"
  }
];

export const DEMO_PERSONAS = {
  student: {
    name: "Alex Morgan",
    email: "alex.morgan@demo.edu",
    studentId: "2024-10492",
    role: "undergraduate",
    college: "College of Information Technology & Computing",
    program: "BS Computer Science",
    yearOfStudy: "4th Year - Senior",
    academicStanding: "Dean's Lister",
    phone: "+1 (555) 342-8910",
    advisor: "Dr. Sarah Vance",
    avatar: "AM"
  },
  admin: {
    name: "Dr. Sarah Vance",
    email: "sarah.vance@university.edu",
    facultyId: "FAC-DEAN-001",
    role: "admin",
    title: "Dean of the College of Information Technology",
    department: "Dean's Office",
    phone: "+1 (555) 901-2000",
    avatar: "SV"
  },
  kiosk: {
    name: "Dean's Office Lobby Terminal #01",
    location: "Main Academic Complex - Level 3",
    role: "kiosk",
    mode: "Self-Service Terminal"
  }
};
