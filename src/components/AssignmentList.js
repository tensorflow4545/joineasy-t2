'use client'

import { useState,useEffect } from "react";
import { mockCourses } from "@/lib/mockData";
import { getAssignments,saveAssignments,getSubmissions } from "@/lib/storage";
import AssignmentDetails from "./AssignmentDetails";
import { ArrowLeft } from 'lucide-react';
export default function AssignmentList({courseId,userRole,userId,onBack}){
  const [selectedAssignment,setSelectedAssignment]=useState(null);
  const [showCreateForm,setShowCreateForm]=useState(false);
  const [assignments,setAssignments]=useState([]);
  const [submissions,setSubmissions]=useState({});

  useEffect(()=>{
    const allAssignment=getAssignments();
    setAssignments(allAssignment.filter(a=>a.courseId===courseId));
    setSubmissions(getSubmissions());
  },[courseId]);

  const course=mockCourses.find(c=>c.id===courseId);

  if(selectedAssignment){
    return (
        <AssignmentDetails 
            assignment={selectedAssignment}
            course={course}
            userRole={userRole}
            userId={userId}
            onBack={()=>setSelectedAssignment(null)}
        />
    )
  }

  const handleCreateAssignment=(data)=>{
    const allAssignment=getAssignments();
    const nextId=allAssignment.length?Math.max(...allAssignment.map(a=>a.id))+1:1;
    const newAssignment={
     id:nextId,
     courseId,
     title:data.title,
     description:data.description,
     deadline:data.deadline,
     oneDriveLink:data.oneDriveLink,
     submissionType:data.submissionType,
     createdBy:userId
    };

    const updated=[...allAssignment,newAssignment];
    saveAssignments(updated);
    setAssignments(updated.filter(a=>a.courseId===courseId));
    setShowCreateForm(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-2 text-black hover:text-orange-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </button>
      )}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-black">{course.name}</h2>
          <p className="text-black">{course.code}</p>
        </div>
        {userRole === 'professor' && (
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            {showCreateForm ? 'Cancel' : 'Create Assignment'}
          </button>
        )}
      </div>

      {showCreateForm && userRole === 'professor' && (
        <CreateAssignmentForm courseId={courseId} onClose={() => setShowCreateForm(false)} onCreate={handleCreateAssignment} />
      )}

      {assignments.length === 0 ? (
        <p className="text-black">No assignments yet</p>
      ) : (
        <div className="space-y-4">
          {assignments.map(assignment => (
            <div
              key={assignment.id}
              onClick={() => setSelectedAssignment(assignment)}
              className="p-4 border border-gray-300 rounded hover:shadow-lg cursor-pointer transition"
            >
              <h3 className="font-bold text-lg text-black">{assignment.title}</h3>
              <p className="text-black text-sm">{assignment.description}</p>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-black">Deadline: {assignment.deadline}</span>
                <div className="flex items-center gap-2">
                  {userRole === 'student' && submissions?.[assignment.id]?.[userId]?.acknowledged && (
                    <span className="px-2 py-1 rounded text-white bg-emerald-600">Acknowledged</span>
                  )}
                  <span className={`px-2 py-1 rounded text-white ${assignment.submissionType === 'individual' ? 'bg-green-500' : 'bg-orange-500'}`}>
                    {assignment.submissionType === 'individual' ? 'Individual' : 'Group'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CreateAssignmentForm({ courseId, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    oneDriveLink: '',
    submissionType: 'individual',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded mb-6 space-y-3">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-2 border rounded text-black"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full p-2 border rounded text-black"
        rows="3"
      />
      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full p-2 border rounded text-black"
        required
      />
      <input
        type="url"
        placeholder="OneDrive Link"
        value={formData.oneDriveLink}
        onChange={(e) => setFormData({ ...formData, oneDriveLink: e.target.value })}
        className="w-full p-2 border rounded text-black"
      />
      <select
        value={formData.submissionType}
        onChange={(e) => setFormData({ ...formData, submissionType: e.target.value })}
        className="w-full p-2 border rounded text-black"
      >
        <option value="individual">Individual Submission</option>
        <option value="group">Group Submission</option>
      </select>
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Create Assignment
      </button>
    </form>
  );
}