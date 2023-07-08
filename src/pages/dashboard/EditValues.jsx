import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValues, putVal } from "../../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProdEdit() {
  const dispatch = useDispatch();
  const valEd = useSelector((state) => state.values);
  const { id } = useParams();
  const thisVal = valEd;
  console.log(thisVal);

  useEffect(() => {
    dispatch(getValues());
  }, [dispatch]);

  const [input, setInput] = useState({
    dolarBlue: thisVal.dolarBlue,
    dolarOficial: thisVal.dolarOficial,
    packaginPremium: thisVal.packaginPremium,
    packagingSimple: thisVal.packagingSimple,
    costoGeneral: thisVal.costoGeneral,
    flete: thisVal.flete,
    profit: thisVal.profit,
    dolarProvedor: thisVal.dolarProvedor,
    fleteLocal: thisVal.fleteLocal,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(putVal(id, input));
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">SUPER ADMIN VALUES EDITION V-3.1</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">Editor de Valores</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label>Blue</label>
              <input
                className="form-control"
                type="number"
                value={input.dolarBlue}
                name="dolarBlue"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <label>Oficial</label>
              <input
                className="form-control"
                type="number"
                value={input.dolarOficial}
                name="dolarOficial"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className="form-group">
              <label>Premiun Packaging</label>
              <input
                className="form-control"
                type="number"
                value={input.packaginPremium}
                name="packaginPremium"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className="form-group">
              <label>Simple Packaging</label>
              <input
                className="form-control"
                type="number"
                value={input.packagingSimple}
                name="packagingSimple"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className="form-group">
              <label>Costos</label>
              <input
                className="form-control"
                type="number"
                value={input.costoGeneral}
                name="costoGeneral"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className="form-group">
              <label>Flete</label>
              <input
                className="form-control"
                type="number"
                value={input.flete}
                name="flete"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <label>Profit</label>
              <input
                className="form-control"
                type="number"
                value={input.profit}
                name="profit"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <label>Dolar Proveedor</label>
              <input
                className="form-control"
                type="number"
                value={input.dolarProvedor}
                name="dolarProvedor"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <label>Flete Local</label>
              <input
                className="form-control"
                type="number"
                value={input.fleteLocal}
                name="fleteLocal"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <br />
            <div id="centeringSideB">
              <button
                className="btn btn-outline-success me-2"
                type="submit"
                onClick={handleSubmit}
              >
                Modificar
              </button>
              <button className="btn btn-outline-success me-2">
                <Link to={"/admin"}>Cancelar</Link>
              </button>
            </div>
          </form>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
