import React from 'react';
import Sidebar from '../components/common/sidebar/Sidebar';
import Topbar from '../components/common/topbar/Topbar';
import Home from './home/Home';
import './app.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProjectInfo from './projectInfo/ProjectInfo';
import PhaseInfo from './phaseInfo/PhaseInfo';
import TaskInfo from './tasks/TaskInfo';
import MemberInfo from './member/MemberInfo';
import useStore from '../store/useStore';
export default function App() {
    const currentProject = useStore(state => state.currentProject);
    const fetch = useStore(state => state.fetch);
    React.useEffect(() => {
        fetch();
    }, []);
    const accessToken = localStorage.getItem('accessToken');
    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <Routes>
                    <Route path="/" element={accessToken ? <Navigate to={`/${currentProject}`} replace /> : <Navigate to="/login" />} />
                    <Route path='/:projectName' element={<Home />} />
                    <Route path=':projectName/projectInfo' element={<ProjectInfo />} />
                    <Route path=':projectName/phases' element={<PhaseInfo />} />
                    <Route path='tasks' element={<TaskInfo />} />
                    <Route path=':projectName/memberInfo' element={<MemberInfo />} />
                </Routes>
            </div>
        </>
    );
}