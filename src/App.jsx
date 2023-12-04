import "./App.css";
import Layout from "./Layout";
import Toast from "./components/Toast";
import NavBar from "./components/NavBar";
import { clerkPubKey } from "./common/constants";
import { ClerkProvider } from "@clerk/clerk-react";
import SideNavBar from "./components/SideNavBar";
import { useState } from "react";

function App() {
  const [showToast, setShowToast] = useState(false);
  const [props, setToastProps] = useState("");

  return (
    <div className="font-urbanist py-5">
      <ClerkProvider publishableKey={clerkPubKey}>
        {showToast && (
          <div className="top-50">
            <Toast setToastProps={setToastProps} props={props} />
          </div>
        )}
        <div className="flex">
          <div className="w-full flex flex-col">
            <NavBar />
            <div className="w-full mt-16 flex">
              <div className="w-1/6">
                <SideNavBar />
              </div>
              <div className="w-4/5">
                <Layout
                  setShowToast={setShowToast}
                  setToastProps={setToastProps}
                  props={props}
                ></Layout>
              </div>
            </div>
          </div>
        </div>
      </ClerkProvider>
    </div>
  );
}

export default App;
