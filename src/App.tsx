import React, {useEffect, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

type ObjectType = {
    title: string
    filter: FilterValuesType
    tasks: TasksType[]
    students: string[]
}
export type TasksType = {
    taskId: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

type CurrentTodosType = ObjectType & {
    id: string

}

function App() {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    //
    // let [todolists, setTodolists] = useState<Array<TodolistType>>([
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ])
    //
    // let [tasks, setTasks] = useState<TasksStateType>({
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // });

    const todoFromServer: ObjectType[] = [
        {
            title: "What to learn",
            filter: "all",
            tasks: [
                {taskId: v1(), title: "HTML&CSS", isDone: true},
                {taskId: v1(), title: "JS", isDone: true}
            ],
            students: [
                'Rick Kane',
                'Finnlay Bentley',
                'Samia North',
                'Isaac Morton',
                'Lily-Ann Clifford',
                'Thalia Park',
                'Sapphire Cruz',
                'Cieran Vazquez',
                'Anya Estes',
                'Dominika Field',
                'Rosanna Chung',
                'Safiyah Davey',
                'Ryley Beasley',
                'Kalvin Trejo',
                'Evie-Mae Farrell',
                'Juliet Valencia',
                'Astrid Austin',
                'Lyle Montgomery',
                'Nisha Mora',
                'Kylie Callaghan',
                'Star Wilks',
                'Marissa Colley',
                'Asa Fuller',
                'Leigh Kemp',
                'Avleen Dawson',
                'Sammy Bonilla',
                'Acacia Becker',
                'Coral Shepherd',
                'Melina Molina',
                'Kiran Bailey',
                'Clara Escobar',
                'Alexandru Horn',
                'Brandon-Lee Mercado',
                'Elouise Weston',
                'King Long',
                'Kerri Searle',
                'Kanye Hamer',
                'Elwood Benitez',
                'Mikail Whitaker',
                'Bobby Hardy',
                'Talha Ferry',
                'Priscilla Landry',
                'Olivia-Grace Cain',
                'Kiaan Wallace',
                'Wesley Padilla90',
                'Ella-Grace Wooten91',
                'Kaif Molloy92',
                'Kamal Broadhurst93',
                'Bianca Ferrell94',
                'Micheal Talbot95',
            ]
        },
        {
            title: "What to do",
            filter: "all",
            tasks: [
                {taskId: v1(), title: "HTML&CSS2", isDone: true},
                {taskId: v1(), title: "JS2", isDone: true}
            ],
            students: [
                'Jago Wormald1',
                'Saul Milne2',
                'Aariz Hester3',
                'Dion Reeve4',
                'Anisa Ortega5',
                'Blade Cisneros6',
                'Malaikah Phelps7',
                'Zeeshan Gallagher8',
                'Isobella Vo9',
                'Rizwan Mathis10',
                'Menaal Leach11',
                'Kian Walton12',
                'Orion Lamb13',
                'Faizah Huynh14',
                'Crystal Vaughan15',
                'Vivien Hickman16',
                'Stuart Lu17',
                'Karol Davison18',
                'Dario Burns19',
                'Chloe Rich20',
                'Martyna Felix',
                'Nida Glass',
                'Maeve Miles',
                'Hasnain Puckett',
                'Ayman Cano',
                'Safwan Perry',
                'Fox Kelly',
                'Louise Barlow',
                'Malaki Mcgill',
                'Leanna Cline',
                'Willard Hodge',
                'Amelia Dorsey',
                'Kiah Porter',
                'Jeanne Daly',
                'Mohsin Armstrong',
                'Laurie Rangel',
                'Princess Tierney',
                'Kasim Kendall',
                'Darryl Cope',
                'Elysha Ray',
                'Liyana Harris',
                'Kashif Blackburn',
                'Atif Zimmerman',
                'Sila Hartley',
                'Ralphie Hebert',
            ]
        }
    ]
    const [todos, setTodos] = useState<CurrentTodosType[]>([])
    useEffect(() => {
        setTodos(todoFromServer.map(td => ({...td, id: v1()})))
    }, []);

    function removeTask(id: string, todolistId: string) {
        setTodos(todos.map(td => td.id === todolistId ? {...td, tasks: td.tasks.filter(t => t.taskId !== id)} : td));
    }
    function addTask(title: string, todolistId: string) {
        let task = {taskId: v1(), title: title, isDone: false};
        setTodos(todos.map(td => td.id === todolistId ? {...td, tasks: [...td.tasks, task]} : td))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        setTodos(todos.map(td => td.id === todolistId ? {...td, tasks: td.tasks.map(t => t.taskId === id ? {...t, isDone} : t)} : td));
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodos(todos.map(td => td.id === todolistId ? {...td, filter: value} : td))
    }

    function removeTodolist(id: string) {
        setTodos(todos.filter(td => td.id !== id));
    }

    return (
        <div className="App">
            {
                todos.map(tl => {
                    let allTodolistTasks = tl.tasks;
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;
