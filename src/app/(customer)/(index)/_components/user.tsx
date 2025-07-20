'use client';

import { useState, useRef } from 'react';
import { Logout } from '../lib/action';

export default function UserMenu() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    const handleLogout = async (formData: FormData) => {
        await Logout(null, formData);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div
                onClick={handleToggle}
                className="cursor-pointer w-[48px] h-[48px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden"
            >
                <img
                    src="/assets/photos/default.jpg"
                    className="w-full h-full object-cover rounded-full"
                    alt="User Avatar"
                />
            </div>

            {open && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-2">
                        <a
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Profil Saya
                        </a>

                        {/*  Memanggil handler yang invoke server action */}
                        <form action={handleLogout}>
                            <button
                                type="submit"
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
