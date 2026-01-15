import Layout from "./Layout.jsx";

import Home from "./Home";

import CreatorSignup from "./CreatorSignup";

import FanSignup from "./FanSignup";

import Privacy from "./Privacy";

import Terms from "./Terms";

import CreatorDemo from "./CreatorDemo";
import FanDemo from "./FanDemo";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    CreatorSignup: CreatorSignup,
    
    FanSignup: FanSignup,
    
    CreatorDemo: CreatorDemo,
    
    FanDemo: FanDemo,
    
    Privacy: Privacy,
    
    Terms: Terms,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/CreatorSignup" element={<CreatorSignup />} />
                
                <Route path="/FanSignup" element={<FanSignup />} />
                
                <Route path="/demo/creators/*" element={<CreatorDemo />} />

                <Route path="/demo/fans/*" element={<FanDemo />} />

                <Route path="/Privacy" element={<Privacy />} />
                
                <Route path="/Terms" element={<Terms />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}