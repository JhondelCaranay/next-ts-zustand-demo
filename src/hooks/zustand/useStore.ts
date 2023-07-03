import { create } from "zustand";

export interface Task {
  title: string;
  state: "PLANNED" | "ONGOING" | "DONE";
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
}

const useTaskStore = create<TaskState>()((set) => ({
  tasks: [
    { title: "Task 1", state: "PLANNED" },
    { title: "Task 2", state: "ONGOING" },
    { title: "Task 3", state: "DONE" },
  ],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  deleteTask: (task) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.title !== task.title),
    })),
}));

export default useTaskStore;
