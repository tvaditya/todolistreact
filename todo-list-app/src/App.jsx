import { useState } from 'react'
import { TrashIcon } from '@radix-ui/react-icons';
import './App.css'

function App() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);

    const addNewTask = () => {
        const currentTasks = [...tasks];
        const newTask = {
            id: Date.now() + Math.random(),
            title: title,
            description: description,
            done: false
        };

        currentTasks.push(newTask);

        setTasks(currentTasks);

        setModalOpen(false);

        setTitle("");
        setDescription("");
    };

    const deleteTask = (index) => {
        const currentTasks = [...tasks];
        // const index = currentTasks.findIndex((task) => task.id === id_ex);
        currentTasks.splice(index, 1);
        setTasks(currentTasks);
    };

    const changeTaskStatus = (index) => {
        const currentTasks = [...tasks];
        const taskTpUpdate = currentTasks.at(index);
        taskTpUpdate.done = !taskTpUpdate.done;
        currentTasks.splice(index, 1, taskTpUpdate);
        setTasks(currentTasks);
    }

    // Lista de tarefas
    return (
        <div className={"flex flex-col items-center justify-center h-screen bg-slate-950"}>
            <div className={"flex flex-col h-2/3 w-1/2"}>
                <div className={"flex justify-between items-center mb-2.5"}>
                    <h1 className={"text-slate-200 text-4xl"}>Todo App</h1>
                    <button
                        onClick={openModal}
                        className={"py-1 px-3 rounded-lg  border border-emerald-500 text-emerald-500 text-sm"}>+ Nova tarefa</button>
                </div>
                <div className={"flex flex-col divide-y divide-slate-700 flex-grow bg-slate-900 rounded-xl px-5 py-2.5"}>
                    {tasks.map((task, index) => {
                        return(
                            <div key={task.id}
                                 className={`${task.done ? "opacity-50": ""}flex items-center justify-between text-slate-200 text-sm py-2.5`}
                            >
                                <div className={"flex gap-6"}>
                                    <input type="checkbox" className={"scale-150"} onChange={changeTaskStatus(index)}/>
                                    <div className={"flex gap-6"}>
                                        <p className={"font-medium"}>{task.title}</p>
                                        <p className={"text-slate-400"}>{task.description}</p>
                                    </div>
                                </div>
                                <TrashIcon role={"button"} className={"scale-150 text-red-400"} onClick={() => deleteTask(index)}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-slate-900 p-6 rounded-xl">
                        <h2 className="text-xl mb-4 text-slate-200">Nova Tarefa</h2>
                        <input type="text"
                               className="text-sm border border-slate-700 mb-4 p-2 w-full rounded-lg bg-transparent text-slate-200 focus:outline-none focus:border-slate-600"
                               placeholder="Título"
                               value = {title}
                               onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            style={{height: 100}}
                            className="text-sm resize-none border border-slate-700 mb-4 p-2 w-full rounded-lg bg-transparent text-slate-200 focus:outline-none focus:border-slate-600"
                            placeholder="Descrição"
                            value = {description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end mt-4">
                            <button onClick={closeModal} className="text-sm py-1.5 px-3 rounded-lg border border-red-500 text-red-500">
                                Cancelar
                            </button>
                            <button onClick = {addNewTask} className="text-sm py-1.5 px-3 rounded-lg border border-emerald-500 text-emerald-500 ml-2">
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;