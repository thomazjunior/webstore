import React, { useState } from "react";
import { useStateContext } from "../context/StateContext";
import { send } from "emailjs-com";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router'


function Form() {
  const router = useRouter()
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (!toSend.from_name || !toSend.email || !toSend.cellphone || !toSend.place) {
      toast.error("Por favor preencha todos os campos!");
      return;
    }
    send("universodosvinhos", "template_fcn1uek", toSend, "8zAM9MKMi4O0nixQL")
      .then((response) => {
        toast.success("Pedido de encomenda efetuada com sucesso! Entraremos em contato em breve...");
        handleClearCart();
        setTimeout(() => {router.push("/")}, 3000)
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  const handleClearCart = () => {
    clearCart();
  }
  

  const { cartItems, totalPrice, clearCart } = useStateContext();

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  const [toSend, setToSend] = useState({
    from_name: "",
    to_name: "Universo dos Vinhos",
    email: "",
    cellphone: "",
    place: "",
    message: `Resumo da Encomenda:  ${cartItems.map(
      (item) => "\n" + item.quantity + " x " + item.name
    )} + "\n Preço total: ${totalPrice.toFixed(2)}`,
  });

  return (
    <div class="container_form">
      <form className="form" onSubmit={onSubmit}>
        <div class="row">
          <h4>Nome</h4>
          <div class="input-group input-group-icon">
            <input
              type="text"
              name="from_name"
              placeholder="Digite o Nome"
              value={toSend.from_name}
              onChange={handleChange}
            />
            <div class="input-icon">
              <i class="fa fa-user"></i>
            </div>
          </div>
          <h4>Telemóvel</h4>
          <div class="input-group input-group-icon">
            <input
              type="number"
              name="cellphone"
              placeholder="Digite o Telemóvel"
              value={toSend.cellphone}
              onChange={handleChange}
            />
            <div class="input-icon">
              <i class="fa fa-user"></i>
            </div>
          </div>
          <h4>Email</h4>
          <div class="input-group input-group-icon">
            <input
              name="email"
              type="email"
              placeholder="Digite o Email"
              onChange={handleChange}
              value={toSend.email}
            />
            <div class="input-icon">
              <i class="fa fa-key"></i>
            </div>
          </div>
          <h4>Dados de Morada</h4>
          <div class="input-group input-group-icon">
            <input
              type="text"
              name="place"
              placeholder="Localidade"
              value={toSend.place}
              onChange={handleChange}
            />
            <div class="input-icon">
              <i class="fa fa-envelope"></i>
            </div>
          </div>
        </div>
        <div class="row">
          <h4>Resumo da Encomenda</h4>
          <br />
          {cartItems.map((item) => (
            <>
              <p>
                <b>{item.quantity} x</b> {item.name}
              </p>
            </>
          ))}
          <br />
          <h3 styles={{ color: "black" }}>Preço total: </h3> €
          {totalPrice.toFixed(2)}
        </div>
        <button
          style={{
            padding: "3px 0px",
            border: "1px solid #f02d34",
            margin: "10px 1px 10px",
            fontSize: "18px",
            fontWeight: "500",
            backgroundColor: "white",
            color: "#D7604D",
            cursor: "pointer",
            width: "200px",
            transform: "scale(1, 1)",
            transition: "transform 0.5s ease",
          }}
          type="submit"
        >
          Finalizar Compra
        </button>
      </form>
    </div>
  );
}

export default Form;
