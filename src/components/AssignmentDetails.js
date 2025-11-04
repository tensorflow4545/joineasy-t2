'use client'

import { useState,useEffect } from "react";
import { mockGroups,mockUsers } from "@/lib/mockData";
import { getSubmissions,setAcknowledgement } from "@/lib/storage";

export default function AssignmentDetails({assignment,courses,userRole,userId,onBack}){
   const [submissions,setSubmissions]=useState({});
   const [acknowledged,setAcknnowledged]=useState(false);


   useEffect(()=>{
     const stored=getSubmissions();
     setSubmissions(stored);
     const ack=Boolean(stored?.[assignment.id]?.[userId]?.acknowledged);
     setAcknnowledged(ack);
   },[assignment.id,userId]);


  const userGroup=mockGroups.find(g=> g.assignmentId===assignment.id && g.members.includes(userId));
  const isGroupLeader=userGroup?.leaderId===userId;

  const submissionCount=(()=>{
    const map=submissions?.[assignmentId]||{};
    return Object.values(map).filter(v=>v?.acknowledged).length;
  })();

  const totaStudentInCourse=mockUsers.filter(
    u=>u.role==='student' && (u.enrolledCourses|| []).includes(course.id)
  ).length;

  const progreesPct=totaStudentInCourse>0?Math.min(100,Math.round((submissionCount/totaStudentInCourse)*100)):0;

  const handleAcknowledge = () => {
    const current = getSubmissions();
    const now = new Date().toISOString();
    const byAssignment = current[assignment.id] || {};

    if (assignment.submissionType === 'group') {
      const group = mockGroups.find(g => g.assignmentId === assignment.id && g.members.includes(userId));
      const leaderId = group?.leaderId;
      if (!group || leaderId !== userId) {
        return; // only leader can acknowledge
      }
      group.members.forEach(memberId => {
        byAssignment[memberId] = { acknowledged: true, timestamp: now };
      });
    } else {
      byAssignment[userId] = { acknowledged: true, timestamp: now };
    }

    const updated = { ...current, [assignment.id]: byAssignment };
    saveSubmissions(updated);
    setSubmissions(updated);
    setAcknowledged(true);
  };


  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <button
        onClick={onBack}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Back to Assignments
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-black">{assignment.title}</h1>
        <p className="text-gray-600 mb-4">{assignment.description}</p>

        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
          <div>
            <p className="text-gray-700 font-semibold">Deadline</p>
            <p className="text-lg">{assignment.deadline}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Submission Type</p>
            <p className="text-lg">
              {assignment.submissionType === 'individual' ? 'Individual' : 'Group'}
            </p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">OneDrive Link</p>
            <a href={assignment.oneDriveLink} target="_blank" className="text-blue-600 hover:underline">
              Open Link
            </a>
          </div>
        </div>
      </div>

      {userRole === 'professor' && (
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-bold mb-2 text-black">Submission Analytics</h3>
          <p className="text-gray-700">{submissionCount} of {totalStudentsInCourse} acknowledged</p>
          <div className="w-full bg-gray-300 rounded h-2 mt-2">
            <div className="bg-green-500 h-2 rounded" style={{ width: `${progressPct}%` }}></div>
          </div>
        </div>
      )}

      {userRole === 'student' && (
        <div className="mt-6">
          {assignment.submissionType === 'individual' ? (
            <IndividualSubmission acknowledged={acknowledged} onAcknowledge={handleAcknowledge} />
          ) : (
            <GroupSubmission userGroup={userGroup} isGroupLeader={isGroupLeader} acknowledged={acknowledged} onAcknowledge={handleAcknowledge} />
          )}
        </div>
      )}
    </div>
  );
}

function IndividualSubmission({ acknowledged, onAcknowledge }) {
  return (
    <div className="bg-yellow-50 p-4 rounded border border-yellow-300">
      {acknowledged ? (
        <div className="text-green-700 font-semibold flex items-center">
          ✓ You have acknowledged this assignment
        </div>
      ) : (
        <button
          onClick={onAcknowledge}
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 font-semibold"
        >
          Yes, I have submitted
        </button>
      )}
    </div>
  );
}

function GroupSubmission({ userGroup, isGroupLeader, acknowledged, onAcknowledge }) {
  if (!userGroup) {
    return (
      <div className="bg-red-50 p-4 rounded border border-red-300">
        <p className="text-red-700 font-semibold">⚠️ You are not part of any group for this assignment</p>
        <p className="text-red-600 text-sm mt-1">Form or join a group to submit this assignment</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded border border-blue-300">
        <h3 className="font-bold mb-2 text-black">Your Group: {userGroup.name}</h3>
        <p className="text-gray-700 text-sm mb-2">Members:</p>
        <ul className="list-disc list-inside text-gray-700 text-sm">
          {userGroup.members.map(memberId => (
            <li key={memberId}>{memberId} {userGroup.leaderId === memberId && '(Leader)'}</li>
          ))}
        </ul>
      </div>

      {isGroupLeader ? (
        acknowledged ? (
          <div className="bg-green-50 p-4 rounded border border-green-300">
            <p className="text-green-700 font-semibold">✓ Group acknowledged - all members can see this</p>
          </div>
        ) : (
          <button
            onClick={onAcknowledge}
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 font-semibold"
          >
            Acknowledge for Group
          </button>
        )
      ) : (
        <div className="bg-gray-50 p-4 rounded border border-gray-300">
          <p className="text-gray-700 font-semibold">⏳ Waiting for group leader acknowledgment...</p>
        </div>
      )}
    </div>
  );
}