const path = require("path");
const fs = require("fs-extra");
const { writeFile } = require("./utils");

async function generateFiles(frontendDir) {
  // Configure vite.config.js
  const viteConfigContent = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})`;
  writeFile(path.join(frontendDir, "vite.config.js"), viteConfigContent);

  // Replace index.css
  const indexCssContent = `@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Yatra+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Yatra+One&display=swap");
@import "tailwindcss";
@plugin "tailwindcss-animate";

@theme {
  --font-roboto: "Roboto", "sans-serif";
  --font-raleway: "Raleway", "sans-serif";
  --font-poppins: "Poppins", "sans-serif";
  --color-dark-blue: #1e2251;
  --color-green: #13ec00;
  --color-avocado: #5c8001;
  --color-superiory-blue: #6ea4bf;
  --color-ebony: #626c66;
  --color-light-blue: #a7cecb;
  --color-madder: #b10f2e;
  --color-light-gray: #e5e5e5;
  --color-yellow: #FFD700;
  --color-rose: #FF2E63;
  --color-red: #FF0000;
  --color-purple: #9747FF;
  --color-sky-blue: #4FACFE;
  --color-indigo: #4F00BC;
  --color-teal: #08A9BB;
  --color-cerulean: #06B6D4;
  --color-logo-blue: #00F2FE;
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
}

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

@layer utilities {
  .fade-in { animation: fadeIn 0.5s ease-in-out; }
  .fade-out { animation: fadeOut 0.5s ease-in-out; }
  .glow { animation: glow 3s infinite ease-in-out; }
  .gradient-glow { animation: gradient 15s infinite alternate; }
  .pulse { animation: pulse 2s infinite; }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
}`;
  writeFile(path.join(frontendDir, "src", "index.css"), indexCssContent);

  // Delete App.css
  fs.removeSync(path.join(frontendDir, "src", "App.css"));
  console.log("Deleted: src/App.css");

  // Create RoutesConfig.jsx
  const routesConfigContent = `import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { HeroPage, Login, VerifyEmail } from "./components";
import { dashboardMenuState } from "./app/DashboardSlice";
import { isUserLoggedIn } from "./app/DashboardSlice";

import NavBar from "./components/protected/Dashboard/NavBar";
import Sidebar from "./components/utils/Sidebar";
import Dashboard from "./components/protected/Dashboard/Dashboard";

const RoutesConfig = () => {
  const isLoggedIn = useSelector(isUserLoggedIn);
  const ifDMenuState = useSelector(dashboardMenuState);
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route
          path="/"
          key={"home"}
          className="transition-all scrollbar-hide"
          element={[<HeroPage key={"HeroPage"}/>]}
        />
        <Route
          path="/login"
          className="transition-all scrollbar-hide"
          element={[<Login />]}
        />
        <Route
          path="/verify-email"
          className="transition-all scrollbar-hide"
          element={[<VerifyEmail />]}
        />
      </Routes>
    );
  } else {
    return (
      <div className={\`w-full h-[100vh] bg-[#121212] flex flex-col overflow-y-auto scrollbar-hide\`}>
        <Sidebar isOpen={ifDMenuState} />
        <NavBar />
        <div className={\`\${ifDMenuState && "pl-[4rem]"} \`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <div className="bg-gray-900 b-2 pr-2 text-sm pb-1 flex justify-end items-center">
            <p className="text-white">Designed and Developed with ❤️ by <a href="https://hareshkurade.netlify.app" className="text-green-400">quikfrontend</a></p>
          </div>
        </div>
      </div>
    );
  }
};

export default RoutesConfig;`;
  writeFile(
    path.join(frontendDir, "src", "RoutesConfig.jsx"),
    routesConfigContent
  );

  // Rewrite main.jsx
  const mainJsxContent = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import Store from './app/store.js';

import { GoogleOAuthProvider } from '@react-oauth/google';

const client_id = import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT;
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
    <GoogleOAuthProvider clientId={client_id}>
      <Provider store={Store}>
        <Toaster position='top-center' reverseOrder={true}/>
        <App />
      </Provider>
      </GoogleOAuthProvider>
    </StrictMode>
  </BrowserRouter>
)`;
  writeFile(path.join(frontendDir, "src", "main.jsx"), mainJsxContent);

  // Rewrite App.jsx
  const appJsxContent = `import RoutesConfig from "./RoutesConfig"

function App() {
  return (
    <RoutesConfig />
  )
}

export default App`;
  writeFile(path.join(frontendDir, "src", "App.jsx"), appJsxContent);

  // Create app folder and files
  fs.ensureDirSync(path.join(frontendDir, "src", "app"));
  const dashboardSliceContent = `import { createSlice } from "@reduxjs/toolkit";
const localData = JSON.parse(localStorage.getItem("account"));
const Dstate = JSON.parse(localStorage.getItem("dState"))
const initialState = {
    dashboardMenuState: true,
    dashboardFeature: Dstate ? Dstate : "Home",
    account: localData ? localData : [],
    isLoggedIn: localData ? localData.isLoggedIn :false,
    profileData: [],
};

const DashboardSlice = createSlice({
    initialState,
    name:  "dashboard",
    reducers: {
        setOpenDMenu: (state, action) => {
            state.dashboardMenuState = action.payload.dashboardMenuState;
        },
        setCloseDMenu: (state, action) => {
            state.dashboardMenuState = action.payload.dashboardMenuState;
        },
        setDFeature: (state, action) => {
            state.dashboardFeature = action.payload.dashboardFeature;
            localStorage.setItem("dState", JSON.stringify(action.payload.dashboardFeature));
        },
        setAccount: (state, action) =>{
            state.account = action.payload;
            state.isLoggedIn = true;
            const temp = {...state.account, "isLoggedIn": state.isLoggedIn};
            localStorage.setItem("account", JSON.stringify(temp));
        },
        LogOut: (state, action) =>{
            state.account = [];
            state.profileData = [];
            state.isLoggedIn = false;
            state.dashboardMenuState = false;
            state.dashboardFeature = "dashboard";
            localStorage.clear();
        },
        setAccountAfterRegister: (state, action) => {
            state.account = action.payload;
            state.isLoggedIn = false;
            const temp1 = {...state.account, "isLoggedIn": state.isLoggedIn};
            localStorage.setItem("account", JSON.stringify(temp1));
        },
    }
});

export const {setOpenDMenu, setCloseDMenu, setDFeature, setAccount, setAccountAfterRegister, LogOut} = DashboardSlice.actions;

export const dashboardMenuState = (state) => state.dashboard.dashboardMenuState;
export const dashboardFeature = (state) => state.dashboard.dashboardFeature;
export const isUserLoggedIn = (state) => state.dashboard.isLoggedIn;
export const selectAccount = (state) => state.dashboard.account;
export const selectProfileData = (state) => state.dashboard.profileData;

export default DashboardSlice.reducer;`;
  writeFile(
    path.join(frontendDir, "src", "app", "DashboardSlice.js"),
    dashboardSliceContent
  );

  const storeJsContent = `import { configureStore } from "@reduxjs/toolkit";
import DashboardSlice from "./DashboardSlice.js";

const Store = configureStore({
    reducer:{
        dashboard: DashboardSlice,
    }
});

export default Store;`;
  writeFile(path.join(frontendDir, "src", "app", "store.js"), storeJsContent);

  // Create components folder and structure
  fs.ensureDirSync(path.join(frontendDir, "src", "components", "common"));
  fs.ensureDirSync(path.join(frontendDir, "src", "components", "data"));
  fs.ensureDirSync(
    path.join(frontendDir, "src", "components", "protected", "Dashboard")
  );
  fs.ensureDirSync(
    path.join(frontendDir, "src", "components", "protected", "Home")
  );
  fs.ensureDirSync(path.join(frontendDir, "src", "components", "utils"));

  const componentsIndexContent = `export {default as Login } from './common/Login';
export {default as VerifyEmail } from './common/VerifyEmail';
export {default as HeroPage } from './common/HeroPage';`;
  writeFile(
    path.join(frontendDir, "src", "components", "index.js"),
    componentsIndexContent
  );

  // Common folder files
  const heroPageContent = `import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, Star, CheckCircle, Code, Zap, Settings } from 'lucide-react';

export default function HeroPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className={\`fixed w-full z-30 transition-all duration-300 \${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }\`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">Your Brand</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Get Started</a>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Contact</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700" onClick={() => {setIsMenuOpen(false); navigate("/login");}}>Get Started</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-36 md:pb-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 md:pr-8 mb-10 md:mb-0">
              <div className="animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                  Welcome to <span className="bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">Your New Project</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  This beautiful landing page was generated with quikfrontend. Customize it to build something amazing.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button onClick={()=> {navigate("/login")}} className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-all flex items-center justify-center">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 animate-float">
              <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 aspect-video flex items-center justify-center">
                  <div className="text-white text-4xl font-bold">Your Product</div>
                  <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-yellow-400 rounded-full opacity-50"></div>
                  <div className="absolute top-4 left-4 h-12 w-12 bg-white rounded-full opacity-20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Amazing Features</h2>
            <p className="text-lg text-gray-600">Everything you need to showcase your product or service.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="mb-4">
                <Zap className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Optimized for speed and performance right out of the box.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="mb-4">
                <Code className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Clean Code</h3>
              <p className="text-gray-600">Built with modern best practices for maintainable code.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="mb-4">
                <Settings className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customizable</h3>
              <p className="text-gray-600">Easily modify all aspects to match your brand identity.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="mb-4">
                <CheckCircle className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliable</h3>
              <p className="text-gray-600">Thoroughly tested components you can depend on.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform rotate-1 hover:rotate-0 transition-all duration-300">
                <div className="aspect-video relative rounded-md bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center overflow-hidden">
                  <div className="absolute w-20 h-20 bg-blue-500 rounded-full -top-10 -left-10 opacity-20"></div>
                  <div className="absolute w-32 h-32 bg-teal-500 rounded-full -bottom-16 -right-16 opacity-20"></div>
                  <div className="z-10 text-2xl font-bold text-gray-800">About Us</div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Replace this with your company's story. Tell your visitors who you are, what you do, and why they should choose you. Make it personal and engaging.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3">✓</div>
                  <p className="text-gray-600">Share your company's mission and values</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3">✓</div>
                  <p className="text-gray-600">Highlight what makes your offering unique</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3">✓</div>
                  <p className="text-gray-600">Build trust with testimonials and social proof</p>
                </li>
              </ul>
              <div className="mt-8">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center">
                  Learn more
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Don't just take our word for it. Here's what people are saying.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"Replace this with a real testimonial from one of your satisfied customers. Make it specific and authentic."</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 mr-3"></div>
                <div>
                  <h4 className="font-medium">Customer Name</h4>
                  <p className="text-sm text-gray-500">Position, Company</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"Another testimonial here. Focus on the specific results or benefits your customers have experienced."</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 mr-3"></div>
                <div>
                  <h4 className="font-medium">Customer Name</h4>
                  <p className="text-sm text-gray-500">Position, Company</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"A third testimonial to reinforce your credibility. Real testimonials from happy customers are incredibly powerful."</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 mr-3"></div>
                <div>
                  <h4 className="font-medium">Customer Name</h4>
                  <p className="text-sm text-gray-500">Position, Company</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-blue-100 mb-8">Join thousands of satisfied customers today.</p>
            <div className="bg-white rounded-lg p-1 flex flex-col sm:flex-row max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-l-md focus:outline-none text-gray-800"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md sm:rounded-l-none hover:bg-blue-700 transition-all mt-2 sm:mt-0">
                Sign Up
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">No credit card required. Free 14-day trial.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-lg text-gray-600">We'd love to hear from you. Here's how you can reach us.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-gray-600">123 Street Name, City, Country</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">contact@yourcompany.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 9am - 5pm</p>
                    <p className="text-gray-600">Saturday & Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-4">Follow us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184A4.92 4.92 0 0011.78 8.28 13.98 13.98 0 016.407 5.07a4.928 4.928 0 001.522 6.57 4.887 4.887 0 01-2.228-.616v.061A4.926 4.926 0 009.52 15.95a4.916 4.916 0 01-2.228.084 4.93 4.93 0 004.6 3.42A9.88 9.88 0 010 21.44a14 14 0 007.548 2.212c9.057 0 14.01-7.502 14.01-14.01 0-.213-.005-.426-.015-.637a10.025 10.025 0 002.46-2.548l-.047-.02z" /></svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.415 2.227.055 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z" /></svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 013.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Your Brand</h3>
              <p className="mb-4">A short description of your company or product goes here. Make it compelling.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184A4.92 4.92 0 0011.78 8.28 13.98 13.98 0 016.407 5.07a4.928 4.928 0 001.522 6.57 4.887 4.887 0 01-2.228-.616v.061A4.926 4.926 0 009.52 15.95a4.916 4.916 0 01-2.228.084 4.93 4.93 0 004.6 3.42A9.88 9.88 0 010 21.44a14 14 0 007.548 2.212c9.057 0 14.01-7.502 14.01-14.01 0-.213-.005-.426-.015-.637a10.025 10.025 0 002.46-2.548l-.047-.02z" /></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.415 2.227.055 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z" /></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Products</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Downloads</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors mr-4">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Add animations */}
      <style jsx>{\`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      \`}</style>
    </div>
  );
}`;
  writeFile(
    path.join(frontendDir, "src", "components", "common", "HeroPage.jsx"),
    heroPageContent
  );

  const loginContent = `import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { login, loginWithGoogle, register } from "../../services/repository/userRepo";

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginView) {
      dispatch(login(email, password, navigate));
    } else {
      dispatch(register(name, email, password, mobile, navigate));
    }
  };

  const handleSuccess = async (credentialResponse) => {
    dispatch(loginWithGoogle(credentialResponse, navigate));
  };

  const handleError = () => {
    alert("Google Sign-In failed");
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z" 
                fill="white"
              />
            </svg>
          </div>
        </div>

        {isLoginView ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign In</h2>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <a href="#" className="text-sm font-medium text-green-600 hover:text-green-500">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                    scope="email profile"
                  />
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button 
                onClick={toggleView}
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign up
              </button>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your mobile number"
                />
              </div>

              <div>
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="register-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="register-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                    scope="email profile"
                  />
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button 
                onClick={toggleView}
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign in
              </button>
            </p>
          </div>
        )}

        <p className="mt-6 text-xs text-center text-gray-500">
          By continuing, you agree to our{" "}
          <a href="#" className="text-green-600 hover:text-green-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-green-600 hover:text-green-500">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;`;
  writeFile(
    path.join(frontendDir, "src", "components", "common", "Login.jsx"),
    loginContent
  );

  const verifyEmailContent = `import React, { useState } from 'react'
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { selectAccount } from '../../app/DashboardSlice';
import { authEmail } from '../../services/repository/userRepo';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Timer } from 'lucide-react';

const VerifyEmail = () => {
    let [otp, setOtp] = useState("");
    const acc = useSelector(selectAccount);
    console.log(acc);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleVerifyAndSignup = (e) => {
        e.preventDefault();
        dispatch(authEmail(acc.id, otp, navigate));
      };
  return (
    <>
         <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute w-full h-full object-cover"
      >
        <source src={""} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/0 to-emerald-800/0 backdrop-blur-[0.3rem]"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-avocado/100 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="p-3 bg-green-400/20 rounded-full">
              <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 01-2 2H4a2 2 0 01-2-2V10a2 2 0 012-2h14.2M7 15l5 5 9-9"/>
              </svg>
            </div>
          </div>

          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Verify Your Email
          </h1>
          <p className="text-green-100 text-center mb-8">
            We've sent a verification code to your email. Please enter it below.
          </p>

          {/* Form */}
          <form onSubmit={handleVerifyAndSignup} className="space-y-6">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="0"
                  className="w-14 h-14 mx-1 text-center text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 font-bold text-xl"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0.5rem",
              }}
            />

            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02]"
            >
              Verify Email
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between text-green-100">
            <Link 
              to="/login"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Signup
            </Link>

            <button 
              className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              onClick={() => {
                // Handle resend logic
              }}
            >
              <Timer className="w-4 h-4" />
              Resend Code
            </button>
          </div>

          {/* Extra Info */}
          <p className="mt-6 text-sm text-center text-green-100">
            Didn't receive the code? Check your spam folder or{' '}
            <button className="text-green-400 hover:text-green-300">
              request a new one
            </button>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default VerifyEmail;`;
  writeFile(
    path.join(frontendDir, "src", "components", "common", "VerifyEmail.jsx"),
    verifyEmailContent
  );

  const dynamicContent = `import { HomeIcon } from "lucide-react";

const features = [
  {
    featureName: "Home",
    displayName: "Home",
    logoUsed: HomeIcon,
    route: "/dashboard",
  },
];

export { features };`;
  writeFile(
    path.join(frontendDir, "src", "components", "data", "dynamic.js"),
    dynamicContent
  );

  const dashboardContent = `import React from 'react';

const Dashboard = () => {
  return (
    <div className="h-full bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-full flex flex-col">
        <header className="mb-4">
          <h1 className="text-3xl font-bold text-green-500">Welcome to quikfrontend Dashboard...!</h1>
        </header>
      </div>
    </div>
  );
};

export default Dashboard;`;
  writeFile(
    path.join(
      frontendDir,
      "src",
      "components",
      "protected",
      "Dashboard",
      "Dashboard.jsx"
    ),
    dashboardContent
  );

  const navBarContent = `import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCloseDMenu, LogOut, dashboardMenuState, selectAccount } from "../../../app/DashboardSlice";

import { useNavigate } from "react-router-dom";
import { ArrowRight, CircleUserRound, LogOutIcon, Menu } from "lucide-react";

function NavBar() {
  const ifDMenuState = useSelector(dashboardMenuState);
  const user = useSelector(selectAccount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onMenuToggle = () => {
    console.log(user);
    dispatch(
      setCloseDMenu({
        dashboardMenuState: !ifDMenuState,
      })
    );
  };

  const logout = () => {
    dispatch(LogOut());
    navigate("/");
  };

  return (
    <div className="flex w-full sticky top-0 z-40 bg-[#1A2F23] drop-shadow-xl h-[4rem]">
      <div className="flex w-full px-[1rem] justify-between items-center">
        <div className={\`flex items-center \${ifDMenuState ? "pl-[3rem]" : ""}\`}>
          <Menu
            className="w-10 h-8 text-logo-blue cursor-pointer"
            onClick={onMenuToggle}
          />
        </div>
        <div className="flex items-center"></div>
        <div className="flex items-center gap-3">
          <div className="flex items-center px-2 py-2 shadow-xl rounded-2xl border-yellow border-[.1rem]">
            <CircleUserRound
              className="w-[2rem] rounded-full text-logo-blue"
            />
            <div className="flex flex-col items-start justify-center px-1">
              <h1 className="text-sm font-bold text-avocado hidden sm:flex">
                {user.uname}
              </h1>
              <h1 className="text-sm font-bold text-yellow hidden sm:flex">
                User
              </h1>
            </div>
          </div>
          <div
            className="flex items-center justify-center p-1 cursor-pointer"
            onClick={logout}
          >
            <LogOutIcon className="w-[3rem] text-logo-blue rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;`;
  writeFile(
    path.join(
      frontendDir,
      "src",
      "components",
      "protected",
      "Dashboard",
      "NavBar.jsx"
    ),
    navBarContent
  );

  const sidebarContent = `import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardFeature, dashboardMenuState, setCloseDMenu, setDFeature } from "../../app/DashboardSlice.js";
import { features } from "../data/dynamic.js";
import { useNavigate } from "react-router-dom";

import { Feather, X } from "lucide-react";

const Sidebar = ({ isOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const ifDMenuState = useSelector(dashboardMenuState);
  const dashboardFeatures = useSelector(dashboardFeature);

  const onCartToggler = () => {
    dispatch(setCloseDMenu({ dashboardMenuState: !ifDMenuState }));
  };

  return (
    <div
      className={\`
        fixed h-full
        \${isOpen ? "visible" : "invisible"}
        transition-all duration-300 ease-in-out
        \${isHovered ? "w-64" : "w-16"}
        bg-[#1A2F23] text-white
        flex flex-col gap-4
        shadow-lg z-50
      \`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <X
        className={\`absolute right-2 top-2 w-6 h-6 cursor-pointer text-white hover:text-yellow \${isHovered ? "opacity-100" : "opacity-0 w-0"}\`}
        onClick={onCartToggler}
      />
      <div className="flex flex-row gap-2 items-center mb-4 pt-3 px-2">
        <Feather className="w-[2rem] sm:w-[2.5rem]" />
        <p className={\`h-[1.8rem] \${isHovered ? "opacity-100" : "opacity-0 w-0"}\`} alt="logo">quikfrontend</p>
      </div>
      <div className="flex flex-col gap-2 px-2">
        {features.map((item, index) => (
          <div
            key={index}
            className={\`flex items-center cursor-pointer rounded-xl transition-all duration-200
                \${isHovered ? "px-4" : " px-2"}
                 h-12 \${(dashboardFeatures == item.featureName) ? "bg-yellow text-green-700" : "hover:bg-yellow/20 bg-none text-white"}\`}
            onClick={() => {dispatch(setDFeature({dashboardFeature: item.featureName})); navigate(item.route);  }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <item.logoUsed className={\`w-6 h-6 \${(dashboardFeatures == item.featureName) ? "" : "text-white"} \`} />
            </div>
            <span className={\`ml-4 whitespace-nowrap font-medium transition-opacity duration-200 \${isHovered ? "opacity-100" : "opacity-0 w-0"}\`}>
              {item.displayName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;`;
  writeFile(
    path.join(frontendDir, "src", "components", "utils", "Sidebar.jsx"),
    sidebarContent
  );

  // Create services folder and files
  fs.ensureDirSync(path.join(frontendDir, "src", "services", "repository"));

  const apisContent = `//All the API endpoints will be declared here and then this will be used in entire frontend to access the endpoints...
const BaseURL = import.meta.env.VITE_API_BASE_URL;

export const authEndpoints = {
    LOGIN_API: BaseURL + "auth/login",
    REGISTER: BaseURL + "auth/register",
    VALIDATE_GMAIL: BaseURL + "auth/validate",
    GOOGLE_SIGN_IN: BaseURL + "auth/sign-in-google",
}

export const uploadEndPoints = {
    UPLOAD: BaseURL + "upload/",
}`;
  writeFile(path.join(frontendDir, "src", "services", "Apis.js"), apisContent);

  const connectorContent = `//This will create an axios instance so no need to create and call the axios functions everywhere just call the function and pass data to this Connector object.
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
// Create axios instance with a base URL
export const axiosInstance = axios.create({
  baseURL: apiUrl || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// API Connector Function
export const apiConnector = (method, url, bodyData, headers, params) => {
  console.log("API Connector: ", method, url, bodyData, headers, params);
  const accountData = JSON.parse(localStorage.getItem("account"));
  let token;

  if (accountData) {
    token = accountData.token;
  }

  headers = headers || {};
  if (token) {
    headers["Authorization"] = \`Bearer \${token}\`;
  }
  console.log("byee");
  return axiosInstance({
    method,
    url,
    data: bodyData || null,
    headers,
    params: params || null,
  });
};`;
  writeFile(
    path.join(frontendDir, "src", "services", "Connector.js"),
    connectorContent
  );

  const userRepoContent = `//These repository files will be responsible for the flow of loaders and then sending the data to the connector along with the specific endpoint.
//i.e frontend pages will call the functions from thsese repo and then pass data to this and this function will decide the further actions/
//i.e enabling the loader, which endpoint should be called, after receiving the response what to do, toasting the required messages and at last defusing loaders.
import {toast} from 'react-hot-toast';
import { apiConnector } from '../Connector';
import { setAccount, setAccountAfterRegister, setDFeature } from '../../app/DashboardSlice';
import { authEndpoints } from '../Apis';
const {LOGIN_API, REGISTER, VALIDATE_GMAIL, GOOGLE_SIGN_IN} = authEndpoints;

export function login(email_id, password, navigate){
    return async(dispatch) => {
        const loadingToast = toast.loading("Letting you in...");
        try{
            const response = await apiConnector("POST", LOGIN_API, {email_id, password});

            console.log("Login API response : ", response);
            if(response.data.success){
                toast.success("Login Successful..");
                const temp = { "id": response.data.data.u_id, "uname": response.data.data.name, "uemail": response.data.data.email, "token": response.data.data.token, "role_id": response.data.data.role_id, "role": response.data.data.role, "is_new": response.data.data.isNew}
                dispatch(setAccount(temp))
                if(response.data.data.isNew){
                    dispatch(
                          setDFeature({
                            dashboardFeature: "Home",
                          })
                        );
                    navigate("/dashboard");
                }else{
                    dispatch(
                        setDFeature({
                          dashboardFeature: "Home",
                        })
                      );
                    navigate("/dashboard");
                }
            }else{
                throw new Error(response.data.message);
            }
        }
        catch(error){
            console.log("Login API Error....", error);
            console.log("Login API Error....", error.response?.data?.message);

            toast.error(error.response?.data?.message);
        }
        toast.dismiss(loadingToast);
    }
}

export function authEmail(userId, otp, navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Validating OTP..");
        try{
            const response = await apiConnector("POST", VALIDATE_GMAIL, {userId, otp})
            console.log("Validate API response : ", response);
            if(response.data.success){
                toast.success("Validation Successful..");
                navigate("/login");
                toast("Please Login...")
                console.log(response);
              }else{
                toast.error(response.data.message);
                throw new Error(response.data.message);
              }
        } catch(error){
            console.log("VALIDATION API Error....", error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export function register(name, email_id, password, mobile, navigate){
    return async(dispatch) => {
        const loadingToast = toast.loading("Registering you...");
        try{
            const response = await apiConnector("POST", REGISTER, {name, email_id, mobile, password});
            console.log("Register API response : ", response.data.data);
            if(response.data.success){
                toast.success("Registration Successful..");
                const temp = { "id": response.data.data.u_id, "uname": response.data.data.name, "uemail": response.data.data.email}
                console.log(temp);
                dispatch(setAccountAfterRegister(temp))
                navigate("/verify-email");
            }else{
                throw new Error(response.data.message);
            }
        }
        catch(error){
            console.log("Register API Error....", error);
            toast.error(error.response?.data?.message);
        }
        toast.dismiss(loadingToast);
    }
}

export function loginWithGoogle(credentialResponse, navigate) {
    return async (dispatch) => {
      const loadingToast = toast.loading("Signing in with Google...");
      try {
        const response = await apiConnector(
          "POST",
          GOOGLE_SIGN_IN,
          { credential: credentialResponse.credential }
        );
  
        console.log("Google Sign-In API response: ", response);
  
        if (response.data.success) {
          toast.success("Google Sign-In Successful!");
  
          const temp = {
            id: response.data.data.data.u_id,
            uname: response.data.data.data.name,
            uemail: response.data.data.data.email,
            token: response.data.data.data.token,
            is_new: response.data.data.data.isNew,
          };
          console.log(temp);
  
          dispatch(setAccount(temp));
  
          if (response.data.data.isNew) {
            dispatch(
              setDFeature({
                dashboardFeature: "Home",
              })
            );
            navigate("/dashboard");
          } else {
            dispatch(
              setDFeature({
                dashboardFeature: "Home",
              })
            );
            navigate("/dashboard");
          }
        } else {
          throw new Error(response.data.message || "Sign-in failed");
        }
      } catch (error) {
        console.log("Google Sign-In API Error:", error);
        console.log("Google Sign-In API Error Details:", error.response?.data?.message);
  
        toast.error(error.response?.data?.message || error.message || "Failed to sign in with Google");
      }
  
      toast.dismiss(loadingToast);
    };
  }`;
  writeFile(
    path.join(frontendDir, "src", "services", "repository", "userRepo.js"),
    userRepoContent
  );

  // Create .env file
  const envContent = `VITE_API_BASE_URL=http://localhost:3000 #Backend URL
VITE_PUBLIC_GOOGLE_CLIENT="your-google-client-id" #Google Client ID`;
  writeFile(path.join(frontendDir, ".env"), envContent);

  // Update .gitignore
  const gitignorePath = path.join(frontendDir, ".gitignore");
  let gitignoreContent = fs.existsSync(gitignorePath)
    ? fs.readFileSync(gitignorePath, "utf8")
    : "";
  if (!gitignoreContent.includes(".env")) {
    gitignoreContent += "\n.env\n";
    writeFile(gitignorePath, gitignoreContent);
  }
}

module.exports = { generateFiles };
