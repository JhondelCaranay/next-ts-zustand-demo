import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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

const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
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
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useTaskStore;
