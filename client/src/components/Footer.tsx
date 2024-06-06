import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"; 
import { Copyright, Github, Linkedin } from "lucide-react";
function Footer() {
    const name = import.meta.env.VITE_COLLEGE_NAME;
    const twitterLink = import.meta.env.VITE_TWITTER;
    const githubLink = import.meta.env.VITE_GITHUB;
    const linkedInLink = import.meta.env.VITE_LINKEDIN;
    const logoLink = import.meta.env.VITE_LOGO;

    return (
        <footer className="w-full bg-zinc-700 dark:bg-zinc-800 text-zinc-200 p-4 border-t-2 border-gray-600">
            <ul className="flex sm:flex-row flex-col sm:items-center sm:justify-evenly items-start sm:gap-0 gap-4 justify-start py-4 sm:px-0 px-4">
                <li className="sm:hidden">
                    <Link
                        to="/"
                        className="flex items-center justify-center flex-col gap-2 text-xl"
                    >
                        <img src={logoLink ? logoLink : logo} alt="Logo" className="w-10" />
                        {name ? name : "Campus Space"}
                    </Link>
                </li>
                <li>
                    <Link to="/" className="hover:underline no-underline">
                        Vacant Rooms
                    </Link>
                </li>
                <li>
                    <Link to="/timetable" className="hover:underline no-underline">
                        Timetable
                    </Link>
                </li>
                <li className="hidden sm:inline">
                    <Link
                        to="/"
                        className="flex items-center justify-center flex-col gap-1 text-2xl"
                    >
                        <img src={logoLink ? logoLink : logo} alt="Logo" className="w-10" />
                        {name ? name : "Campus Space"}
                    </Link>
                </li>
                <li>
                    <Link to="/teachersabsent" className="hover:underline no-underline">
                        Teachers Absent
                    </Link>
                </li>
                <li>
                    <Link to="/login" className="hover:underline no-underline">
                        Login
                    </Link>
                </li>
            </ul>
            <ul className="flex sm:flex-row flex-col sm:gap-0 gap-4 sm:items-center items-start sm:justify-evenly p-4 border-t-2 border-b-2 border-gray-600">
                <li>
                    <a
                        href={githubLink ? githubLink : "https://github.com/sethshivam11"}
                        className="flex flex-row items-center justify-center gap-2"
                    >
                        <Github />
                        Github
                    </a>
                </li>
                <li>
                    <a
                        href={
                            linkedInLink ? linkedInLink : "https://linkedin.com/in/sethshivam11"
                        }
                        className="flex flex-row items-center justify-center gap-2"
                    >
                        <Linkedin />
                        LinkedIn
                    </a>
                </li>
                <li>
                    <a
                        href={twitterLink ? twitterLink : "https://x.com/sethshivam11"}
                        className="flex flex-row items-center justify-center gap-2"
                    >
                        <img src="/twitter.svg" alt="Twitter" className="w-8 h-8" />
                        Twitter
                    </a>
                </li>
            </ul>
            <p className="flex flex-wrap gap-2">
                <span className="flex flex-row items-center justify-start gap-2 pt-2">
                    <Copyright /> All Rights Reserved.
                </span>
                <span className="flex flex-row items-center justify-start gap-2 sm:pt-2 pl-8 sm:pl-0">
                    Developer: <a href="https://shivam.cyclic.app">Shivam Soni</a>
                </span>
            </p>
        </footer>
    );
}

export default Footer;
