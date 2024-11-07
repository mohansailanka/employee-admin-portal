import './App.css';
import AddEmployee from './components/AddEmployee';
import EmployeeDatatable from './components/EmployeeDatatable';
import { Route, Switch } from 'react-router-dom';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">

      <Splitter style={{ height: '100vh' }} layout="vertical">
        <SplitterPanel className="flex align-items-center justify-content-center" size={5}><Navbar /></SplitterPanel>
        <SplitterPanel className="flex align-items-center justify-content-center" size={95} >
          <Switch>
            <Route exact path="/" component={EmployeeDatatable} />
            <Route path="/add-employee" component={AddEmployee} />
          </Switch>
        </SplitterPanel>
      </Splitter>

    </div>
  );
}

export default App;
