import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Popup from "./Popup";

export default function Home() {
  const url = "https://to-do-2ik4.onrender.com";
  const [form, setForm] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState("0");
  const [errMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getTasks() {
      // setLoading(true);
      const res = await axios.get(url);
      const data = res.data;
      setTasks(data);
      // setLoading(false);
    }
    getTasks();
  }, [tasks.length]);

  useEffect(() => {
    setTimeout(() => {
      setVisible("0");
    }, 4000);
  });

  return (
    <>
    
      <Popup err={errMsg} vis={visible}/>

      <div className="flex justify-center align-middle dark:text-text">
        <div className="w-[700px] shadow-md p-3 rounded-lg mb-12 dark:border-type dark:border-2 mt-16">
          <h1 className="text-3xl font-bold mb-3 dark:text-todo">Todo.</h1>
          <form
            type="submit"
            onSubmit={async (e) => {
              if (form !== "") {
                e.preventDefault();
                setLoading(true);
                setForm("");
                await axios.post(url, { content: form });
                const new_tasks = await axios.get(url);
                setTasks(new_tasks.data);
                setEditId("");
                setLoading(false);
              } else {
                e.preventDefault();
                setErrorMsg("Enter a task.")
                setVisible("1")
              }
            }}
            className="w-full"
          >
            <div className="">
              <input
                placeholder="Enter a task"
                className="w-5/6 rounded-l border dark:border-type p-2 focus:outline-none border-r-0 dark:text-text dark:bg-type"
                type="text"
                value={form}
                onChange={(e) => {
                  setForm(e.target.value);
                }}
              ></input>
              <button type="submit" className="w-1/6 bg-primary rounded-r p-[9px] font-medium dark:bg-type dark:border-l-[#010203] dark:border-l-2">
                Add
              </button>
            </div>
          </form>
          {loading ? (
            <div className="flex p-4 rounded justify-center border mt-3 dark:border-type">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                // stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-spin dark:stroke-text"
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
              <div className="flex justify-center p-6 bg-primary rounded-lg font-medium mt-3 dark:bg-type">
                No tasks
              </div>
            </motion.div>
          ) : (
            tasks.map((item, i) => (
              <motion.div
                target="_blank"
                href="/"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                alt="no"
              >
                <div className="flex break-words p-3 rounded border mt-3 dark:border-type">
                  {editId === item._id ? (
                    <textarea
                      type="text"
                      value={editText}
                      onChange={(e) => {
                        setEditText(e.target.value);
                      }}
                      className="flex-1 text-lg bg-primary rounded p-2 resize-none min-h-[120px] whitespace-pre dark:bg-type dark:outline-none dark:outline-type"
                    />
                  ) : (
                    <p
                      className="flex-1 overflow-scroll text-lg whitespace-pre"
                      id={i}
                    >
                      {item.content}
                    </p>
                  )}
                  {editId === item._id ? (
                    <div className="ml-4 flex">
                      <div className="">
                        {/* Tick */}
                        <button
                          className="p-1 border rounded shadow-sm hover:bg-tick ease-in-out transition dark:border-type"
                          onClick={async (e) => {
                            e.preventDefault();
                            if (editText === "") {
                              setEditId("");
                              setErrorMsg("Tasks can't be empty.");
                              setVisible("1");
                            } else if (editText === item.content) {
                              setEditId("");
                            } else {
                              await axios.put(url, {
                                _id: item._id,
                                content: editText,
                              });
                              const new_tasks = await axios.get(url);
                              setTasks(new_tasks.data);
                              setEditId("");
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-check"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#7bc62d"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </button>
                        {/* Cancel */}
                        <button
                          className="p-1 border rounded shadow-sm ml-2 hover:bg-cancel ease-in-out transition-all dark:border-type"
                          onClick={async (e) => {
                            e.preventDefault();
                            setEditId("");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-x"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#ff2825"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="ml-4 flex">
                      <div className="">
                        {/* Edit */}
                        <button
                          className="p-1 border rounded shadow-sm hover:bg-primary hover:dark:bg-type ease-in-out transition-all dark:border-type"
                          onClick={async (e) => {
                            e.preventDefault();
                            setEditId(item._id);
                            setEditText(item.content);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-edit stroke-black dark:stroke-text"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            // stroke="#000000"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                            <path d="M16 5l3 3" />
                          </svg>
                        </button>
                        {/* Delete */}
                        <button
                          className="p-1 border rounded shadow-sm ml-2 hover:bg-delete ease-in-out transition-all dark:border-type"
                          onClick={async (e) => {
                            e.preventDefault();
                            await axios.delete(url, {
                              data: { _id: item._id },
                            });
                            setEditId("");
                            const new_tasks = await axios.get(url);
                            setTasks(new_tasks.data);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-trash stroke-black dark:stroke-text"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            // stroke="#000000"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
