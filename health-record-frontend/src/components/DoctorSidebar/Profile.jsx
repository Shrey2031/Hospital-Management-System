import React, { useState } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import {
  User, Mail, Phone, MapPin, Calendar, Shield, 
  Edit3, Save, Camera, Lock, Eye, EyeOff,
  Upload, Download, LogOut, Stethoscope, Award
} from "lucide-react";
import Sidebar from "../DoctorDashboard/Sidebar";
import axios from 'axios';

export default function DoctorSettingsPage() {
  const { user, token, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    experience: '',
    hospital: '',
    bio: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = React.useRef(null);

  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;


  // 🔥 Fetch doctor profile details
  const profileQuery = useQuery({
    queryKey: ['doctorProfile', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data),
    enabled: !!user?._id && !!token,
  });

  // 🔥 Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (formData) => axios.put(`${API_BASE_URL}/users/me`, formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': avatarFile ? 'multipart/form-data' : 'application/json'
      }
    }),
    onSuccess: () => {
      profileQuery.refetch();
      setEditing(false);
      setAvatarFile(null);
    }
  });

  // 🔥 Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: (data) => axios.put(`${API_BASE_URL}/doctors/change-password`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
    onSuccess: () => {
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  });

  // 🔥 Load profile data
  React.useEffect(() => {
    if (profileQuery.data?.data) {
      const userData = profileQuery.data.data;
      setProfileForm({
        fullName: userData.fullname || userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        specialization: userData.specialization || '',
        licenseNumber: userData.licenseNumber || '',
        experience: userData.experience || '',
        hospital: userData.hospital || userData.clinic || '',
        bio: userData.bio || userData.about || ''
      });
    }
  }, [profileQuery.data]);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(profileForm).forEach(key => {
      formData.append(key, profileForm[key]);
    });
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    updateProfileMutation.mutate(formData);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    changePasswordMutation.mutate(passwordForm);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (profileQuery.isLoading) {
    return (
      <div className="min-h-screen bg-[#dfe6f7] flex">
        <Sidebar />
        <div className="flex-1 p-6 lg:ml-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#081028]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#dfe6f7] flex">
      {/* Sidebar */}
      <div className="hidden lg:block lg:w-64 xl:w-72 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:ml-0">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#081028]">Settings</h1>
              <p className="text-gray-600 mt-2">Manage your doctor profile and account settings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Profile Header */}
              <div className="bg-[#08153b] rounded-3xl p-8 text-white shadow-xl border border-white/10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Doctor Profile</h2>
                  <button
                    onClick={() => setEditing(!editing)}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7f5af0] to-[#4f6df5] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    {editing ? <Save size={20} /> : <Edit3 size={20} />}
                    {editing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={profileQuery.data?.data?.avatar || 'https://i.pravatar.cc/150'}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-lg"
                      />
                      {editing && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-2 right-2 w-10 h-10 bg-[#7f5af0] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#4f6df5] transition-all"
                        >
                          <Camera size={18} />
                        </button>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setAvatarFile(e.target.files[0])}
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm({...profileForm, fullName: e.target.value})}
                        disabled={!editing}
                        className={`w-full px-4 py-3 rounded-2xl border-2 transition-all bg-white/5 border-white/20 text-white placeholder-gray-400 ${
                          editing ? 'focus:border-[#7f5af0] focus:ring-4 focus:ring-[#7f5af0]/20' : 'bg-white/5'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        disabled
                        className="w-full px-4 py-3 rounded-2xl border-2 border-white/20 bg-white/5 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                        disabled={!editing}
                        className={`w-full px-4 py-3 rounded-2xl border-2 transition-all bg-white/5 border-white/20 text-white placeholder-gray-400 ${
                          editing ? 'focus:border-[#7f5af0]' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Doctor Specific Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Specialization</label>
                      <div className="relative">
                        <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={profileForm.specialization}
                          onChange={(e) => setProfileForm({...profileForm, specialization: e.target.value})}
                          disabled={!editing}
                          className={`w-full pl-12 px-4 py-3 rounded-2xl border-2 transition-all bg-white/5 border-white/20 text-white placeholder-gray-400 ${
                            editing ? 'focus:border-[#7f5af0]' : ''
                          }`}
                          placeholder="e.g., Cardiology"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">License Number</label>
                      <div className="relative">
                        <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={profileForm.licenseNumber}
                          onChange={(e) => setProfileForm({...profileForm, licenseNumber: e.target.value})}
                          disabled={!editing}
                          className={`w-full pl-12 px-4 py-3 rounded-2xl border-2 transition-all bg-white/5 border-white/20 text-white placeholder-gray-400 ${
                            editing ? 'focus:border-[#7f5af0]' : ''
                          }`}
                          placeholder="e.g., MD-12345"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
                      <input
                        type="number"
                        value={profileForm.experience}
                        onChange={(e) => setProfileForm({...profileForm, experience: e.target.value})}
                        disabled={!editing}
                        className={`w-full px-4 py-3 rounded-2xl border-2 transition-all bg-white/5 border-white/20 text-white placeholder-gray-400 ${
                          editing ? 'focus:border-[#7f5af0]' : ''
                        }`}
                        placeholder="e.g., 10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Hospital / Clinic</label>
                      <input
                        type="text"
                        value={profileForm.hospital}
                        onChange={(e) => setProfileForm({...profileForm, hospital: e.target.value})}
                        disabled={!editing}
                        className={`w-full px-4 py-3 rounded-2xl border-2 transition-all bg-white/5 border-white/20 text-white placeholder-gray-400 ${
                          editing ? 'focus:border-[#7f5af0]' : ''
                        }`}
                        placeholder="Hospital name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea
                      rows={3}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                      disabled={!editing}
                      className={`w-full px-4 py-3 rounded-2xl border-2 transition-all resize-vertical bg-white/5 border-white/20 text-white placeholder-gray-400 ${
                        editing ? 'focus:border-[#7f5af0] focus:ring-4 focus:ring-[#7f5af0]/20' : ''
                      }`}
                      placeholder="Tell patients about yourself..."
                    />
                  </div>

                  {updateProfileMutation.isLoading && (
                    <div className="flex items-center gap-3 text-[#7f5af0]">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#7f5af0]"></div>
                      <span>Saving changes...</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Password Card */}
              <div className="bg-[#08153b] rounded-3xl p-8 text-white shadow-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword.current ? 'text' : 'password'}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                        className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-white/20 bg-white/5 text-white placeholder-gray-400 focus:border-[#7f5af0] focus:ring-4 focus:ring-[#7f5af0]/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                        {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showPassword.new ? 'text' : 'password'}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                          className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-white/20 bg-white/5 text-white placeholder-gray-400 focus:border-[#7f5af0] focus:ring-4 focus:ring-[#7f5af0]/20"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('new')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                        >
                          {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showPassword.confirm ? 'text' : 'password'}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                          className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-white/20 bg-white/5 text-white placeholder-gray-400 focus:border-[#7f5af0] focus:ring-4 focus:ring-[#7f5af0]/20"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('confirm')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                        >
                          {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                                 <button
                    type="submit"
                    disabled={changePasswordMutation.isLoading}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:opacity-50 py-4 rounded-2xl font-semibold text-white shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    {changePasswordMutation.isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Changing...
                      </>
                    ) : (
                      'Change Password'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Account Actions */}
              <div className="bg-gradient-to-r from-[#7f5af0] to-[#4f6df5] rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <Shield className="w-12 h-12" />
                  <div>
                    <h3 className="text-2xl font-bold">Account Status</h3>
                    <p className="opacity-90">Member since {profileQuery.data?.data?.createdAt ? new Date(profileQuery.data?.data?.createdAt).toLocaleDateString() : '2024'}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-white/20">
                    <span className="text-sm opacity-90">Verified Email</span>
                    <span className="text-sm font-semibold">✓</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/20">
                    <span className="text-sm opacity-90">License Verified</span>
                    <span className="text-sm font-semibold">
                      {profileQuery.data?.data?.isVerified ? '✓' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm opacity-90">Patients Treated</span>
                    <span className="text-sm font-semibold">
                      {profileQuery.data?.data?.patientsCount || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#08153b] rounded-3xl p-6 text-white shadow-xl border border-white/10">
                <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition-all text-left bg-white/5">
                    <Download className="w-5 h-5" />
                    <span>Export Patient Data</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition-all text-left bg-white/5">
                    <Upload className="w-5 h-5" />
                    <span>Upload Certifications</span>
                  </button>
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium transition-all text-left border border-red-500/30"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* App Version */}
              <div className="bg-[#08153b] rounded-3xl p-6 text-center border border-white/10">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Shield className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-semibold mb-1">HealthSecure Doctor v2.1.0</h4>
                <p className="text-sm text-gray-400">Your data is secure and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}