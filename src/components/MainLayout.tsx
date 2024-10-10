"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LOGO from "/logos/logo_mitic_light.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart3,
  Menu,
  LucideProps,
  TornadoIcon,
  CornerUpRightIcon,
  LayoutDashboard,
  Users2,
  
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Label } from "./ui/label";
import {
  selectAuth,
  setCredentials,
  useLogoutMutation,
} from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { Role } from "@/types";
import { selectUi, setIsSidebarExpanded } from "@/redux/features/uiSlice";

type SidebarItemByRole = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  href: string;
  children?: SidebarItemByRole[];
};

const sidebarItemsByRole: Record<Role, SidebarItemByRole[]> = {
  administrateur: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
    { icon: Users2, label: "Utilisateurs", href: "/dashboard/users" },
    { icon: Users2, label: "Parents", href: "/dashboard/parentgrid" },
    { icon: Users2, label: "Classes", href: "/dashboard/classes"},
    { icon: Users2, label: "Programmes de classe", href: "/dashboard/schedule"},
  ],
  etudiant: [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard/etudiant" },
  ],
  parent: [{ icon: BarChart3, label: "Dashboard", href: "/dashboard/parent" }],
  enseignant: [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard/enseignant" },
  ],
  gardien: [],
};

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(selectAuth);
  const { isSidebarExpanded } = useAppSelector(selectUi);
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

  const sidebarItems = sidebarItemsByRole[(user?.role as Role) || "etudiant"];

  const handleLogout = async () => {
    try {
      const result = await logout().unwrap();
      dispatch(
        setCredentials({ user: null, isAuthenticated: true, accessToken: "" })
      );
      navigate("/", { replace: true });
      toast.success(result.message, {
        position: "top-center",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      toast.error("Échec de la deconnexion", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  if (logoutLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r transition-all duration-300 ${
          isSidebarExpanded ? "w-64 p-3" : "w-20 p-2"
        }`}
      >
        <div
          className={`flex items-center justify-between h-14  ${
            isSidebarExpanded ? "px-4" : "justify-center p-2"
          }`}
        >
          {isSidebarExpanded && (
            <img
              src={LOGO}
              alt="Logo"
              className="h-7 w-auto flex items-center justify-center"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(setIsSidebarExpanded(!isSidebarExpanded))}
            aria-label={
              isSidebarExpanded ? "Réduire le menu" : "Agrandir le menu"
            }
          >
            {isSidebarExpanded ? (
              <TornadoIcon className="h-6 w-6" />
            ) : (
              <CornerUpRightIcon className="h-7 w-7" />
            )}
          </Button>
        </div>
        <nav className={`flex w-full flex-col space-y-2 mt-2`}>
          {sidebarItems.map((item) => (
            <React.Fragment key={item.href}>
              {isSidebarExpanded ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center justify-start rounded text-gray-700 hover:bg-[#683dd022] group transition-all duration-300 p-2 ${
                    pathname === item.href
                      ? "bg-[#683dd022] text-[#683dd0]"
                      : ""
                  }`}
                >
                  <item.icon className="w-5 h-5 text-[#683dd0]" />
                  {isSidebarExpanded && (
                    <span className="ml-3 group-hover:text-[#683dd0]">
                      {item.label}
                    </span>
                  )}
                </Link>
              ) : (
                <TooltipProvider>
                  <Tooltip key={item.href} delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className={`flex items-center p-2 text-gray-700 hover:bg-[#683dd022] ${
                          pathname === item.href ? "bg-[#683dd022]" : ""
                        } ${
                          isSidebarExpanded ? "justify-start" : "justify-center"
                        }`}
                      >
                        <item.icon className="w-5 h-5 text-[#683dd0]" />
                        {isSidebarExpanded && (
                          <span className="ml-3">{item.label}</span>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="h-full">
                      <p className="whitespace-nowrap">{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </React.Fragment>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-grow w-full">
        {/* Navbar */}
        <header className="flex bg-white border-b items-center justify-between px-6 max-h-14 h-full">
          {/* Mobile menu button */}
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex items-center justify-center h-20 border-b">
                <span className="text-2xl font-semibold">MiticSchool</span>
              </div>
              <nav className="flex-grow">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                      pathname === item.href ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                  
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <h1 className="text-2xl font-semibold md:hidden">EchoSanté</h1>

          {/* User menu */}
          <div className="md:flex md:w-full md:items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative rounded-full cursor-pointer z-50 space-x-2"
                >
                  <div className="hidden md:flex flex-col justify-center items-center cursor-pointer">
                    <Label className="whitespace-nowrap">
                      {user?.firstname} {user?.lastname}
                    </Label>
                    <Label className="whitespace-nowrap">
                      {user?.role &&
                        user?.role?.charAt(0)?.toUpperCase() +
                          user?.role?.slice(1)}
                    </Label>
                  </div>
                  <Avatar>
                    <AvatarImage alt="Avatar" />
                    <AvatarFallback>
                      {user?.firstname.slice(0, 1) +
                        "" +
                        user?.lastname.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem>Paramètres</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-grow p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
