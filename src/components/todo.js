import React , {useState} from 'react'
import { FaTrash , FaCheckCircle } from "react-icons/fa";


const Todo = (props) => {
    const [editable, setEditable] = useState(false)
    const edit = (e) => {
      document.getElementsByName(e.currentTarget.id + "li")[0].contentEditable=true;
      document.getElementsByName(e.currentTarget.id + "li")[0].focus();
        setEditable(true);
    }
    const update = (e) => {
        setEditable(false);
        props.update(e.currentTarget.id,document.getElementsByName(e.currentTarget.id+'li')[0].innerText);
    }
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <input
                type="checkbox"
                name="complete"
                style={{ height: "25px", width: "25px" }}
                onChange={props.changestatus}
                id={props.data.id}
                checked={props.data.complete}
              />
            </td>
            <td style={{ width: "100%" }}>
              <li
                className="list-group-item p-2 m-1"
                name={props.data.id + "li"}
                onKeyDown={(e) => {
                  if (e.key === "Enter") update(e);
                }}
                id={props.data.id}
                value={props.data.task}
                onClick={edit}
                style={{
                  fontSize: "18px",
                  textDecorationLine: props.data.complete
                    ? "line-through"
                    : "none",
                }}
              >
                {props.data.task}
              </li>
            </td>
            {editable ? (
              <td className="button b1" id={props.data.id} onClick={update}>
                <FaCheckCircle size={42}></FaCheckCircle>
              </td>
            ) : (
              <td></td>
            )}
            <td>
              <button
                className="btn p-2 "
                id={props.data.id}
                onClick={props.deleteTask}
                style={{ borderRadius: "50px", float: "right" }}
              >
                <FaTrash size={26} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
}

export default Todo;
