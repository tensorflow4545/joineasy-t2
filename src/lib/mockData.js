// lib/mockData.js

export const mockCourses = [
    { id: 1, name: 'Data Structures', code: 'CS101', professor: 'Dr. Smith' },
    { id: 2, name: 'Web Development', code: 'CS202', professor: 'Dr. Johnson' },
  ];
  
  export const mockAssignments = [
    {
      id: 1,
      courseId: 1,
      title: 'Array Implementation',
      description: 'Implement basic array operations',
      deadline: '2025-11-10',
      oneDriveLink: 'https://onedrive.com/...',
      submissionType: 'individual', // 'individual' or 'group'
      createdBy: 'prof1',
    },
    {
      id: 2,
      courseId: 1,
      title: 'Group Project - Sorting',
      description: 'Implement sorting algorithms in groups',
      deadline: '2025-11-15',
      oneDriveLink: 'https://onedrive.com/...',
      submissionType: 'group',
      createdBy: 'prof1',
    },
  ];
  
  // Provide an alias used elsewhere in the app
  export const INITIAL_ASSIGNMENTS = mockAssignments;
  
  export const mockSubmissions = [
    {
      id: 1,
      assignmentId: 1,
      studentId: 'student1',
      acknowledged: true,
      timestamp: '2025-11-08T10:30:00',
    },
  ];
  
  export const mockGroups = [
    {
      id: 1,
      assignmentId: 2,
      courseId: 1,
      name: 'Group A',
      leaderId: 'student1',
      members: ['student1', 'student2', 'student3'],
    },
  ];
  
  export const mockUsers = [
    {
      id: 'prof1',
      name: 'Dr. Smith',
      email: 'smith@university.edu',
      role: 'professor',
      coursesTeaching: [1],
    },
    {
      id: 'admin',
      name: 'Administrator',
      email: 'admin@university.edu',
      role: 'admin',
      coursesTeaching: [1],
    },
    {
      id: 'prof2',
      name: 'Dr. Johnson',
      email: 'johnson@university.edu',
      role: 'professor',
      coursesTeaching: [2],
    },
    {
      id: 'student1',
      name: 'John Doe',
      email: 'john@university.edu',
      role: 'student',
      enrolledCourses: [1, 2],
    },
    {
      id: 'student2',
      name: 'Jane Smith',
      email: 'jane@university.edu',
      role: 'student',
      enrolledCourses: [1],
    },
  ];
  
  // Provide users with credentials for login flow
  export const USERS = [
    { id: 'admin', password: 'admin123', role: 'admin', name: 'Administrator' },
    { id: 'prof1', password: 'prof123', role: 'professor', name: 'Dr. Smith' },
    { id: 'prof2', password: 'prof123', role: 'professor', name: 'Dr. Johnson' },
    { id: 'student1', password: 'student123', role: 'student', name: 'John Doe' },
    { id: 'student2', password: 'student123', role: 'student', name: 'Jane Smith' },
  ];