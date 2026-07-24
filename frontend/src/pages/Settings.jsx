import React from 'react';
import profileImg from '../assets/profile.png';

export const Settings = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex justify-center p-4 md:p-6 lg:p-10 font-sans">
      <div className="w-full max-w-5xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-500 text-[15px] mt-1">Manage your professional profile and security preferences.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0 space-y-1.5">
            
            <button className="w-full flex items-center px-4 py-3 bg-[#2563eb] text-white rounded-lg font-medium transition-colors shadow-sm">
              <svg className="w-[18px] h-[18px] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Info
            </button>

            <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
              <svg className="w-[18px] h-[18px] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Security
            </button>

            <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
              <svg className="w-[18px] h-[18px] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Notifications
            </button>

            <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
              <svg className="w-[18px] h-[18px] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payment Methods
            </button>
            
          </div>

          {/* Content Area */}
          <div className="flex-1 space-y-6 w-full">
            
            {/* Personal Information Card */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="flex flex-col md:flex-row gap-8">
                
                {/* Profile Photo Section */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="relative">
                    <div className="w-[120px] h-[120px] bg-gradient-to-tr from-[#d4e1f9] to-[#f4f7fb] rounded-[1rem] flex items-center justify-center border-2 border-blue-100">
                      <img 
                        src={profileImg} 
                        alt="Profile" 
                        className="w-[104px] h-[104px] rounded-full object-cover"
                      />
                    </div>
                    <button className="absolute -bottom-1 -right-1 bg-[#0f4a9c] text-white p-2 rounded-xl shadow-lg hover:bg-blue-800 transition-colors border-[3px] border-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                  <button className="mt-4 text-[13px] font-bold text-[#0f4a9c] hover:underline flex items-center">
                    <svg className="w-[14px] h-[14px] mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    Upload new photo
                  </button>
                </div>

                {/* Form Section */}
                <div className="flex-1 space-y-5">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="relative pt-2">
                      <label className="absolute top-0 left-3 bg-white px-1 text-[11px] font-medium text-[#0f4a9c] z-10">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue="Imasha Seewandi"
                        className="w-full border border-gray-400 rounded px-3 py-2.5 text-[14px] text-gray-800 focus:outline-none focus:border-[#0f4a9c] focus:ring-1 focus:ring-[#0f4a9c] bg-transparent"
                      />
                      <div className="absolute right-2 bottom-1 text-black">
                        <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="10" width="6" height="8" rx="3" fill="currentColor" stroke="none" />
                          <path d="M7 15.5a5 5 0 0 0 10 0" />
                          <line x1="12" y1="20.5" x2="12" y2="24" />
                          <path d="M10 7a2 2 0 0 1 4 0" />
                          <path d="M7 4a5 5 0 0 1 10 0" />
                          <path d="M4 1a8 8 0 0 1 16 0" />
                        </svg>
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="relative pt-2">
                      <label className="absolute top-0 left-3 bg-white px-1 text-[11px] font-medium text-[#0f4a9c] z-10">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue=""
                        className="w-full border border-gray-400 rounded px-3 py-2.5 text-[14px] text-gray-800 focus:outline-none focus:border-[#0f4a9c] focus:ring-1 focus:ring-[#0f4a9c] bg-transparent"
                      />
                      <div className="absolute right-2 bottom-1 text-black">
                        <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="10" width="6" height="8" rx="3" fill="currentColor" stroke="none" />
                          <path d="M7 15.5a5 5 0 0 0 10 0" />
                          <line x1="12" y1="20.5" x2="12" y2="24" />
                          <path d="M10 7a2 2 0 0 1 4 0" />
                          <path d="M7 4a5 5 0 0 1 10 0" />
                          <path d="M4 1a8 8 0 0 1 16 0" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative pt-2">
                      <label className="absolute top-0 left-3 bg-white px-1 text-[11px] font-medium text-[#0f4a9c] z-10">Phone Number</label>
                      <input 
                        type="text" 
                        defaultValue="+9786549302"
                        className="w-full border border-gray-400 rounded px-3 py-2.5 text-[14px] text-gray-800 focus:outline-none focus:border-[#0f4a9c] focus:ring-1 focus:ring-[#0f4a9c] bg-transparent"
                      />
                      <div className="absolute right-2 bottom-1 text-black">
                        <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="10" width="6" height="8" rx="3" fill="currentColor" stroke="none" />
                          <path d="M7 15.5a5 5 0 0 0 10 0" />
                          <line x1="12" y1="20.5" x2="12" y2="24" />
                          <path d="M10 7a2 2 0 0 1 4 0" />
                          <path d="M7 4a5 5 0 0 1 10 0" />
                          <path d="M4 1a8 8 0 0 1 16 0" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Professional Bio */}
                  <div className="relative pt-2">
                    <label className="absolute top-0 left-3 bg-white px-1 text-[11px] font-medium text-gray-500 z-10">Professional Bio</label>
                    <textarea 
                      rows="4"
                      defaultValue="Chief of Cardiology with 15+ years experience in interventional cardiology and hospital administration."
                      className="w-full border border-gray-400 rounded px-3 py-3 text-[14px] text-gray-800 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 bg-transparent resize-none leading-relaxed"
                    ></textarea>
                    <div className="absolute right-2 bottom-2 text-black">
                      <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="10" width="6" height="8" rx="3" fill="currentColor" stroke="none" />
                        <path d="M7 15.5a5 5 0 0 0 10 0" />
                        <line x1="12" y1="20.5" x2="12" y2="24" />
                        <path d="M10 7a2 2 0 0 1 4 0" />
                        <path d="M7 4a5 5 0 0 1 10 0" />
                        <path d="M4 1a8 8 0 0 1 16 0" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-end items-center gap-6 pt-4">
                    <button className="text-[14px] font-bold text-[#003b73] hover:underline">Cancel</button>
                    <button className="bg-[#003b73] hover:bg-[#002855] text-white font-semibold py-2 px-6 rounded transition-colors text-[14px]">
                      Save Changes
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-[#fffafa] border border-red-200 rounded-lg p-6 md:p-8 relative overflow-hidden">
              <h3 className="text-[16px] font-bold text-[#c92a2a] flex items-center mb-1">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Danger Zone
              </h3>
              <p className="text-gray-600 text-[14px] mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              
              <button className="flex items-center text-[#c92a2a] font-bold text-[13px] hover:underline">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                </svg>
                Delete Account
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
