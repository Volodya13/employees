import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmplployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "Ben C.", salary: 800, increase: false, id: 1, like: true},
                {name: "Ann M.", salary: 2000, increase: false, id: 2, like: false},
                {name: "Bob D.", salary: 3000, increase: true, id: 3, like: false}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(item => item.id === id);
         
        /*Удаление элемента из массива данных,
         сохраняя принципы иммутубельности*/
         // использование метода slice();
            // const before = data.slice(0, index),
            //       after = data.slice(index + 1),
            //       newArr = [...before, ...after];
        // использование  метода filter();
           return {
                data: data.filter(item => item.id !== id)
            }

        })
    }

    addNew = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            like: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {

        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id){
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    serchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        } 

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'like':
                return items.filter(item => item.like);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000)
            default: 
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }
    
    render() {
        const {data, term, filter} =this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.serchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increased={increased}/>

                <div className="search-panel">
                    <SearchPanel 
                    onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter}
                                onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmplployeesAddForm
                    onAddNewEmploye={this.addNew}/>
            </div>
        )
}
}

export default App;