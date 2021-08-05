import { useEffect } from "react";
import { useGet } from "../hooks/useGet";
import { types } from "../actions/types";
import { useDispatch } from "react-redux";

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import CharacterForm from "../Pages/Form/CharacterForm";

const Routes = () => {
  const [characters] = useGet("character");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: types.SET_ADD,
      payload: characters.results,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters]);
  return (
    <>
      <div className="app_container">
        <Router>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Form" component={CharacterForm} />
          <Route exact path="/Form/:id" component={CharacterForm} />
          <Redirect to="/Home" />
        </Router>
      </div>
    </>
  );
};

export default Routes;
