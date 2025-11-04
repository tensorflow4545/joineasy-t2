import { BookOpen, LogOut, Plus } from 'lucide-react'

export default function Navbar({ user, onLogout, onAddAssignment }) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {user.role === 'admin' ? 'Admin Dashboard' : 'My Assignments'}
              </h1>
              <p className="text-sm text-gray-600">{user.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {user.role === 'admin' && onAddAssignment && (
              <button
                onClick={onAddAssignment}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Assignment</span>
              </button>
            )}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}