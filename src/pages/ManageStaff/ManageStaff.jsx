import {InviteTable} from '../../components/ManageStaff/InviteTable'
import MyComponent from '../../components/ManageStaff/AccountList'
import ManagerNavBar from '../../components/ManageStaff/ManagerNavBar'
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';

function ManageStaff() {
  const location = useLocation();
  useEffect(() => {
    // Fetch user data from the database
    const fetchProfile = async () => {
        try {
            const token = sessionStorage.getItem('access_token_manager'); 
            if (!token) {
                throw new Error('No token found');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            if (error.message === 'No token found') {
                window.location.href = '/login-both';
            }
          }
      };

      fetchProfile();
  }, []);
  return (
    <div className='flex-col justify-between'>
      <ManagerNavBar/>

    <div className='h-1/3'>
  
      <InviteTable/>
      </div>
    <div className=''>
      <MyComponent/>
      
      </div>  
    
    </div>

      )
    }

export default ManageStaff