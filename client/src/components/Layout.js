import { Badge } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';

const Layout = ({ children }) => {
  const [closedSide, setClosedSide] = useState(false);

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-2-line',
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'ri-calendar-fill',
    },
    {
      name: 'Apply as a Doctor',
      path: '/be-a-doctor',
      icon: 'ri-calendar-line',
    },
  ];
  const doctorMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-2-line',
    },
    {
      name: 'Appointments',
      path: '/doctor/appointments',
      icon: 'ri-calendar-line',
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: 'ri-user-line',
    },
  ];
  const adminMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-2-line',
    },
    {
      name: 'Users',
      path: '/admin/userslist',
      icon: 'ri-user-fill',
    },
    {
      name: 'Doctors',
      path: '/admin/doctorslist',
      icon: 'ri-user-2-line',
    },
  ];

  const displayedMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  const role = user?.isAdmin ? 'Admin' : user?.isDoctor ? 'Doctor' : 'User';

  return (
    <div className='p-5 '>
      <div className='flex'>
        <div
          className={
            closedSide
              ? 'p-[10px] py-[36px]'
              : 'bg-gray-200 rounded shadow-xl mr-5 min-h-full p-[10px] py-[20px]'
          }
        >
          {closedSide ? (
            <i
              className='ri-menu-line text-l cursor-pointer  p-1 shadow-md'
              onClick={() => setClosedSide(!closedSide)}
            ></i>
          ) : (
            <>
              <div className='flex justify-center pt-4 px-2 gap-2'>
                <i
                  className='ri-menu-line text-l cursor-pointer'
                  onClick={() => setClosedSide(!closedSide)}
                ></i>
                {role && <h2 className='mr-2'>{role} Panel</h2>}
              </div>
              <div className='mt-24 px-3 '>
                {displayedMenu.map((menu) => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <>
                      <Link to={menu.path}>
                        <div
                          className={`flex mt-1 cursor-pointer hover:bg-blue-300 pt-2 pb-2 rounded pl-2 ${
                            isActive && 'bg-blue-300 '
                          }`}
                        >
                          <i className={menu.icon}></i>
                          <div className='px-2'>{menu.name}</div>
                        </div>
                      </Link>
                    </>
                  );
                })}

                <div
                  className={`flex mt-16 cursor-pointer hover:bg-blue-300 pt-2 pb-2 rounded pl-2`}
                  onClick={() => {
                    localStorage.clear();
                    dispatch(setUser(null));
                    navigate('/login');
                  }}
                >
                  <i className='ri-logout-box-r-line'></i>
                  <div className='px-2 '>Logout</div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className='w-9/12 h-full mx-auto'>
          <div className='rounded bg-gray-200 shadow-md mb-5 flex h-20 items-center justify-end'>
            <div className='flex items-center px-4'>
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate('/notifications')}
              >
                <i className='ri-notification-2-line text-xl cursor-pointer'></i>
              </Badge>

              <Link className='anchor mx-2 text-xl' to='/profile'>
                {user?.name}
              </Link>
            </div>
          </div>
          <div className='white rounded shadow-md h-[82vh] overflow-x-scroll	'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
