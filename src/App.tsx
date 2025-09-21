import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { AssetReadinessDashboard } from '@/components/modules/AssetReadinessDashboard';
import { CommunityManagement } from '@/components/modules/CommunityManagement';
import { CapitalFormation } from '@/components/modules/CapitalFormation';
import { Dashboard } from '@/components/Dashboard';
import { DocumentTemplatesLibrary } from '@/components/modules/DocumentTemplatesLibrary';
import { RegulatoryCompliance } from '@/components/modules/RegulatoryCompliance';
import { InitialAssessment } from '@/components/modules/InitialAssessment';
import { Documentation } from '@/components/modules/Documentation';
import { Onboarding } from '@/components/Onboarding';
import { Login } from '@/components/auth/Login';
import { Signup } from '@/components/auth/Signup';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Main Application Routes */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/asset-readiness" element={<InitialAssessment />} />
              <Route path="/asset-readiness/regulatory-compliance" element={<RegulatoryCompliance />} />
              <Route path="/asset-readiness/documentation" element={<Documentation />} />
              <Route path="/asset-readiness/dashboard" element={<AssetReadinessDashboard />} />
              <Route path="/asset-readiness/document-templates" element={<DocumentTemplatesLibrary />} />
              <Route path="/community-management" element={<CommunityManagement />} />
              <Route path="/capital-formation" element={<CapitalFormation />} />
              <Route path="/capital-formation/*" element={<CapitalFormation />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
