import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { CalendarPage } from "./pages/CalendarPage";
import { InboxPage } from "./pages/InboxPage";
import { PropertiesPage } from "./pages/PropertiesPage";
import { TeamPage } from "./pages/TeamPage";
import { TasksPage } from "./pages/TasksPage";
import { SettingsPage } from "./pages/SettingsPage";
import { HelpPage } from "./pages/HelpPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "calendar", Component: CalendarPage },
      { path: "inbox", Component: InboxPage },
      { path: "properties", Component: PropertiesPage },
      { path: "team", Component: TeamPage },
      { path: "tasks", Component: TasksPage },
      { path: "settings", Component: SettingsPage },
      { path: "help", Component: HelpPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);