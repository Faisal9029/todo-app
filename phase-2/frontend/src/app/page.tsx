'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking')

  useEffect(() => {
    // Check backend health with new URL construction method
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

    // Use new URL construction to prevent double slashes
    const healthUrl = new URL('/health', backendUrl).toString();

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
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 px-4 sm:px-6 lg:px-8">
              <div className="text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                  <span className="block">Stay Organized, </span>
                  <span className="block text-indigo-600 mt-2">Get Things Done</span>
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto sm:mx-0">
                  A beautiful and intuitive todo application with secure authentication and seamless task management.
                </p>

                {/* Status Indicators */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${backendStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-medium text-gray-700">
                      Backend: {backendStatus === 'checking' ? 'Checking...' : backendStatus === 'online' ? 'Online ✅' : 'Offline ❌'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Frontend: Online ✅
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
                  <Link
                    href="/signup"
                    className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/login"
                    className="px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/dashboard"
                    className="px-8 py-3 border border-indigo-300 text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
            <div className="absolute top-1/4 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-1/3 right-40 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful Features
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to stay productive
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Authentication Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">🔐 Secure Authentication</h3>
              <p className="text-gray-600 mb-6">
                Industry-standard JWT authentication with secure password hashing and token management.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/signup"
                  className="flex-1 bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition text-center"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="flex-1 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition text-center"
                >
                  Log In
                </Link>
              </div>
            </div>

            {/* Task Management Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">✅ Smart Task Management</h3>
              <p className="text-gray-600 mb-6">
                Create, organize, and track your tasks with intuitive interfaces and smart features.
              </p>
              <Link
                href="/tasks"
                className="block w-full bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition text-center"
              >
                Manage Tasks
              </Link>
            </div>

            {/* Real-time Sync Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">🔄 Real-time Sync</h3>
              <p className="text-gray-600 mb-6">
                Your tasks are synced across all devices in real-time with our reliable cloud infrastructure.
              </p>
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-16 bg-gradient-to-r from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Modern Tech Stack
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Built with cutting-edge technologies
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Frontend
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Next.js 16</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">React 19</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">TypeScript</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Tailwind CSS</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                Backend
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">FastAPI</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Python 3.11</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">SQLModel</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Uvicorn</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                Infrastructure
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Docker</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">PostgreSQL</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">JWT Auth</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">CORS Enabled</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
            Join thousands of users who trust our platform to manage their daily tasks and achieve their goals.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Create Account
            </Link>
            <a
              href={(() => {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
                // Use new URL construction to prevent double slashes
                return new URL('/docs', baseUrl).toString();
              })()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-indigo-300 text-base font-medium rounded-md text-white hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
