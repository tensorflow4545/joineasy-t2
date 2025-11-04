'use client'

import { useState,useEffect } from "react";
import { mockAssignments,mockCourses } from "@/lib/mockData";
import AssignmentDetails from "./AssignmentDetails";

export default function Assignment({courseId,userRole,userId}){
  const [selectedAssignment,setSelectedAssignment]=useState(null);
  const [showCreateForm,setShowCreateForm]=useState(false);

  const assignments=mockAssignments.filter(a=>a.courseId===courseId);
  const course=mockCourses.find(c=>c.id===courseId);


  if(selectedAssignment){
    return (
        <AssignmentDetails
            assignment={selectedAssignment}
            course={course}
            userRole={userRole}
            userId={userId}
            onBack={()=>selectedAssignment(false)}
        />
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-black">{course.name}</h2>
          <p className="text-gray-600">{course.code}</p>
        </div>
        {userRole === 'professor' && (
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showCreateForm ? 'Cancel' : 'Create Assignment'}
          </button>
        )}
      </div>

      {showCreateForm && userRole === 'professor' && (
        <CreateAssignmentForm courseId={courseId} onClose={() => setShowCreateForm(false)} />
      )}

      {assignments.length === 0 ? (
        <p className="text-gray-500">No assignments yet</p>
      ) : (
        <div className="space-y-4">
          {assignments.map(assignment => (
            <div
              key={assignment.id}
              onClick={() => setSelectedAssignment(assignment)}
              className="p-4 border border-gray-300 rounded hover:shadow-lg cursor-pointer transition"
            >
              <h3 className="font-bold text-lg text-black">{assignment.title}</h3>
              <p className="text-gray-600 text-sm">{assignment.description}</p>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-700">Deadline: {assignment.deadline}</span>
                <span className={`px-2 py-1 rounded text-white ${assignment.submissionType === 'individual' ? 'bg-green-500' : 'bg-blue-500'}`}>
                  {assignment.submissionType === 'individual' ? 'Individual' : 'Group'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CreateAssignmentForm({ courseId, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    oneDriveLink: '',
    submissionType: 'individual',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating assignment:', { courseId, ...formData });
    // Add to mockAssignments or call API
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded mb-6 space-y-3">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full p-2 border rounded"
        rows="3"
      />
      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="url"
        placeholder="OneDrive Link"
        value={formData.oneDriveLink}
        onChange={(e) => setFormData({ ...formData, oneDriveLink: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <select
        value={formData.submissionType}
        onChange={(e) => setFormData({ ...formData, submissionType: e.target.value })}
        className="w-full p-2 border rounded"
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