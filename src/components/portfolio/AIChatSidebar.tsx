import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FlaskConical } from "lucide-react";
const resumePdf = "/Manish_Yadav_Resume.pdf";
import {
  Home,
  User,
  Code,
  Briefcase,
  Folder,
  Layers,
  Award,
  Phone,
  FileText,
  Github,
  Linkedin,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AIChatSidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false); // ⭐ NEW

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full bg-black
        border-r border-white/10 flex flex-col
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <h2 className="text-xl font-bold text-purple-400">Manish</h2>
          )}

          <div className="flex gap-2">
            {/* Collapse Toggle (Desktop) */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block text-gray-400 hover:text-white"
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>

            {/* Close (Mobile) */}
            <button onClick={onClose} className="md:hidden">
              <X />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-2 text-gray-300 text-sm">
          <Item icon={Home} label="Home" collapsed={collapsed} onClick={() => go("/")} />
          <Item icon={User} label="About" collapsed={collapsed} onClick={() => go("/#about")} />
          <Item icon={Code} label="Skills" collapsed={collapsed} onClick={() => go("/#skills")} />
          <Item icon={Briefcase} label="Experience" collapsed={collapsed} onClick={() => go("/#experience")} />
          <Item icon={Folder} label="Projects" collapsed={collapsed} onClick={() => go("/#projects")} />
            <Item icon={FlaskConical} label="Research" collapsed={collapsed} onClick={() => go("/#research")} />
          <Item icon={Layers} label="Services" collapsed={collapsed} onClick={() => go("/#services")} />
          <Item icon={Award} label="Certifications" collapsed={collapsed} onClick={() => go("/#certifications")} />
          <Item icon={Phone} label="Contact" collapsed={collapsed} onClick={() => go("/#contact")} />
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* Links */}
        <div className="flex flex-col gap-1 px-2 text-gray-300 text-sm">
          <a
            href={resumePdf}
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 hover:text-purple-400"
          >
            <FileText size={18} />
            {!collapsed && "Resume"}
          </a>

          <a
            href="https://github.com/Manishyadav2005"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 hover:text-purple-400"
          >
            <Github size={18} />
            {!collapsed && "GitHub"}
          </a>

          <a
            href="https://www.linkedin.com/in/manish-yadav-644062267/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 hover:text-purple-400"
          >
            <Linkedin size={18} />
            {!collapsed && "LinkedIn"}
          </a>
        </div>

        {/* CTA */}
        {!collapsed && (
          <button
            onClick={() => go("/#contact")}
            className="m-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm"
          >
            Let’s Talk
          </button>
        )}
      </aside>
    </>
  );
};

export default AIChatSidebar;

/* 🔹 Item Component */
const Item = ({
  icon: Icon,
  label,
  collapsed,
  onClick,
}: {
  icon: any;
  label: string;
  collapsed: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 rounded
    hover:bg-white/5 hover:text-purple-400 transition text-left"
  >
    <Icon size={18} />
    {!collapsed && label}
  </button>
);
