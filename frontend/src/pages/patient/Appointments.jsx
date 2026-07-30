import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Ban, Search as SearchLucide, Calendar } from 'lucide-react';
import { MicIcon, UserIcon, ArrowRightIcon, CheckCircleIcon, XIcon } from '../../components/patient/icons';
import { useAuth } from '../../hooks/useAuth';
import { fetchAppointments, createAppointment, deleteAppointment } from '../../services/appointmentService';

const WEEKDAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

// Slots that are already booked / unavailable for the demo doctor.
const UNAVAILABLE_TIMES = ['09:30 AM', '10:30 AM', '02:00 PM', '02:30 PM'];
const TIME_SLOTS = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '01:30 PM', '02:00 PM', '02:30 PM'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Builds a Monday-first calendar grid for the given month, including the
 * trailing days of the previous month and leading days of the next month
 * needed to fill full weeks.
 */
function buildCalendarGrid(year, month) {
  const firstOfMonth = new Date(year, month, 1);
  // getDay(): 0 = Sunday ... 6 = Saturday. Convert to Monday-first index (0 = Monday).
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, inMonth: false });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - (firstWeekday + daysInMonth) + 1, inMonth: false });
  }

  return cells;
}

export const Appointments = ({ darkMode = false }) => {
  const { user } = useAuth();
  const [patientName, setPatientName] = useState(user?.name || '');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [department, setDepartment] = useState('Cardiology');

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [myAppointments, setMyAppointments] = useState([]);
  const bannerRef = useRef(null);

  useEffect(() => {
    if (user?.name && !patientName) {
      setPatientName(user.name);
    }
  }, [user]);

  const loadUserAppointments = async () => {
    if (!user?.token) return;
    try {
      const data = await fetchAppointments(user.token);
      if (data.success && Array.isArray(data.appointments)) {
        setMyAppointments(data.appointments);
      }
    } catch (err) {
      console.error('Failed to load appointments:', err.message);
    }
  };

  useEffect(() => {
    loadUserAppointments();
  }, [user]);

  useEffect(() => {
    if (confirmed && bannerRef.current) {
      bannerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [confirmed]);

  const grid = useMemo(() => buildCalendarGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const selectedDate = new Date(viewYear, viewMonth, selectedDay);
  const selectedWeekday = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
  const availableCount = TIME_SLOTS.length - UNAVAILABLE_TIMES.length;

  const goToPrevMonth = () => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
    setSelectedDay(1);
  };

  const goToNextMonth = () => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
    setSelectedDay(1);
  };

  const handleConfirm = async () => {
    if (!patientName.trim() || !selectedTime) {
      setError('Please provide patient name and select a time slot.');
      return;
    }

    const formattedDate = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    const payload = {
      patientName: patientName.trim(),
      doctor: doctorSearch.trim() || 'Dr. Sarah Connor',
      department,
      date: formattedDate,
      time: selectedTime,
      reason: 'General Consultation',
    };

    try {
      setLoading(true);
      setError('');
      if (user?.token) {
        const res = await createAppointment(payload, user.token);
        if (res.success) {
          setConfirmed(true);
          await loadUserAppointments();
        }
      } else {
        setConfirmed(true);
      }
    } catch (err) {
      setError(err.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!user?.token) return;
    try {
      await deleteAppointment(id, user.token);
      await loadUserAppointments();
    } catch (err) {
      setError(err.message || 'Failed to cancel appointment');
    }
  };

  const cardBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const inputBg = darkMode
    ? 'bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-blue-500'
    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-blue-500';
  const labelColor = darkMode ? 'text-slate-300' : 'text-gray-800';
  const headingColor = darkMode ? 'text-white' : 'text-gray-900';

  const StepBadge = ({ n }) => (
    <span className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
      {n}
    </span>
  );

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Title */}
      <div>
        <h1 className={`text-3xl font-extrabold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          Schedule Appointment
        </h1>
        <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          Complete the steps below to book a consultation.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm font-medium">
          {error}
        </div>
      )}

      {confirmed && (
        <div
          ref={bannerRef}
          className={`flex items-center justify-between gap-4 rounded-2xl border px-6 py-5 ${
            darkMode ? 'bg-emerald-950 border-emerald-800' : 'bg-emerald-50 border-emerald-300'
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
              <CheckCircleIcon className="w-6 h-6" />
            </span>
            <div>
              <p className={`text-xl font-extrabold ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                Appointment Booking done Successfully
              </p>
              <p className={`text-sm mt-0.5 ${darkMode ? 'text-emerald-300/80' : 'text-emerald-700/80'}`}>
                {selectedWeekday}, {MONTH_NAMES[viewMonth]} {selectedDay} at {selectedTime}
              </p>
            </div>
          </div>
          <button
            onClick={() => setConfirmed(false)}
            aria-label="Dismiss"
            className={`flex-shrink-0 p-1 rounded-full transition ${
              darkMode ? 'text-emerald-400 hover:bg-emerald-900' : 'text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Step 1: Select Provider */}
      <div className={`border rounded-2xl p-6 shadow-sm transition-colors ${cardBg}`}>
        <div className="flex items-center gap-3 mb-6">
          <StepBadge n={1} />
          <h2 className={`text-lg font-bold ${headingColor}`}>Select Provider</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${labelColor}`}>Patient Name</label>
            <div className="relative">
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Name"
                className={`w-full border rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition ${inputBg}`}
              />
              <button
                type="button"
                aria-label="Dictate patient name"
                className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${
                  darkMode ? 'text-slate-500 hover:text-blue-300' : 'text-slate-400 hover:text-blue-600'
                }`}
              >
                <MicIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${labelColor}`}>Doctor (Optional)</label>
            <div className="relative">
              <span
                className={`absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-blue-950 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                placeholder="Search by Doctor Name"
                className={`w-full border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition ${inputBg}`}
              />
              <SearchLucide
                className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${labelColor}`}>Department (Optional)</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition appearance-none ${inputBg}`}
            >
              <option>Cardiology</option>
              <option>Orthopedics</option>
              <option>Dermatology</option>
              <option>Neurology</option>
              <option>Dental</option>
              <option>Pediatrics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 2: Choose Date */}
      <div className={`border rounded-2xl p-6 shadow-sm transition-colors ${cardBg}`}>
        <div className="flex items-center gap-3 mb-6">
          <StepBadge n={2} />
          <h2 className={`text-lg font-bold ${headingColor}`}>Choose Date</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 items-start">
          {/* Calendar */}
          <div className={`border rounded-2xl p-5 ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={goToPrevMonth}
                aria-label="Previous month"
                className={`p-1.5 rounded-lg transition ${darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-500 hover:bg-gray-200'}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className={`font-bold ${headingColor}`}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={goToNextMonth}
                aria-label="Next month"
                className={`p-1.5 rounded-lg transition ${darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-500 hover:bg-gray-200'}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {WEEKDAYS.map((wd) => (
                <div key={wd} className={`text-[11px] font-bold py-2 ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                  {wd}
                </div>
              ))}
              {grid.map((cell, idx) => {
                const isSelected = cell.inMonth && cell.day === selectedDay;
                return (
                  <button
                    type="button"
                    key={idx}
                    disabled={!cell.inMonth}
                    onClick={() => cell.inMonth && setSelectedDay(cell.day)}
                    className={`h-10 rounded-lg text-sm font-semibold transition ${
                      isSelected
                        ? 'bg-blue-700 text-white'
                        : !cell.inMonth
                        ? darkMode
                          ? 'text-slate-700 cursor-default'
                          : 'text-gray-300 cursor-default'
                        : darkMode
                        ? 'text-slate-200 hover:bg-slate-800'
                        : 'text-gray-800 hover:bg-blue-50'
                    }`}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Date panel */}
          <div
            className={`rounded-2xl p-6 text-center h-fit ${
              darkMode ? 'bg-blue-950 border border-blue-900' : 'bg-blue-50 border border-blue-100'
            }`}
          >
            <p className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              Selected Date
            </p>
            <p className={`text-5xl font-extrabold my-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {String(selectedDay).padStart(2, '0')}
            </p>
            <p className={`font-bold ${headingColor}`}>
              {selectedWeekday}, {MONTH_NAMES[viewMonth]}
            </p>
            <p className={`text-sm mt-3 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              {availableCount} time slots currently available for this day.
            </p>
          </div>
        </div>
      </div>

      {/* Step 3: Select Time Slot */}
      <div className={`border rounded-2xl p-6 shadow-sm transition-colors ${cardBg}`}>
        <div className="flex items-center gap-3 mb-6">
          <StepBadge n={3} />
          <h2 className={`text-lg font-bold ${headingColor}`}>Select Time Slot</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TIME_SLOTS.map((time) => {
            const isUnavailable = UNAVAILABLE_TIMES.includes(time);
            const isSelected = !isUnavailable && time === selectedTime;
            return (
              <button
                type="button"
                key={time}
                disabled={isUnavailable}
                onClick={() => setSelectedTime(time)}
                className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition ${
                  isSelected
                    ? 'bg-blue-700 border-blue-700 text-white'
                    : isUnavailable
                    ? darkMode
                      ? 'bg-slate-950 border-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                    : darkMode
                    ? 'bg-slate-950 border-slate-700 text-blue-300 hover:border-blue-600'
                    : 'bg-white border-gray-300 text-blue-700 hover:border-blue-400'
                }`}
              >
                {isSelected ? (
                  <CheckCircleIcon className="w-4 h-4" />
                ) : isUnavailable ? (
                  <Ban className="w-4 h-4" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
                {time}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end items-center gap-6 pb-4">
        <button
          type="button"
          onClick={() => setConfirmed(false)}
          className={`text-sm font-bold hover:underline ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={handleConfirm}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold rounded-xl px-6 py-3 transition"
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* My Booked Appointments Section */}
      {myAppointments.length > 0 && (
        <div className={`border rounded-2xl p-6 shadow-sm transition-colors ${cardBg} mt-8`}>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className={`text-lg font-bold ${headingColor}`}>Your Scheduled Appointments</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-slate-800">
            {myAppointments.map((appt) => (
              <div key={appt._id} className="py-3 flex items-center justify-between">
                <div>
                  <p className={`font-semibold ${headingColor}`}>
                    {typeof appt.doctor === 'object' ? appt.doctor?.name || 'Doctor' : appt.doctor} — {appt.department || 'General'}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    📅 {appt.date} at ⏰ {appt.time} | Status: <span className="font-semibold text-blue-500">{appt.status}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCancel(appt._id)}
                  className="px-3 py-1 text-xs font-bold text-rose-500 hover:bg-rose-500/10 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
