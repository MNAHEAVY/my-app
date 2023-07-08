<div className="container-total-form">
  <div className="containerB">
    <h2>Agregar producto Nuevo</h2>
  </div>
  <div className="container-subtotal-form">
    <div className="container-left">
      <Form
        id="formCreate"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>*Nombre</Form.Label>
          <Form.Control
            type="text"
            value={inputForm.nombre}
            name="nombre"
            onChange={(e) => {
              handleChange(e);
            }}
            <button type="submit" class="centering btn btn-primary" style="margin: 56px;width: 150px;height: 89px;font-size: 24px;">Cargar</button>
            placeholder="ej. iPhone 13"
          />
          <Form.Text className="text-muted">
            Nombre completo del producto.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>*Marca</Form.Label>
          <Form.Control
            type="text"
            value={inputForm.marca}
            name="marca"
            onChange={(e) => handleChange(e)}
            placeholder="ej. Apple"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={inputForm.descripcion}
            name="descripcion"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
      </Form>
    </div>
  </div>
</div>;
