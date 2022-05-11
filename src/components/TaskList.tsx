import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // TODO: Remove quando for integrar com o banco de dados
  // Não é a melhor estratégia para gerar um id único,
  // mas queria resolver o desafio sem instalar nenhuma lib adicional.
  function getUniqueRandomId(size: number): number {
    let randomId = Math.floor(Math.random() * size);

    var found = true;
    while (found) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == randomId) {
          randomId = Math.floor(Math.random() * size);
          break;
        }
      }
      found = false;
    }
    console.log(randomId);
    return randomId;
  }

  function handleCreateNewTask() {
    if (newTaskTitle.trim().length > 0) {
      const id = getUniqueRandomId(10000);
      setTasks([...tasks, { id: id, title: newTaskTitle, isComplete: false }]);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    let tasksClone = [...tasks];
    tasksClone.map((task: Task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
    });

    setTasks(tasksClone);
  }

  function handleRemoveTask(id: number) {
    let tasksClone = tasks.filter((task: Task) => {
      return task.id != id;
    });

    setTasks(tasksClone);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
