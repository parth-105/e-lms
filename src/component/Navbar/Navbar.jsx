"use client";

import { HiUserCircle } from 'react-icons/hi';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './nav-style.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const menuItems = [
    'Home',
    'Services',
    'Courses',
    'About',
    'Contact Us',
  ];
  const router = useRouter();
  
  
  const page = (item) => {
    if (item === 'Contact Us') router.push('https://bluesky-gamma.vercel.app');
    else if (item === 'About') router.push('https://bluesky-gamma.vercel.app');
  };

  const clickHandler = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`w-full fixed bg-gray-100 backdrop-blur-sm`}
      style={{ zIndex: '100' }}
    >
      <div className="absolute z-10 right-0 mr-8 mt-6 md:mt-4 lg:hidden hover:cursor-pointer">
        {isSidebarOpen ? (
          <div onClick={clickHandler}>
            <FaTimes size="2rem" />
          </div>
        ) : (
          <div onClick={clickHandler}>
            <FaBars size="2rem" />
          </div>
        )}
      </div>

      {isSidebarOpen && (
        <div className="lg:hidden fixed flex flex-col w-full bg-gray-100 h-max">
          <Link href="/" legacyBehavior>
            <a>
              <div
                className="leading-loose text-3xl p-3 md:px-8 md:py-0"
                style={{ fontFamily: 'Pacifico' }}
              >
                BlueSky
              </div>
            </a>
          </Link>
          <div className="flex flex-col ml-8 p-6 items-center">
            {menuItems.map((item) => (
              <div key={item} className="text-xl font-medium p-3 nav-btn">
                {item === 'Contact Us' || item === 'About' ? (
                  <button onClick={() => page(item)}>{item}</button>
                ) : (
                  <a href={`/#${item}`}>{item}</a>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-4 px-4">
{/*             <Menu as="div" className="relative text-blackOlive">
              <Menu.Button className="flex p-4">
                <HiUserCircle size="3rem" className="text-primary" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-4 w-32 rounded-xl shadow-lg shadow-blackOlive py-2 bg-white">
                  <Menu.Item>
                    {({ active }) => (
                      <div>
                        <Link href="/profile" legacyBehavior>
                          <a
                            className={classNames(
                              active ? 'bg-gray-100' : ' ',
                              'px-5 tracking-widest block py-2 text-sm text-gray-900'
                            )}
                          >
                            Profile
                          </a>
                        </Link>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div>
                        <Link href="/dashboard" legacyBehavior>
                          <a
                            className={classNames(
                              active ? 'bg-gray-100' : ' ',
                              'px-5 tracking-widest block py-2 text-sm text-gray-900'
                            )}
                          >
                            Dashboard
                          </a>
                        </Link>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div>
                        <Link href="/" legacyBehavior>
                          <a
                            onClick={() => {
                              sessionStorage.removeItem('token');
                              router.push('/');
                            }}
                            className={classNames(
                              active ? 'bg-gray-100' : ' ',
                              'px-5 tracking-widest block py-2 text-sm text-gray-900'
                            )}
                          >
                            Logout
                          </a>
                        </Link>
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu> */}

            <Link href="/login" legacyBehavior>
              <div className="rounded-full py-3 px-7 bg-blue-700 text-white shadow-sm hover:shadow-md">
                Login
              </div>
            </Link>
          </div>
        </div>
      )}

      <div className="flex lg:flex-row md:justify-between lg:items-center text-blackOlive">
        <Link href="/" legacyBehavior>
          <a>
            <div
              className="leading-loose text-3xl p-3 md:px-8 md:py-0"
              style={{ fontFamily: 'Pacifico' }}
            >
              BlueSky
            </div>
          </a>
        </Link>
        <div className="hidden lg:flex lg:flex-row md:space-x-10 lg:px-0">
          {menuItems.map((item) => (
            <div key={item} className="text-xl font-medium nav-btn">
              {item === 'Contact Us' || item === 'About' ? (
                <button onClick={() => page(item)}>{item}</button>
              ) : (
                <a href={`/#${item}`}>{item}</a>
              )}
            </div>
          ))}
        </div>
        <div className="hidden lg:flex md:py-3 lg:px-2">
          {/* <Menu as="div" className="relative text-blackOlive">
            <Menu.Button>
              <HiUserCircle size={40} className="text-primary" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-2 mt-2 w-32  rounded-xl shadow-lg shadow-blackOlive py-2 bg-white">
                <Menu.Item>
                  {({ active }) => (
                    <div>
                      <Link href="/profile" legacyBehavior>
                        <a
                          className={classNames(
                            active ? 'bg-gray-100' : ' ',
                            'px-5 tracking-widest block py-2 text-sm text-gray-900'
                          )}
                        >
                          Profile
                        </a>
                      </Link>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div>
                      <Link href="/dashboard" legacyBehavior>
                        <a
                          className={classNames(
                            active ? 'bg-gray-100' : ' ',
                            'px-5 tracking-widest block py-2 text-sm text-gray-900'
                          )}
                        >
                          Dashboard
                        </a>
                      </Link>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div>
                      <Link href="/" legacyBehavior>
                        <a
                          onClick={() => {
                            sessionStorage.removeItem('token');
                            router.push('/');
                          }}
                          className={classNames(
                            active ? 'bg-gray-100' : ' ',
                            'px-5 tracking-widest block py-2 text-sm text-gray-900'
                          )}
                        >
                          Logout
                        </a>
                      </Link>
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu> */}

          <Link href="/login" legacyBehavior>
            <a className="rounded-full py-3 px-6 bg-blue-700 text-white shadow-sm hover:shadow-md">
              Login
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
