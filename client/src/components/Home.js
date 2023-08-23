import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home() {
  const [form, setForm] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = "https://to-do-2ik4.onrender.com";

  useEffect(() => {
    async function getTasks() {
      setLoading(true);
      const res = await axios.get(url);
      const data = res.data;
      setTasks(data);
      setLoading(false);
    }
    getTasks();
  }, [tasks.length]);

  return (
    <motion.div
      target="_blank"
      href="/"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      alt="no"
    >
      <div className="flex justify-center align-middle mt-12 ">
        <div className="w-[700px] shadow-md p-3 rounded-lg mb-12">
          <h1 className="text-3xl font-bold mb-3 ">Todo.</h1>
          <form
            onSubmit={async (e) => {
              if (form !== "") {
                e.preventDefault();
                setForm("");
                setLoading(true);
                e.target.reset();
                await axios.post(url, { content: form });
                const new_tasks = await axios.get(url);
                setTasks(new_tasks.data);
                setLoading(false);
              } else {
                e.preventDefault();
              }
            }}
            className="w-full"
          >
            <div className="">
              <input
                placeholder="Enter a task"
                className="w-5/6 rounded-l border p-2 focus:outline-none border-r-0"
                type="text"
                onChange={(e) => {
                  setForm(e.target.value);
                }}
              ></input>
              <button className="w-1/6 bg-blue-100 rounded-r p-[9px] font-medium">
                Add
              </button>
            </div>
          </form>
          {loading ? (
            <div className="flex p-4 rounded justify-center border mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-fidget-spinner"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#9e9e9e"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="animate-spin"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 16v.01" />
                <path d="M6 16v.01" />
                <path d="M12 5v.01" />
                <path d="M12 12v.01" />
                <path d="M12 1a4 4 0 0 1 2.001 7.464l.001 .072a3.998 3.998 0 0 1 1.987 3.758l.22 .128a3.978 3.978 0 0 1 1.591 -.417l.2 -.005a4 4 0 1 1 -3.994 3.77l-.28 -.16c-.522 .25 -1.108 .39 -1.726 .39c-.619 0 -1.205 -.14 -1.728 -.391l-.279 .16l.007 .231a4 4 0 1 1 -2.212 -3.579l.222 -.129a3.998 3.998 0 0 1 1.988 -3.756l.002 -.071a4 4 0 0 1 -1.995 -3.265l-.005 -.2a4 4 0 0 1 4 -4z" />
              </svg>
            </div>
          ) : tasks.length === 0 ? (
            <motion.div
              target="_blank"
              href="/"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              alt="no"
            >
              <div className="flex justify-center p-6 bg-blue-100 rounded-lg font-medium mt-3">
                No tasks
              </div>
            </motion.div>
          ) : (
            tasks.map((e, i) => (
              <motion.div
                target="_blank"
                href="/"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                alt="no"
              >
                <div className="flex p-3 rounded border mt-3">
                  <p
                    contenteditable="false"
                    className="flex-1 overflow-scroll text-lg focus:outline-none"
                    id="content"
                  >
                    {tasks[i].content}
                  </p>
                  <div className="ml-4">
                    <button
                      className="p-1 border rounded shadow-sm ml-4 hover:bg-blue-100 ease-in-out transition"
                      onClick={async (e) => {
                        e.preventDefault();
                        
                        document
                          .getElementById("content")
                          .setAttribute("contenteditable", "true");
                        // await axios.put(url, {
                        //   _id: tasks[i]._id,
                        //   content: "content",
                        // });
                        // const new_tasks = await axios.get(url);
                        // setTasks(new_tasks.data);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-edit"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="#000000"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                        <path d="M16 5l3 3" />
                      </svg>
                    </button>
                    <button
                      className="p-1 border rounded shadow-sm ml-2 hover:bg-red-300 ease-in-out transition-all"
                      onClick={async (e) => {
                        e.preventDefault();
                        await axios.delete(url, {
                          data: { _id: tasks[i]._id },
                        });
                        const new_tasks = await axios.get(url);
                        setTasks(new_tasks.data);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-trash"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="#000000"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {/* {} */}
        </div>
      </div>
    </motion.div>
  );
}
