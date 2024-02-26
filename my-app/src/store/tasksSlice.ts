import {createSlice} from '@reduxjs/toolkit';

type Task = {
    id: number;
    taskName: string;
    taskDescription: string;
    taskStatus: boolean;
    order: number;
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [
            { id: 1, taskName: 'Задача 1', taskDescription: 'Описание 1', taskStatus: false, order: 1 },
            { id: 2, taskName: 'Задача 2', taskDescription: 'Описание 2', taskStatus: false, order: 2 },
            {
                id: 3,
                taskName: 'Задача 3',
                taskDescription:
                'Такое длинное описание задачи 3 такое длинное описание задачи 3 такое длинное описание задачи 3 такое длинное описание задачи 3 ',
                taskStatus: true, 
                order: 3
            },
        ],
        allTasks:  [
            { id: 1, taskName: 'Задача 1', taskDescription: 'Описание 1', taskStatus: false, order: 1 },
            { id: 2, taskName: 'Задача 2', taskDescription: 'Описание 2', taskStatus: false, order: 2 },
            {
                id: 3,
                taskName: 'Задача 3',
                taskDescription:
                'Такое длинное описание задачи 3 такое длинное описание задачи 3 такое длинное описание задачи 3 такое длинное описание задачи 3 ',
                taskStatus: true, 
                order: 3
            },
        ], 
        amountCompletedTasks: 0,
        amountUncompletedTasks: 0,
        default_task: { id: 0, order: 0, taskName: '', taskDescription: '', taskStatus: false },
        addingMode: false,
    },    
    reducers: {
        addTask(state, action) {
            const newTask = {
                id: state.tasks[state.tasks.length-1].id + Math.random(),
                taskStatus: false,
                taskDescription: action.payload.taskDescription,
                taskName: action.payload.taskName,
                order: state.tasks.length ? Math.max.apply(null, state.tasks.map(el => el.order)) +1 : 0,
            };
            state.tasks.push(newTask);
            state.allTasks.push(newTask);
            state.addingMode = false;
        },
        deleteTask(state, action) {
            const removeTask = (arrTasks: Array<Task>) => arrTasks.filter(task => task.id !== action.payload.id)
            state.tasks = removeTask(state.tasks);
            state.allTasks = removeTask(state.allTasks);
        },
        changeTaskStatus(state, action) {
            const changeTaskStatus = (arrTasks: Array<Task>) => arrTasks.map(task => {
                if (task.id === action.payload.id) {
                    task.taskStatus = !task.taskStatus;
                }
                return task;
            });
            changeTaskStatus(state.tasks);
            changeTaskStatus(state.allTasks);
        },
        searchTask(state, action) {
            if (state.tasks.length)
            state.tasks = state.tasks.filter(task => task.taskName.toLowerCase().includes(action.payload.searchText.toLowerCase()));
        },
        filterTasks(state, action) {
            switch (action.payload.filterType) {
                case "Done":
                  state.tasks = state.tasks.filter((task) => task.taskStatus);
                  break;
                case "Undone":
                  state.tasks = state.tasks.filter((task) => !task.taskStatus);
                  break;
                default:
                    state.tasks = state.allTasks
                  break;
              }
        },
        updateTasksOrder(state, action) {
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload.dropTask.id) {
                    return {...task, order: action.payload.currentTask.order};
                }
                if (task.id === action.payload.currentTask.id) {
                    return {...task, order: action.payload.dropTask.order};
                }
                return task;
            }).sort((a, b) => {
                if (a.order > b.order) {
                    return 1;
                } else {
                    return -1;
                }
            });
        },
        updateAmount(state) {
            state.amountCompletedTasks = state.tasks.filter((task) => task.taskStatus && task).length;
            state.amountUncompletedTasks = state.tasks.filter((task) => !task.taskStatus && task).length;
        },
        setAddingMode(state, action) {
            state.addingMode = action.payload;
        },
    },
});

export const {addTask, deleteTask, searchTask, filterTasks, changeTaskStatus, updateTasksOrder, updateAmount, setAddingMode} = taskSlice.actions;

export default taskSlice.reducer;
