import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import heroImg from '../assets/hero.png';
import { MicIcon } from '../components/patient/icons';

export const Register = ({ onNavigateLogin }) => {
  const { loginUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Patient'); // Default to Patient
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate register & auto-login
    loginUser({
      name: name || 'New User',
      email,
      role: role.toLowerCase(),
    });
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[950px] h-[650px] flex rounded-[2.5rem] overflow-hidden bg-white shadow-xl">
        
        {/* Left Panel */}
        <div className="w-1/2 relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-t from-[#092a5e] via-[#092a5e]/50 to-transparent z-10 mix-blend-multiply"></div>
          <img 
            src={heroImg} 
            alt="Healthcare professionals" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center">
            <h1 className="text-[28px] font-bold text-white text-center leading-tight">
              Join Our Healthcare<br />Community
            </h1>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 flex flex-col px-10 py-8 overflow-y-auto">
          
          <div className="flex-1 w-full max-w-[360px] mx-auto flex flex-col justify-center">
            
            <div className="text-center mb-6">
              <h2 className="text-[#0f4a9c] text-lg font-bold">Medimate Healthcare</h2>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create an Account</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Role Selection */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Select Your Role
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {/* Patient */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('Patient')}
                    className={`flex flex-col items-center justify-center py-2.5 rounded-lg border transition-colors ${
                      role === 'Patient' ? 'bg-[#eef3ff] border-[#8cb4f5] text-[#0b5ed7]' : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span className="text-[11px] font-bold">Patient</span>
                  </button>
                  
                  {/* Doctor */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('Doctor')}
                    className={`flex flex-col items-center justify-center py-2.5 rounded-lg border transition-colors ${
                      role === 'Doctor' ? 'bg-[#eef3ff] border-[#8cb4f5] text-[#0b5ed7]' : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4"></path>
                    </svg>
                    <span className="text-[11px] font-bold">Doctor</span>
                  </button>
                  
                  {/* Admin */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('Admin')}
                    className={`flex flex-col items-center justify-center py-2.5 rounded-lg border transition-colors ${
                      role === 'Admin' ? 'bg-[#eef3ff] border-[#8cb4f5] text-[#0b5ed7]' : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span className="text-[11px] font-bold">Admin</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-9 text-[13px] focus:outline-none focus:border-blue-500"
                    placeholder="John Doe"
                  />
                  <button
                    type="button"
                    aria-label="Dictate full name"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#0f4a9c] transition"
                  >
                    <MicIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-9 text-[13px] focus:outline-none focus:border-blue-500"
                    placeholder="examples@gmail.com"
                  />
                  <button
                    type="button"
                    aria-label="Dictate email"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#0f4a9c] transition"
                  >
                    <MicIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-16 text-[13px] focus:outline-none focus:border-blue-500 tracking-wider placeholder:tracking-wider placeholder:text-gray-300 text-gray-600"
                    placeholder="••••••••••••••••"
                  />
                  <button
                    type="button"
                    aria-label="Dictate password"
                    className="absolute inset-y-0 right-8 flex items-center text-gray-400 hover:text-[#0f4a9c] transition"
                  >
                    <MicIcon className="w-4 h-4" />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#055dc8] hover:bg-blue-800 text-white font-medium py-2.5 rounded-md flex justify-center items-center mt-6 transition-colors"
              >
                Register
              </button>
            </form>

            <div className="my-6 border-t border-gray-200"></div>

            <div className="flex justify-center space-x-4 mb-6">
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-[42px] h-[42px] flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 21 21">
                  <path fill="#f25022" d="M0 0h10v10H0z"></path>
                  <path fill="#7fba00" d="M11 0h10v10H11z"></path>
                  <path fill="#00a4ef" d="M0 11h10v10H0z"></path>
                  <path fill="#ffb900" d="M11 11h10v10H11z"></path>
                </svg>
              </button>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-[42px] h-[42px] flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.52-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
              </button>
            </div>

            <p className="text-center text-[12px] text-gray-500">
              Already have an account?{' '}
              <button onClick={(e) => { e.preventDefault(); onNavigateLogin && onNavigateLogin(); }} className="text-[#0f4a9c] font-semibold hover:underline">
                Login here
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};
