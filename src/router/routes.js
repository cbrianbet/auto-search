import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import SignIn from "@/pages/Signin.vue";
import SignUp from "@/pages/Signup.vue";
import Dashboard from "@/pages/Dashboard.vue";
import InventoryList from "@/pages/InvetoryList.vue";
import InventoryAdd from "@/pages/InventoryAdd.vue";
import SlotAdd from "@/pages/SlotAdd.vue";
import JobList from "@/pages/JobsList.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "inventory/list",
        name: "inventory List",
        component: InventoryList
      },
      {
        path: "inventory/add",
        name: "inventory Add",
        component: InventoryAdd
      },
      {
        path: "slot/add",
        name: "Schedule Job",
        component: SlotAdd
      },
      {
        path: "jobs/list",
        name: "Job List",
        component: JobList
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: SignIn
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
