'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { api } from '../lib/apiHelper'

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking')

  useEffect(() => {
    // Check backend health using standardized API helper
    const healthUrl = api('/health');

    fetch(healthUrl)
      .then(res => {
        if (res.ok) {
          setBackendStatus('online')
        } else {
          setBackendStatus('offline')
        }
      })
      .catch((error) => {
        console.error('Health check failed:', error);
        setBackendStatus('offline')
      })
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="px-4 pt-10 sm:px-6 lg:px-8">
              <div className="text-center sm:text-left">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Stay Organized, </span>
                  <span className="block mt-2 text-indigo-600">Get Things Done</span>
                </h1>
                <p className="max-w-lg mx-auto mt-6 text-lg text-gray-600 sm:mx-0">
                  A beautiful and intuitive todo application with secure authentication and seamless task management.
                </p>

                {/* Status Indicators */}
                <div className="flex flex-col items-center justify-center gap-6 mt-8 sm:flex-row sm:justify-start">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${backendStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-medium text-gray-700">
                      Backend: {backendStatus === 'checking' ? 'Checking...' : backendStatus === 'online' ? 'Online ✅' : 'Offline ❌'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Frontend: Online ✅
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row sm:justify-start">
                  <Link
                    href="/signup"
                    className="px-8 py-3 text-base font-medium text-white transition-all duration-200 transform bg-indigo-600 border border-transparent rounded-md shadow-lg hover:bg-indigo-700 hover:scale-105 hover:shadow-xl"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/login"
                    className="px-8 py-3 text-base font-medium text-gray-700 transition-all duration-200 transform bg-white border border-gray-300 rounded-md shadow-lg hover:bg-gray-50 hover:scale-105 hover:shadow-xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/dashboard"
                    className="px-8 py-3 text-base font-medium text-indigo-700 transition-all duration-200 transform bg-white border border-indigo-300 rounded-md shadow-lg hover:bg-indigo-50 hover:scale-105 hover:shadow-xl"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="absolute inset-0 w-full h-full opacity-20">
            <div className="absolute bg-indigo-300 rounded-full top-1/4 right-10 w-72 h-72 mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bg-purple-300 rounded-full top-1/3 right-40 w-72 h-72 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bg-pink-300 rounded-full top-1/2 right-20 w-72 h-72 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful Features
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to stay productive
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {/* Authentication Card */}
            <div className="p-8 transition-shadow duration-300 border border-gray-100 shadow-xl bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:shadow-2xl">
              <div className="flex items-center justify-center w-16 h-16 mb-6 bg-indigo-100 rounded-full">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">🔐 Secure Authentication</h3>
              <p className="mb-6 text-gray-600">
                Industry-standard JWT authentication with secure password hashing and token management.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/signup"
                  className="flex-1 px-4 py-2 font-medium text-center text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="flex-1 px-4 py-2 font-medium text-center text-gray-800 transition bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Log In
                </Link>
              </div>
            </div>

            {/* Task Management Card */}
            <div className="p-8 transition-shadow duration-300 border border-gray-100 shadow-xl bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:shadow-2xl">
              <div className="flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">✅ Smart Task Management</h3>
              <p className="mb-6 text-gray-600">
                Create, organize, and track your tasks with intuitive interfaces and smart features.
              </p>
              <Link
                href="/tasks"
                className="block w-full px-4 py-2 font-medium text-center text-white transition bg-green-600 rounded-lg hover:bg-green-700"
              >
                Manage Tasks
              </Link>
            </div>

            {/* Real-time Sync Card */}
            <div className="p-8 transition-shadow duration-300 border border-gray-100 shadow-xl bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:shadow-2xl">
              <div className="flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">🔄 Real-time Sync</h3>
              <p className="mb-6 text-gray-600">
                Your tasks are synced across all devices in real-time with our reliable cloud infrastructure.
              </p>
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-16 bg-gradient-to-r from-gray-50 to-indigo-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Modern Tech Stack
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Built with cutting-edge technologies
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
            <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-xl">
              <h3 className="flex items-center mb-4 text-xl font-bold text-gray-900">
                <span className="w-2 h-2 mr-3 bg-blue-600 rounded-full"></span>
                Frontend
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-indigo-500 rounded-full"></span>
                  <span className="text-gray-700">Next.js 16</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-indigo-500 rounded-full"></span>
                  <span className="text-gray-700">React 19</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-indigo-500 rounded-full"></span>
                  <span className="text-gray-700">TypeScript</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-indigo-500 rounded-full"></span>
                  <span className="text-gray-700">Tailwind CSS</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-xl">
              <h3 className="flex items-center mb-4 text-xl font-bold text-gray-900">
                <span className="w-2 h-2 mr-3 bg-green-600 rounded-full"></span>
                Backend
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700">FastAPI</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700">Python 3.11</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700">SQLModel</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700">Uvicorn</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-xl">
              <h3 className="flex items-center mb-4 text-xl font-bold text-gray-900">
                <span className="w-2 h-2 mr-3 bg-purple-600 rounded-full"></span>
                Infrastructure
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-purple-500 rounded-full"></span>
                  <span className="text-gray-700">Docker</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-purple-500 rounded-full"></span>
                  <span className="text-gray-700">PostgreSQL</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-purple-500 rounded-full"></span>
                  <span className="text-gray-700">JWT Auth</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-purple-500 rounded-full"></span>
                  <span className="text-gray-700">CORS Enabled</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-indigo-100">
            Join thousands of users who trust our platform to manage their daily tasks and achieve their goals.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
            <Link
              href="/signup"
              className="px-8 py-3 text-base font-medium text-indigo-600 transition-all duration-200 transform bg-white border border-transparent rounded-md shadow-lg hover:bg-gray-50 hover:scale-105 hover:shadow-xl"
            >
              Create Account
            </Link>
            <a
              href={(() => {
                // Use standardized API helper
                return api('/docs');
              })()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-base font-medium text-white transition-all duration-200 transform border border-indigo-300 rounded-md shadow-lg hover:bg-indigo-700 hover:scale-105 hover:shadow-xl"
            >
              📚 API Documentation
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  )
}
