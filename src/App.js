import "./App.css";
import CustomAppBar from "./components/Layout/CustomAppBar";
import TodoList from "./components/Todo/TodoList";



function App() {
  return (
    <div className="App">
      <CustomAppBar />
      <TodoList />     
    </div>
  );
}

export default App;
