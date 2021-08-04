import React, { useEffect, useStore } from "react";
import CharacterCrud from "./Components/CharacterCrud";
import { useGet } from "../../hooks/useGet";
import { types } from "../../actions/types";
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import { Button } from "@material-ui/core";
const Home = () => {
  const listCharacter = useSelector((state) => state);

  const dispatch = useDispatch();
  let history = useHistory();

  
  const hanldeDelete = (id)=> {
      console.log(id);
      console.log(listCharacter.store.info);
      const rows = listCharacter.store.info&&Object.values(listCharacter.store.info);
      console.log(rows);
      const dat =  rows.filter((chrt) => chrt.id !== id)
      console.log(dat);
      dispatch({
        type: types.SET_DELETE,
        payload: dat,
      });
  }

  const handleCreate = () => {    
    history.push("/Form");
  }
  
  return (
    <div className="home_container">

      <header className="home_header">
        <h1>Rick-App</h1>
      </header>
      <body className="home_body">
      <div className="form_actions">
          <Button onClick={handleCreate} className="home_button " fullWidth><AddIcon/></Button>
        </div>
        <CharacterCrud hanldeDelete={hanldeDelete} data={listCharacter.store.info} />
      </body>
    </div>
  );
};
export default Home;
