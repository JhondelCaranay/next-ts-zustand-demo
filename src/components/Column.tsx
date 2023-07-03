import Task from "./Task";
import { shallow } from "zustand/shallow";
import useTaskStore from "@/hooks/zustand/useStore";
import { useState } from "react";

type Props = {
  state: "PLANNED" | "ONGOING" | "DONE";
};
const Column = ({ state }: Props) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const tasks = useTaskStore((s) => s.tasks.filter((task) => task.state === state), shallow);

  // const filteredTask = useMemo(() => {
  //   return task.filter((task) => task.state === state);
  // }, [task, state]);

  const addTask = useTaskStore((s) => s.addTask);

  return (
    //
    <div
      className="min-h-[20rem] max-w-[20rem]  basis-96 space-y-2 rounded bg-gray-800 p-2 text-white"
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between">
        <p>{state}</p>
        <button
          className="h-fit cursor-pointer rounded bg-white p-1 text-black hover:bg-gray-400"
          onClick={() => setOpen(true)}
        >
          Add
        </button>
      </div>

      <div className="flex w-full flex-col items-center gap-1">
        {tasks.map((task) => (
          <Task title={task.title} key={task.title} />
        ))}
      </div>

      {open && (
        <div className="absolute inset-0 bg-slate-900/70">
          <div className="absolute left-1/2 top-1/2 z-10 flex h-20 w-96 -translate-x-1/2 -translate-y-1/2 rounded border bg-white p-4 shadow">
            <div className="flex w-full items-center justify-between gap-1">
              <input
                className="w-full rounded border p-2 text-black"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <button
                className="h-fit cursor-pointer rounded border bg-white p-2 text-black hover:bg-gray-400"
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
