import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Todo from "./todo";

const localstorage = () => {
  const list = localStorage.getItem("data");
  if (list) return JSON.parse(list);
  return [];
};

const TodoList = () => {
  const [task, setTask] = useState("");
  const [index, setIndex] = useState(localStorage.getItem("index")?localStorage.getItem("index"):1);
  const [data, setData] = useState(localstorage());

  
  const deleteData = (e) => {
    setData(
      data.filter((curr) => {
        if (curr.id == e.currentTarget.id) {
          return "";
        } else {
          return curr;
        }
      })
    );
  };
  const update = (e,y) =>{
    setData(
      data.filter((curr) => {
        if (curr.id === e) {
          curr.task = y;
          return curr;
        } else {
          return curr;
        }
      })
    );
  }
  const changestatus = (e) => {
    setData(
      data.filter((curr) => {
        if (curr.id == e.currentTarget.id) {
          curr.complete = !curr.complete;
          return curr;
        } else {
          return curr;
        }
      })
    );
  };
  const addTask = async () => {
    if (task) {
      // console.log(task);
      // try{
      //     console.log("hh");
      //     const url =`http://localhost:8000/notes?note=${task}&title`;
      //     const response = await fetch(url,{
      //         method: "POST"
      //     });
      //     const resjson = await response.json();
      //     console.log(resjson);
      // }
      // catch (e)
      // {
      //     console.log(e);
      // }

      setData([{ id: index*1, task: task, complete: "" }, ...data]);
      setTask("");
      setIndex(index * 1 + 1);
    } else {
      alert("Enter the task");
    }
  };
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("index", index);
    return '';
  }, [index,data]);

  return (
    <div
      className="card col-sm-10 col-md-8 container-fluid align-center bg-light shadow-lg my-5 p-0"
      style={{ borderRadius: "25px" }}
    >
      <h2
        className="text-center bg-info m-0 p-3"
        style={{ borderRadius: "25px 25px 0px 0px" }}
      >
        To-Do List
      </h2>
      <div className="input-group justify-content-center my-5">
        <input
          type="text"
          className="field-input col-7"
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter') 
            addTask();
          }}
          value={task}
          style={{ borderStyle: "hidden", borderRadius: "25px" }}
          placeholder="Add Task"
        />
        <button
          className="btn btn1 p-2 mx-3"
          onClick={addTask}
          style={{ borderRadius: "50px" }}
        >
          <FaPlus size={50} />
        </button>
      </div>
      <hr />
      <h4 className="text-center">Pending Tasks</h4>
      <ul
        className="list-group list-group-flush m-5"
        style={{ listStyleType: "none" }}
      >
        {data.map((curr, i) => {
          if (curr.complete === false || curr.complete === ""){
            return (
              <Todo
                key={curr.id}
                changestatus={changestatus}
                data={curr}
                deleteTask={deleteData}
                update={update}
              />
            );
          }
          return "";
        })}
      </ul>
      <h4 className="text-center">Completed Tasks</h4>
      <ul
        className="list-group list-group-flush m-5"
        style={{ listStyleType: "none" }}
      >
        {data.map((curr, i) => {
          if (curr.complete === true)
          {
            return (
              <Todo
                key={curr.id}
                changestatus={changestatus}
                data={curr}
                deleteTask={deleteData}
                update={update}
              />
            );
          }
          return "";
        })}
      </ul>
    </div>
  );
};

export default TodoList;
