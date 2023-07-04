import { create } from "zustand";

export interface Task {
  title: string;
  state: "PLANNED" | "ONGOING" | "DONE";
  updatedAt?: Date;
}

interface TaskState {
  tasks: Task[];
  draggedTask: Task | null;
  addTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
  setDraggedTask: (task: Task | null) => void;
  moveTask: (task: Task, state: "PLANNED" | "ONGOING" | "DONE") => void;
}

const useTaskStore = create<TaskState>()((set) => ({
  tasks: [{ title: "Task 1", state: "PLANNED", updatedAt: new Date() }],
  draggedTask: null,
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, updatedAt: new Date() }],
    })),
  deleteTask: (task) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.title !== task.title),
    })),
  setDraggedTask: (task) =>
    set((state) => ({
      draggedTask: task,
    })),
  moveTask: (task, state) => {
    set((s) => ({
      tasks: s.tasks.map((t) =>
        t.title === task.title ? { ...t, state, updatedAt: new Date() } : t
      ),
    }));
  },
}));

export default useTaskStore;
