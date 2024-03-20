import './App.css'
import Notification from './pages/Notification.tsx'
import Home from './pages/Home.tsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer.tsx'
import MainMenu from './components/MainMenu.tsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import ActivityList from './pages/Activity.tsx'
import ActivityInfo from './components/ActInfo.tsx'
import TestUpload from './pages/TestUpload.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import CreateAct from './pages/CreateAct.tsx'
import NavBar from './components/NavBar.tsx'
import ActivityDetail from './components/ActivityDetail2.tsx'
import ChooseTags from './pages/ChooseTags.tsx'
import MyActivity from './pages/MyActivity.tsx'


library.add(fas, faTwitter, faFontAwesome)


function App() {
  const location = useLocation();

  // Hide menu on register and login pages
  const hideMunuPaths = ['/register', '/login', '/choose'];
  const shouldShowMenu = !hideMunuPaths.includes(location.pathname);

  //function to determine headerText based on the current route
  const getHeaderText = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'หากิจกรรมที่ใช่สำหรับคุณ';
      case '/activity':
        return 'ข่าวสารกิจกรรม';
      case '/create-activity':
        return 'สร้างกิจกรรม';
      case '/my-activity':
        return 'กิจกรรมของฉัน';
      default:
        return 'default text';
    }
  }
  //determine headerText based on current route
  const headerText = getHeaderText(location.pathname)
  return (
    // flex-col to handle footer
    <div className='flex flex-col'>
      {shouldShowMenu && <NavBar headerText={headerText}/>}
      {shouldShowMenu && <MainMenu/>}
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/activity' element={<ActivityList/>}/>
        <Route path='/notification' element={<Notification/>}/>
        {/* <Route path='/login' element={<Home/>}/> */}
        <Route path='/create-activity' element={<CreateAct/>}/>
        <Route path='/info' element={<ActivityInfo/>}/>
        <Route path='/image' element={<TestUpload/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/detail' element={<ActivityDetail/>}/>
        <Route path='/choose' element={<ChooseTags/>}/>
        <Route path='/my-activity' element={<MyActivity/>}/>
      </Routes>
      {shouldShowMenu && <Footer/>}
    </div>
    
  )
}

export default App
