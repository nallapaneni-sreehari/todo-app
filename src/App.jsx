import "./App.css";
import Layout from "./Layout";
import Toast from "./components/Toast";
import NavBar from "./components/NavBar";
import { clerkPubKey } from "./common/constants";
import { ClerkProvider } from "@clerk/clerk-react";
import SideNavBar from "./components/SideNavBar";

function App() {
  return (
    <div className="font-urbanist py-5">
      <ClerkProvider publishableKey={clerkPubKey}>
        <div className="top-50">
          <Toast />
        </div>
        <div className="flex">
          <div className="w-full flex flex-col">
            <NavBar />
            <div className="flex">
              <SideNavBar />
              <Layout></Layout>
            </div>
          </div>
        </div>
      </ClerkProvider>
    </div>
  );
}

export default App;
