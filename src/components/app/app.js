import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmplployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

function App() {
const data = [
    {name: "Ben C.", salary: 800, increase: false, id: 1, like: false},
    {name: "Ann M.", salary: 2000, increase: false, id: 2, like: false},
    {name: "Bob D.", salary: 3000, increase: false, id: 3, like: false}
];

    return (
        <div className="app">
            <AppInfo/>
            <div className="search-panel">
                <SearchPanel/>
                <AppFilter/>
            </div>

            <EmployeesList data={data}/>
            <EmplployeesAddForm/>
        </div>
    )
}

export default App;