import React from "react";
import { useStateContext } from "../context/StateContext";

function Form() {
  const { cartItems, totalPrice } = useStateContext();
  return (
    <div class="container_form">
      <form className="form">
        <div class="row">
          <h4>Dados Pessoais</h4>
          <div class="input-group input-group-icon">
            <input type="text" placeholder="Full Name" />
            <div class="input-icon">
              <i class="fa fa-user"></i>
            </div>
          </div>
          <h4>Dados de Morada</h4>
          <div class="input-group input-group-icon">
            <input type="address" placeholder="Morada" />
            <div class="input-icon">
              <i class="fa fa-envelope"></i>
            </div>
          </div>
          <div class="input-group input-group-icon">
            <input type="adress" placeholder="Complemento" />
            <div class="input-icon">
              <i class="fa fa-key"></i>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-half">
            <h4>Date of Birth</h4>
            <div class="input-group">
              <div class="col-third">
                <input type="text" placeholder="DD" />
              </div>
              <div class="col-third">
                <input type="text" placeholder="MM" />
              </div>
              <div class="col-third">
                <input type="text" placeholder="YYYY" />
              </div>
            </div>
          </div>
          <div class="col-half">
            <h4>Gender</h4>
            <div class="input-group">
              <input id="gender-male" type="radio" name="gender" value="male" />
              <label for="gender-male">Male</label>
              <input
                id="gender-female"
                type="radio"
                name="gender"
                value="female"
              />
              <label for="gender-female">Female</label>
            </div>
          </div>
        </div>
        <div class="row">
          <h4>Resumo da Compra</h4>
          <br />
          {cartItems.map((item) => (
            <>
              <p><b>{item.quantity} x</b> {item.name}</p>
            </>
          ))}
                  <br/>
        <h3 styles={{color: 'black'}}>Preço total: </h3> €{totalPrice}
        </div>
      </form>
    </div>
  );
}

export default Form;
