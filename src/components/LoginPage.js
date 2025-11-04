'use client'

import {useState} from "react";
import { BookOpen } from "lucide-react";
import {USERS} from "@/lib/mockData";
import {saveUser,saveToken} from "@/lib/storage";
import {signToken} from "@/lib/jwt";

export default function LoginPage({onLogin}){
   const [loginForm,setLoginForm]=useState({id:'',password:''});
   const [error,setError]=useState(' ');
   const [showPassword,setShowPassword]=useState(false);

   const handleLogin=async()=>{
    const user=USERS.find((u)=>u.id===loginForm.id && u.password===loginForm.password);

    if(user){
        saveUser(user);
         try{
            const token=await signToken({id:user.id,role:user.role,name:user.name},'demo-secret-123',2*60*60);
            saveToken(token);

         }catch(e){

         }
         onLogin(user);
    }else{
        setError("Invalid credentials");
    }
   }

   
   return (
    <>
<div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
  <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
    <div className="text-center mb-8">
      <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800">Assignment Portal</h1>
      <p className="text-gray-600 mt-2">Sign in to continue</p>
    </div>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          User ID
        </label>
        <input
          type="text"
          value={loginForm.id}
          onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })}
          className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter your ID"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-2 pr-10 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter password"

            
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}

      <button
        onClick={handleLogin}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Sign In
      </button>
    </div>

    <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
      <p className="font-semibold text-gray-700 mb-2">Demo Credentials:</p>
      <div className="grid grid-cols-1 gap-1 text-gray-600">
        <p>Admin: admin / admin123</p>
        <p>Professor 1: prof1 / prof123</p>
        <p>Professor 2: prof2 / prof123</p>
        <p>Student 1: student1 / student123</p>
        <p>Student 2: student2 / student123</p>
      </div>
    </div>
  </div>
</div>
    </>
)

}