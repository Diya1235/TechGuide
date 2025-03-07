import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import store from './redux/store'; // Import your store and persistor
import Login from './components/auth/Login.jsx';
import Home from './components/Home.jsx';
import Sign from './components/auth/Sign.jsx';
import Projects from './components/Projects.jsx';
import Resume from './components/Resume/Resume.jsx';
import News from './components/News/News.jsx';
import Projectcard from './components/Projectcard.jsx';
import Coverletter from './components/CoverLetter/Coverletter.jsx';
import Profile from './components/Profile.jsx';
import ProjectDescription from './components/ProjectDescription.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AuthPage from './components/auth/AuthPage';
import AdminProjects from './components/Admin/AdminProjects';
import Createproject from './components/Admin/Createproject';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import ResumeCards from './components/Resume/ResumeCards';
import Adminres from './components/Admin/Adminres';
import CreateresTemp from './components/Admin/CreateresTemp';
import ResumeForm from './components/Resume/ResumeForm';
import RenderPreview from './components/Resume/RenderPreview';
import ShowResume from './components/Resume/ShowResume';
import SavedResume from './components/Resume/SavedResume';
import DisplayResume from './components/Resume/DisplayResume';
import EditResume from './components/Resume/EditResume';
import WorldMap from './components/Worldmap.jsx';
import CollegeResults from './components/CollegeResults';
import Aboutus from './components/Aboutus';
import ResumeScore from './components/Resume/ResumeScore';
import Scores from './components/Resume/Scores';
import CoverletterTemplate from './components/Admin/CoverletterTemplate';
import Admincl from './components/Admin/Admincl';
import CoverletterTemplatesAll from './components/CoverLetter/CoverletterTemplatesAll';
import CLForm from './components/CoverLetter/CLForm';
import ShowCoverletter from './components/CoverLetter/ShowCoverletter';
import DisplayCoverletter from './components/CoverLetter/DisplayCoverletter';
import EditCoverletter from './components/CoverLetter/EditCoverletter';
import ITRoles from './components/IT/ITRoles';

{/* Defined All routes within application*/ }
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/signup',
    element: <AuthPage />,
  },
  {
    path: '/findprojects',
    element: (
      <PrivateRoute>
        <Projects />
      </PrivateRoute>
    ),
  },
  {
    path: '/resume',
    element: (
      <PrivateRoute>
        <Resume />
      </PrivateRoute>
    ),
  },
  {
    path: '/score-results',
    element: (
      <PrivateRoute>
        <Scores />
      </PrivateRoute>
    ),
  },
  {
    path: '/news',
    element: (
      <PrivateRoute>
        <News />
      </PrivateRoute>
    ),
  },
  {
    path: '/projectcards',
    element: (
      <PrivateRoute>
        <Projectcard />
      </PrivateRoute>
    ),
  },
  {
    path: '/description/:id',
    element: (
      <PrivateRoute>
        <ProjectDescription />
      </PrivateRoute>
    ),
  },
  {
    path: '/coverletter',
    element: (
      <PrivateRoute>
        <Coverletter />
      </PrivateRoute>
    ),
  },
  {
    path: '/college',
    element: (
      <PrivateRoute>
        <WorldMap />
      </PrivateRoute>
    ),
  },
  {
    path: '/collegeResults',
    element: (
      <PrivateRoute>
        <CollegeResults />
      </PrivateRoute>
    ),
  },
  {
    path: '/aboutus',
    element: (

      <Aboutus />

    ),
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: '/viewCreatedResume',
    element: (
      <PrivateRoute>
        <ShowResume />
      </PrivateRoute>
    )
  },
  {
    path: '/resume/:id',
    element: (
      <PrivateRoute>
        <DisplayResume />
      </PrivateRoute>
    )

  },
  {
    path: '/coverletter/:id',
    element: (
      <PrivateRoute>
        <DisplayCoverletter />
      </PrivateRoute>
    )

  },
  {
    path: '/editCoverletter',
    element: (
      <PrivateRoute>
        <EditCoverletter />
      </PrivateRoute>
    )

  },
  {
    path: '/roles',
    element: (
      <PrivateRoute>
        <ITRoles />
      </PrivateRoute>
    )

  },


  {
    path: '/scorechecker',
    element: (
      <PrivateRoute>
        <ResumeScore />
      </PrivateRoute>
    )

  },

  {
    path: '/user/resumes',
    element: (
      <PrivateRoute>
        <ResumeCards />
      </PrivateRoute>
    ),
  },
  {
    path: '/user/createResume',
    element: (
      <PrivateRoute>
        <ResumeForm />
      </PrivateRoute>
    )
  },
  {
    path: '/previewResume',
    element: (
      <PrivateRoute>
        <RenderPreview />
      </PrivateRoute>
    )
  },
  {
    path: '/editResume',
    element: (
      <PrivateRoute>
        <EditResume />
      </PrivateRoute>
    )
  },
  {
    path: '/user/CoverletterTemplates',
    element: (
      <PrivateRoute>
        <CoverletterTemplatesAll />
      </PrivateRoute>
    )
  },
  {
    path: '/user/createCoverletter',
    element: (
      <PrivateRoute>
        <CLForm />
      </PrivateRoute>
    )
  },
  {
    path: '/viewcoverletter',
    element: (
      <PrivateRoute>
        <ShowCoverletter />
      </PrivateRoute>
    )
  },
  //admin
  {
    path: "/adminProjects",
    element: <ProtectedRoute><AdminProjects /></ProtectedRoute>
  },
  {
    path: "/admin/createproject",
    element: <ProtectedRoute><Createproject /></ProtectedRoute>
  },
  {
    path: "/admin/createResumeTemp",
    element: <ProtectedRoute><CreateresTemp /></ProtectedRoute>

  },
  {
    path: "/admintemplates",
    element: <ProtectedRoute><Adminres /></ProtectedRoute>
  },
  {
    path: "/admincltemplates",
    element: <ProtectedRoute><Admincl /></ProtectedRoute>
  },
  {
    path: "/admin/createCLTemp",
    element: <ProtectedRoute><CoverletterTemplate /></ProtectedRoute>
  }

]);

function App() {
  return (
    <Provider store={store}>
      {/* Wrap with PersistGate */}
      <RouterProvider router={appRouter} />

    </Provider>
  );
}

export default App;
