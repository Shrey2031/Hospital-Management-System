// src/hooks/useActiveTab.js
import { useLocation } from 'react-router-dom';

export const useActiveTab = () => {
  const location = useLocation();
  
  const getActiveTab = () => {
    const path = location.pathname;
    
    if (path.includes('/records') || path === '/records') return 'records';
    if (path.includes('/dashboard') || path === '/patient-dashboard') return 'dashboard';
    if (path.includes('/appointments')) return 'appointments';
    if (path.includes('/messages')) return 'messages';
    if (path.includes('/doctors')) return 'doctors';
    if (path.includes('/prescriptions')) return 'prescriptions';
    
    return 'dashboard'; // default
  };
  
  return { activeTab: getActiveTab() };
};