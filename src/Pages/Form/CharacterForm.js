import React, { useState, useEffect } from "react";
import { Button, Grid, NativeSelect, TextField } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import "./CharacterForm.css";
import { useHistory } from "react-router-dom";
import { types } from "../../actions/types";
import { useSelector, useDispatch } from "react-redux";

const initialState = {
  name: "",
  status: false,
  species: "",
  location: "",
  gender: "",
};
const CharacterForm = () => {
  const listCharacter = useSelector((state) => state);
  let history = useHistory();

  const dispatch = useDispatch();

  const [character, setCharacter] = useState({ ...initialState });
  const [toStore, setToStore] = useState(null);
  let id = new Date();

  const handleEditCharacter = (e) => {
    e.preventDefault();
    dispatch({
      type: types.SET_ADD,
      payload: {...listCharacter.store.info.filter((chrt) =>chrt.id !== character.id ),[character.id] : character} ,
    });
    history.push("/Home");

  };

  const handleCreateCharacter = (e) => {
    e.preventDefault();
    setToStore({ ...character, id: id });
  };

  useEffect(() => {
    if (toStore !== null) {
      let id = new Date();

      const dat = { ...listCharacter.store.info, [id]: toStore };

      dispatch({
        type: types.SET_ADD,
        payload: dat,
      });
      history.push("/Home");
    }
  }, [toStore]);

  const handleChange = (e) => {
    setCharacter({ ...character, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    if (history.location.search !== "") {
      const id = history.location.search;
      const unicCharacter = listCharacter.store.info.filter(
        (chrt) => `?id=${chrt.id}` === id
      );
  
      setCharacter( unicCharacter[0] );
    }
  }, [history]);

  return (
    <form onSubmit={(e) => handleCreateCharacter(e)} className="character_body">
      <Paper elevation={3}>
        <Grid className="form_container">
          <div>
            <h2>Crea tu propio personaje de Rick y Moty</h2>
            <Grid icon className="form_imput">
              <TextField
                onChange={handleChange}
                margin="dense"
                id="name"
                label="Nombre"
                value={character.name}
                fullWidth
              />
            </Grid>

            <Grid icon className="form_imput">
              <NativeSelect
                onChange={handleChange}
                fullWidth
                value={character.status}
                id="status"
                name="age"
                inputProps={{ "aria-label": "age" }}
              >
                <option value="">None</option>

                <option value="Alive">Vivo</option>
                <option value="Dead">Muerto</option>
              </NativeSelect>
            </Grid>

            <Grid icon className="form_imput">
              <TextField
                margin="dense"
                value={character.species}
                onChange={handleChange}
                id="species"
                label="Que especie es?"
                fullWidth
              />
            </Grid>

            <Grid icon className="form_imput">
              <TextField
                margin="dense"
                value={character.gender}
                onChange={handleChange}
                id="gender"
                label="sexo?"
                fullWidth
              />
            </Grid>
            <Grid icon className="form_imput">
              <TextField
                margin="dense"
                value={character?.location.name}
                onChange={(e) =>
                  setCharacter({
                    ...character,
                    [e.target.id]: { name: e.target.value },
                  })
                }
                id="location"
                label="Se encuentra en :"
                fullWidth
              />
            </Grid>
          </div>
        </Grid>
        <div className="form_actions">
          <Button
            onClick={(e) =>
              history.location.search === ""
                ? handleCreateCharacter(e)
                : handleEditCharacter(e)
            }
            fullWidth
          >
            {history.location.search === "" ? "Agregar" : "Editar"}
          </Button>
          <Button onClick={() => history.push("/Home")} fullWidth>
            Cancelar
          </Button>
        </div>
      </Paper>
    </form>
  );
};

export default CharacterForm;
