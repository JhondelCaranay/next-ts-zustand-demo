import { ImgTrash } from "@/assets";
import useTaskStore from "@/hooks/zustand/useStore";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

type Props = {
  title: string;
};
const Task = ({ title }: Props) => {
  const task = useTaskStore((s) => s.tasks.find((task) => task.title === title));
  const deleteTask = useTaskStore((s) => s.deleteTask);

  const [drag, setdrag] = useState("");

  if (!task) return null;

  return (
    <div
      className={`flex min-h-[5rem] w-[300px] cursor-move flex-col justify-between  rounded-md bg-white p-2 text-black active:border-sky-500`}
      draggable
      onDragStart={(e) => {
        setdrag(task.title);
      }}
    >
      <div>{task?.title}</div>
      <div className="flex justify-between">
        <div className="cursor-pointer" onDragStart={(e) => e.preventDefault()}>
          <Image
            src={ImgTrash}
            onClick={() =>
              deleteTask({
                title: task.title,
                state: task.state,
              })
            }
            alt="trash"
          />
        </div>
        <div className={classNames("rounded p-1 text-sm", task?.state)}>Planned</div>
      </div>
    </div>
  );
};
export default Task;
