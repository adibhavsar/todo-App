import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState([]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
    setSubmit((prev)=>!prev)
    let arr = [];
    if(list.length === 0){
      arr[0]=input;
    }
    else{
      arr=[...list];
      arr.unshift(input);
    }
    setList([...arr]);
    localStorage.setItem("tasks", JSON.stringify(arr));
  };
  useEffect(() => {
    if(localStorage.getItem("tasks")) {
      let arr = JSON.parse(localStorage.getItem("tasks"));
      setList([...arr]);
    }
    else{
      setList([]);
    }
    if(localStorage.getItem("completedTasks")) {
      let arr1 = JSON.parse(localStorage.getItem("completedTasks"));
      setDone([...arr1]);
    }
    else{
      setDone([]);
    }
    
   
  }, [submit]);

  const handleDelete = (index) => {
    let delInp=list.filter((val,ind) =>{ return index !== ind});
    setList([...delInp]);
    localStorage.setItem("tasks",JSON.stringify(delInp));
  };
  const handleClear = () => {
    setSubmit((prev)=>!prev)
    localStorage.clear();
  };
  const handleDone = (index) => {
      console.log(list[index]);
      let arr1=[];
      if(done.length === 0){
        arr1[0] = list[index];

      }
      else{
        arr1=[...done];
        arr1.unshift(list[index]);
      }
      setDone([...arr1]);
      handleDelete(index);
      localStorage.setItem("completedTasks", JSON.stringify(arr1));
  };
  const handleRemove = (index1) => {
    let delInp1=done.filter((val1,indx) =>{ return index1 !== indx});
    setDone([...delInp1]);
    localStorage.setItem("completedTasks",JSON.stringify(delInp1));
  };
  return (
    <div className="App">
      <div className="Container">
      <h1 style={{textAlign:"center"}}><i>Add your tasks here!</i><button className="reset" onClick={handleClear}>Reset</button></h1>
         <h2>TO-DO App</h2>
         <form className="Form">
         <input placeholder='Write the task here.' type="text" value={input} onChange={(e) => setInput(e.target.value)} />
         <button className="off" onClick={handleSubmit}> Submit </button>
         </form>
         <ul className="todos">
         {
         list.map((val, index) => (
          <li className='singletodo'>
            <span className="Span" key={index}>{val}</span>
            <button className="finish" onClick={() => handleDone(index)}>Done</button>
            <button className="del" onClick={() => handleDelete(index)}>Delete</button>
          </li>
         ))}
        </ul>
        <ul className="complete">
          {
            done.map((val1, index1) => (
              <li className='okay'>
                <span className="wide" key={index1}><s>{val1}</s></span>
                <button className="del" onClick={() => handleRemove(index1)}>Delete</button>
                </li>
            ))
          }
        </ul>
       </div> 
     </div>
  );
}

export default App;
