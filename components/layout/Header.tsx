import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import Image from 'next/image';
import { QuestionIcon } from '../Icons/QuestionIcon';
import { BellIcon } from '../Icons/BellIcon';
import { TappedIcon } from '../Icons/TappedIcon';
import { TappedFirst } from '../Icons/TappedFirst';
import { StrokeIcon } from '../Icons/StrokeIcon';
import { KIcon } from '../Icons/KIcon';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header(props: any) {
  const [menuRoutes, setNavigation] = useState([
    { name: 'Overview', href: '/', current: false },
    { name: 'Tasks', href: '/about', current: false },
    { name: 'Projects', current: false },
    { name: 'Payments', current: false },
    { name: 'Users', current: false },
  ]);

  useEffect(() => {
    // console.log(1)
  }, [menuRoutes])

  const updateNavigate = (href: String) => {

    let newMenus: any = menuRoutes.map((m) => {
      if (m.href === href) m.current = true;
      else m.current = false;
      return m;
    });
    setNavigation(newMenus);
  }

  return (
    <>

      <Disclosure as="nav" className="">
        {({ open }) => (
          <>
            <div className="px-4 sm:px-6 lg:px-8 border-b border-gray-100">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="brand-wrapper">
                    <Image
                      width={24}
                      height={24}

                      src={`/assets/images/logo.png`}
                      alt="Your Company"
                    />
                  </div>

                  <div className="me-1">
                    <TappedFirst />

                  </div>

                  <div className="">
                    <div className="">
                      Teqqed <Image
                        alt="Your Company" className='inline' src={`/assets/images/chevron-selector-vertical.svg`}
                        width={12}
                        height={12}
                      />
                    </div>
                  </div>


                </div>





                <div className="hidden md:block">

                  <div className="ml-4 flex items-center md:ml-6">
                    <div className='me-8'>
                      <div className="relative rounded-md ">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Image width={20}
                            height={20} alt="Your Company" src={`/assets/images/search-sm.svg`} />
                        </div>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          className="header-search-input block w-full rounded-md border-0 py-1.5 pl-9 pr-12 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Search..."
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <button className='line-h-none copy-k-cut flex me-2'>
                            <StrokeIcon />
                            <KIcon />
                          </button>
                        </div>
                      </div>
                    </div>


                    <button
                      type="button"
                      className="me-3"
                    >
                      {/* <Image 
                        width={24}
                        height={24}
                        alt="Your Company"  
                        className='nav-menu-icon' 
                        src={`/assets/images/Question-Mark-Circled.svg`} 

                      /> */}
                      <QuestionIcon />
                    </button>
                    <button
                      type="button"
                      className=""
                    >
                      {/* <Image 
                      width={24}
                      height={24}
                      alt="Your Company" className='nav-menu-icon' src={`/assets/images/Bell.svg`} /> */}
                      <BellIcon />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <TappedIcon />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <header className='border-b border-gray-100 '>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {menuRoutes.map((item) => (
                    <Link
                      key={item.name + '-main'}
                      href={item.href ? item.href : '/'}
                      onClick={() => updateNavigate(item.href ? item.href : '')}
                      className={classNames(
                        item.current
                          ? 'border-b border-black'
                          : 'text-gray-400  hover:text-black hover:border-b border-black',
                        ' px-3 py-2 text-sm '
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </header>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {menuRoutes.map((item) => (
                  <Disclosure.Button
                    key={item.name + '-child'}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Image width={10}
                      height={10} className="h-10 w-10 rounded-full" src={user.imageUrl} alt="Your Company" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{user.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <Image width={10}
                      height={10} alt="Your Company" className='nav-menu-icon' src={`/assets/images/Bell.svg`} />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>


    </>
  )
}
