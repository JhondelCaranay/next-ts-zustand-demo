import Task from "./Task";
import { shallow } from "zustand/shallow";
import useTaskStore from "@/hooks/zustand/useStore";
import { useMemo, useState } from "react";

type Props = {
  state: "PLANNED" | "ONGOING" | "DONE";
};
const Column = ({ state }: Props) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useTaskStore((s) => s.tasks.filter((task) => task.state === state), shallow);

  // filter by updatedAt desc
  const filterTasks = useMemo(() => {
    return tasks.sort((a, b) => {
      return new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime();
    });
  }, [tasks]);

  const addTask = useTaskStore((s) => s.addTask);

  const setDraggedTask = useTaskStore((s) => s.setDraggedTask);
  const draggedTask = useTaskStore((s) => s.draggedTask);
  const moveTask = useTaskStore((s) => s.moveTask);

  return (
    //
    <div
      className={`h-[90vh] max-h-[90vh] basis-80 space-y-2 overflow-y-scroll rounded border-gray-800 bg-gray-800 p-2 text-white border-4${
        drop ? " border-dashed border-green-500" : ""
      }`}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault(); // prevent default to allow drop
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={(e) => {
        if (!draggedTask) return;
        // console.log(draggedTask);
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className="sticky top-0 flex items-center justify-between  bg-gray-800 ">
        <p>{state}</p>
        <button
          className="h-fit cursor-pointer rounded bg-white p-1 text-black hover:bg-gray-400"
          onClick={() => setOpen(true)}
        >
          Add
        </button>
      </div>

      <div className="flex flex-col items-center gap-1">
        {filterTasks.map((task) => (
          <Task title={task.title} key={task.title} />
        ))}
      </div>

      {open && (
        <div className="absolute inset-0 bg-slate-900/70">
          <div className="absolute left-1/2 top-1/2 z-10 flex h-20 w-96 -translate-x-1/2 -translate-y-1/2 rounded border bg-white p-4 shadow">
            <div className="flex w-full items-center justify-between gap-1">
              <input
                className="w-full rounded border border-black p-2 text-black outline-none "
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <button
                className="h-fit cursor-pointer rounded border border-black bg-white p-2 text-black hover:bg-gray-400 active:bg-sky-300 "
                onClick={() => {
                  addTask({ title: text, state });
                  setText("");
                  setOpen(false);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Column;
