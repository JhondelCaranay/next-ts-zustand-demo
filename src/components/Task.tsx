import { ImgTrash } from "@/assets";
import useTaskStore from "@/hooks/zustand/useStore";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

type Props = {
  title: string;
};
const Task = ({ title }: Props) => {
  // const [drag, setdrag] = useState<boolean>();

  const task = useTaskStore((s) => s.tasks.find((task) => task.title === title));
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const setDraggedTask = useTaskStore((s) => s.setDraggedTask);

  if (!task) return null;

  return (
    <div
      className={`flex w-[299px] cursor-move flex-col justify-between gap-1 overflow-hidden bg-white p-2 text-black`}
      draggable={true}
      onDragStart={(e) => {
        setDraggedTask(task);
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
