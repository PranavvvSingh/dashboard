import React from "react";
import { NavLink } from "react-router-dom";
import {links} from '../data/constants'

function CustomLink({ to, link }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          isActive ? "bg-gradient-to-r from-purple-600 to-blue-600 " : "",
          "rounded-xl p-1 w-full text-center",
        ].join(" ")
      }
    >
      {link}
    </NavLink>
  );
}

const Dashboard = () => {
  return (
    <div className="w-[350px] h-screen bg-neutral-900 text-neutral-200 ">
      <div className="flex flex-col justify-between h-screen p-3">
        <div className="text-3xl mx-auto font-bold bg-gradient-to-r from-purple-600  to-blue-600 inline-block text-transparent bg-clip-text">
          Dashboard
        </div>
        <div className="flex flex-col justify-between items-center gap-y-3">
          {links.map((link) => {
            return <CustomLink key={link.to} to={link.to} link={link.link} />;
          })}
        </div>
        <div className="w-full text-center text-sm text-neutral-600">
          <hr className="mb-2 border border-neutral-600" />
          Made by: Pranav Singh
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
