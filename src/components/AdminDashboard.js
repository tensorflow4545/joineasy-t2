'use client';

import { useState } from 'react';
import { mockUsers, mockCourses } from '@/lib/mockData';
import { getAssignments } from '@/lib/storage';
import AssignmentList from './AssignmentList';
import { GraduationCap, ClipboardList, BookOpen } from 'lucide-react';

export default function AdminDashboard({ userId }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const professor = mockUsers.find(u => u.id === userId);
  const teachingCourses = professor
    ? mockCourses.filter(c => (professor.coursesTeaching || []).includes(c.id))
    : [];

  const allAssignments = getAssignments();
  const totalAssignmentsForTeaching = teachingCourses.reduce((acc, c) => {
    return acc + allAssignments.filter(a => a.courseId === c.id).length;
  }, 0);

  if (!professor) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">No admin profile found</h1>
        <p className="text-gray-600">Please ensure the user exists in mock data.</p>
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <AssignmentList
        courseId={selectedCourse}
        userRole="professor"
        userId={userId}
        onBack={() => setSelectedCourse(null)}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="rounded-2xl bg-linear-to-r from-indigo-600 to-blue-600 text-white p-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8" />
            <h1 className="text-2xl md:text-3xl font-bold">Instructor Dashboard</h1>
          </div>
          <p className="mt-2 text-white/90">Welcome back, {professor.name}</p>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
          <span className="text-sm">Role</span>
          <span className="px-2 py-1 text-xs bg-white text-indigo-700 rounded">{professor.role}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Courses teaching</p>
              <p className="text-2xl font-bold">{teachingCourses.length}</p>
            </div>
            <BookOpen className="w-10 h-10 text-indigo-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total assignments</p>
              <p className="text-2xl font-bold">{totalAssignmentsForTeaching}</p>
            </div>
            <ClipboardList className="w-10 h-10 text-indigo-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
          <div>
            <p className="text-gray-500 text-sm">Quick tip</p>
            <p className="text-sm mt-1 text-gray-700">Click a course to manage its assignments.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Courses</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teachingCourses.map(course => (
          <div
            key={course.id}
            className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedCourse(course.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{course.name}</h3>
                <p className="text-gray-500 text-sm">{course.code} • {course.professor}</p>
              </div>
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>
                {allAssignments.filter(a => a.courseId === course.id).length} assignments
              </span>
              <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md group-hover:bg-indigo-700">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}