import React, { useState } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import {
  Shield, Edit3, Save, Camera, Eye, EyeOff,
  Upload, Download, LogOut
} from "lucide-react";
import Sidebar from "../PatientDashboard/Sidebar";
import axios from 'axios';

const inputBase = "w-full px-4 py-3 rounded-xl border transition-all bg-[#F7F6F2] text-[#12181B] placeholder-[#8A929B] disabled:opacity-70";
const inputEditable = "border-[#E4E1D8] focus:border-[#0E6B64] focus:ring-2 focus:ring-[#0E6B64]/20 focus:outline-none";
const labelClass = "block text-sm font-medium text-[#5B6470] mb-2";

export default function SettingsPage() {
  const { user, token, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: ''
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

  const profileQuery = useQuery({
    queryKey: ['profile', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data),
    enabled: !!user?._id && !!token,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (formData) => axios.put(`${API_BASE_URL}/users/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': avatarFile ? 'multipart/form-data' : 'application/json'
      }
    }),
    onSuccess: () => {
      toast.success('Profile updated');
      profileQuery.refetch();
      setEditing(false);
      setAvatarFile(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to update profile');
    }
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data) => axios.put(`${API_BASE_URL}/users/change-password`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
    onSuccess: () => {
      toast.success('Password changed');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to change password');
    }
  });

  React.useEffect(() => {
    if (profileQuery.data?.data) {
      const userData = profileQuery.data.data;
      setProfileForm({
        fullName: userData.fullname || '',
        email: userData.email || '',
        phone: userData.phone || '',
        dateOfBirth: userData.dateOfBirth || '',
        address: userData.address || '',
        emergencyContact: userData.emergencyContact || ''
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
      // Normalized to toast — every other page in the app (AuthPage,
      // AppointmentCard, etc.) surfaces errors via react-hot-toast; this
      // was the only spot still using a native alert().
      toast.error('Passwords do not match');
      return;
    }
    changePasswordMutation.mutate(passwordForm);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  if (profileQuery.isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#E4E1D8] border-t-[#0E6B64]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex">
      <div className="hidden lg:block lg:w-64 xl:w-72 sticky top-0 h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-medium text-[#12181B]">Settings</h1>
            <p className="text-[#5B6470] mt-1.5 text-sm">Manage your profile and account settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">

              {/* Profile Header */}
              <div className="bg-white border border-[#E4E1D8] rounded-2xl p-7">
                <div className="flex items-center justify-between mb-7">
                  <h2 className="text-xl font-serif font-medium text-[#12181B]">Profile Information</h2>
                  <button
                    onClick={() => editing ? handleProfileSubmit({ preventDefault: () => {} }) : setEditing(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E6B64] hover:bg-[#0B4F4A] text-white text-sm font-semibold transition-colors"
                  >
                    {editing ? <Save size={16} /> : <Edit3 size={16} />}
                    {editing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative shrink-0">
                      <img
                        src={profileQuery.data?.data?.avatar || 'https://i.pravatar.cc/150'}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-[#F7F6F2]"
                      />
                      {editing && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-1 right-1 w-8 h-8 bg-[#0E6B64] rounded-full flex items-center justify-center text-white shadow-sm hover:bg-[#0B4F4A] transition-colors"
                        >
                          <Camera size={14} />
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
                      <label className={labelClass}>Full Name</label>
                      <input
                        type="text"
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                        disabled={!editing}
                        className={`${inputBase} ${editing ? inputEditable : 'border-[#E4E1D8]'}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        disabled
                        className={`${inputBase} border-[#E4E1D8]`}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        disabled={!editing}
                        className={`${inputBase} ${editing ? inputEditable : 'border-[#E4E1D8]'}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Date of Birth</label>
                      <input
                        type="date"
                        value={profileForm.dateOfBirth}
                        onChange={(e) => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })}
                        disabled={!editing}
                        className={`${inputBase} ${editing ? inputEditable : 'border-[#E4E1D8]'}`}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Emergency Contact</label>
                      <input
                        type="text"
                        value={profileForm.emergencyContact}
                        onChange={(e) => setProfileForm({ ...profileForm, emergencyContact: e.target.value })}
                        disabled={!editing}
                        className={`${inputBase} ${editing ? inputEditable : 'border-[#E4E1D8]'}`}
                        placeholder="Name & Phone"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Address</label>
                    <textarea
                      rows={3}
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      disabled={!editing}
                      className={`${inputBase} resize-vertical ${editing ? inputEditable : 'border-[#E4E1D8]'}`}
                      placeholder="Your full address"
                    />
                  </div>

                  {updateProfileMutation.isPending && (
                    <div className="flex items-center gap-2.5 text-[#0E6B64] text-sm">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#E4F1EF] border-t-[#0E6B64]"></div>
                      <span>Saving changes...</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Password Card */}
              <div className="bg-white border border-[#E4E1D8] rounded-2xl p-7">
                <h2 className="text-xl font-serif font-medium text-[#12181B] mb-6">Change Password</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className={labelClass}>Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword.current ? 'text' : 'password'}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className={`${inputBase} ${inputEditable} pr-11`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A929B] hover:text-[#12181B] transition-colors"
                      >
                        {showPassword.current ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>New Password</label>
                      <div className="relative">
                        <input
                          type={showPassword.new ? 'text' : 'password'}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          className={`${inputBase} ${inputEditable} pr-11`}
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('new')}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A929B] hover:text-[#12181B] transition-colors"
                        >
                          {showPassword.new ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showPassword.confirm ? 'text' : 'password'}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          className={`${inputBase} ${inputEditable} pr-11`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('confirm')}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A929B] hover:text-[#12181B] transition-colors"
                        >
                          {showPassword.confirm ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={changePasswordMutation.isPending}
                    className="w-full bg-[#E8623F] hover:bg-[#CE4E30] disabled:opacity-60 py-3.5 rounded-xl font-semibold text-sm text-white transition-colors flex items-center justify-center gap-2"
                  >
                    {changePasswordMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/40 border-t-white"></div>
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
              <div className="bg-gradient-to-r from-[#0E6B64] to-[#0B4F4A] rounded-2xl p-7 text-white">
                <div className="flex items-center gap-3.5 mb-6">
                  <Shield size={32} />
                  <div>
                    <h3 className="text-lg font-serif font-medium">Account Status</h3>
                    <p className="text-[#CFEDE9] text-xs mt-0.5">
                      Member since {profileQuery.data?.data?.createdAt ? new Date(profileQuery.data?.data?.createdAt).toLocaleDateString() : '—'}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between py-2.5 border-b border-white/15">
                    <span className="text-xs text-[#CFEDE9]">Verified Email</span>
                    <span className="text-xs font-semibold">✓</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-white/15">
                    <span className="text-xs text-[#CFEDE9]">Two-Factor</span>
                    <span className="text-xs font-semibold">Disabled</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-xs text-[#CFEDE9]">Storage Used</span>
                    <span className="text-xs font-semibold">2.4 GB / 10 GB</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E4E1D8] rounded-2xl p-6">
                <h3 className="text-base font-serif font-medium text-[#12181B] mb-5">Quick Actions</h3>
                <div className="space-y-2">
                  {/* NOTE: neither export button had a handler in the source
                      file — left unwired rather than fabricating an action. */}
                  <button className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-[#F7F6F2] transition-colors text-left border border-[#E4E1D8]">
                    <Download size={17} className="text-[#5B6470]" />
                    <span className="text-sm text-[#12181B]">Download Medical Data</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-[#F7F6F2] transition-colors text-left border border-[#E4E1D8]">
                    <Upload size={17} className="text-[#5B6470]" />
                    <span className="text-sm text-[#12181B]">Export Records</span>
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-[#FBEAE4] hover:bg-[#F6D9CE] text-[#E8623F] font-medium transition-colors text-left border border-[#E8623F]/20"
                  >
                    <LogOut size={17} />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>

              {/* App info card — was branded "HealthSecure v2.1.0", which
                  doesn't match the product name (MediCare+) used everywhere
                  else in the app. Corrected. */}
              <div className="bg-white border border-[#E4E1D8] rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-[#E4F1EF] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield size={24} className="text-[#0E6B64]" />
                </div>
                <h4 className="font-semibold text-sm text-[#12181B] mb-1">MediCare+ v1.0.0</h4>
                <p className="text-xs text-[#8A929B]">Your data is secure and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}