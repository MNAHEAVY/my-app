import React, { useState } from "react";
import "./Terms.css";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Terms() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Stack alignItems="center" p={2}>
        <Box width={{ xs: "100%", md: "50%" }}>
          <div id="centering">
            <Typography variant="h4" color="gray" fontWeight={"bold"}>
              IPHONE CASE OBERA
            </Typography>
            <Typography variant="h6" color="gray" fontWeight={"bold"}>
              Terminos y condiciones.
            </Typography>
          </div>

          <p className="subtitle">
            <strong>Ante cualquier duda consulta la lista de abajo</strong>
          </p>
          <div>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                sx={{
                  backgroundColor: "#543bc2",
                  color: "white",
                }}
              >
                <Typography fontWeight={"bold"}>
                  Términos y Condiciones
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Estos términos y condiciones y los anexos que explican los
                  servicios del Eccomerce IPHONECASEOBERA (de ahora en más:
                  “Términos y Condiciones”) regulan la relación entre
                  IPHONECASEOBERA y las personas que usan sus servicios
                  (“Personas Usuarias”). <br />
                  <br />
                  Las Personas Usuarias aceptan estos Términos y Condiciones
                  desde el momento en que se registran en el Sitio y usan el
                  Eccomerce IPHONECASEOBERA.
                  <br />
                  <br />
                  Cuando debamos hacer cambios importantes en nuestros
                  servicios, publicaremos las modificaciones con 10 días
                  corridos de anticipación para que las Personas Usuarias puedan
                  revisarlas y seguir usando el Eccomerce IPHONECASEOBERA. El
                  plazo será de 5 días corridos en caso de que tengamos que
                  actualizar las tarifas de nuestros servicios. En ningún caso
                  afectarán las operaciones que ya hayan finalizado.
                  <br />
                  Las Personas Usuarias que no tengan obligaciones pendientes
                  con IPHONECASEOBERA o con otras Personas Usuarias, podrán
                  finalizar la relación con IPHONECASEOBERA cancelando su
                  cuenta.
                  <br />
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                sx={{
                  backgroundColor: "#543bc2",
                  color: "white",
                }}
              >
                <Typography fontWeight={"bold"}>Capacidad</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Podrán usar nuestros servicios las personas mayores de edad
                  que tengan capacidad legal para contratar. Los menores de
                  edad, a partir de los 13 años, sólo podrán utilizar su cuenta
                  con autorización del representante legal, quien responderá por
                  todas las acciones y obligaciones que se deriven de la
                  utilización de esa cuenta y quien deberá velar por el uso
                  responsable y adecuado de ella en atención a la madurez del
                  menor de edad que autorice.
                  <br />
                  Quien use el Eccomerce IPHONECASEOBERA en representación de
                  una empresa deberá tener capacidad para contratar a nombre de
                  ella. Además, para poder usar la cuenta, la Persona Usuaria
                  debe encontrarse activa.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                aria-controls="panel3bh-content"
                id="panel3bh-header"
                sx={{
                  backgroundColor: "#543bc2",
                  color: "white",
                }}
              >
                <Typography fontWeight={"bold"}>Registro y Cuenta</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Quien quiera usar nuestros servicios, deberá completar el
                  formulario de registro con los datos que le sean requeridos.
                  Al completarlo, se compromete a hacerlo de manera exacta,
                  precisa y verdadera y a mantener sus datos siempre
                  actualizados. La Persona Usuaria será la única responsable de
                  la certeza de sus datos de registro. Sin perjuicio de la
                  información brindada en el formulario, podremos solicitar y/o
                  consultar información adicional para corroborar la identidad
                  de la Persona Usuaria.
                  <br /> La cuenta es personal, única e intransferible, es decir
                  que bajo ningún concepto se podrá vender o ceder a otra
                  persona. Se accede a ella con la clave personal de seguridad
                  que haya elegido y que deberá mantener bajo estricta
                  confidencialidad.
                  <br />
                  En cualquier caso, la Persona Usuaria será la única
                  responsable por las operaciones que se realicen en su cuenta.
                  En caso de detectar un uso no autorizado de su cuenta, deberá
                  notificar de forma inmediata y fehaciente a IPHONECASEOBERA.{" "}
                  <br />
                  Podremos rechazar una solicitud de registro o bien cancelar un
                  registro ya aceptado, sin que esto genere derecho a un
                  resarcimiento. No podrán registrarse nuevamente en el Sitio
                  las Personas Usuarias que hayan sido inhabilitadas
                  previamente. Tampoco podrán registrarse quienes estén
                  incluidos o relacionados a personas incluidas en listas
                  nacionales o internacionales de sanciones.
                  <br />
                  Además, en caso de detectar el uso de más de una cuenta,
                  podremos aplicar retenciones, débitos y/o cualquier otra
                  medida si consideramos que ese accionar puede perjudicar al
                  resto de las personas que usan el Sitio, más allá de las
                  sanciones que pudieran corresponder.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                aria-controls="panel4bh-content"
                id="panel4bh-header"
                sx={{
                  backgroundColor: "#543bc2",
                  color: "white",
                }}
              >
                <Typography fontWeight={"bold"}>Privacidad de datos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  En IPHONECASEOBERA hacemos un uso responsable de la
                  información personal, protegiendo la privacidad de las
                  Personas Usuarias que nos confiaron sus datos y tomando las
                  medidas necesarias para garantizar la seguridad en nuestro
                  Eccomerce IPHONECASEOBERA.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion //5
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                aria-controls="panel5bh-content"
                id="panel5bh-header"
                sx={{
                  backgroundColor: "#543bc2",
                  color: "white",
                }}
              >
                <Typography fontWeight={"bold"}>Sanciones</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  En caso que la Persona Usuaria incumpliera una ley o los
                  Términos y Condiciones, podremos advertir, suspender,
                  restringir o inhabilitar temporal o definitivamente su cuenta,
                  sin perjuicio de otras sanciones que se establezcan en las
                  reglas de uso particulares de los servicios de
                  IPHONECASEOBERA.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                aria-controls="panel6bh-content"
                id="panel6bh-header"
                sx={{
                  backgroundColor: "#543bc2",
                  color: "white",
                }}
              >
                <Typography fontWeight={"bold"}>Responsabilidad</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  IPHONECASEOBERA será responsable por cualquier defecto en la
                  prestación de su servicio, en la medida en que le sea
                  imputable y con el alcance previsto en las leyes vigentes.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel7"}
              onChange={handleChange("panel7")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                aria-controls="panel7bh-content"
                id="panel7bh-header"
                sx={{
                  backgroundColor: "#543bc2",
                  color: "white",
                }}
              >
                <Typography fontWeight={"bold"}>Tarifas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  IPHONECASEOBERA podrá cobrar por sus servicios y la Persona
                  Usuaria se compromete a pagarlos a tiempo.
                  <br />
                  <br />
                  Podremos modificar o eliminar las tarifas en cualquier momento
                  con el debido preaviso establecido en la cláusula 2 de estos
                  Términos y Condiciones. De la misma manera, podremos modificar
                  las tarifas temporalmente por promociones en favor de las
                  Personas Usuarias.
                  <br />
                  <br />
                  La Persona Usuaria autoriza a IPHONECASEOBERA a retener y/o
                  debitar los fondos existentes y/o futuros de su cuenta de
                  Mercado Pago y/o de las cuentas bancarias que haya registrado
                  en ella, para saldar las tarifas impagas o cualquier otra
                  deuda que pudiera tener.
                  <br />
                  <br />
                  Para conocer el detalle de las tarifas de cada servicio, las
                  Personas Usuarias deberán consultar los términos y condiciones
                  correspondientes.
                  <br />
                  <br />
                  En todos los casos se emitirá la factura de conformidad con
                  los datos fiscales que las personas tengan cargados en su
                  cuenta.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel8"}
              onChange={handleChange("panel8")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                aria-controls="panel8bh-content"
                id="panel8bh-header"
                sx={{
                  backgroundColor: "#543bc2",
                  color: "white",
                }}
              >
                <Typography fontWeight={"bold"}>
                  Propiedad Intelectual
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  IPHONECASEOBERA y/o sus sociedades relacionadas son
                  propietarias de todos los derechos de propiedad intelectual
                  sobre sus sitios, todo su contenido, servicios, productos,
                  marcas, nombres comerciales, logos, diseños, imágenes, frases
                  publicitarias, derechos de autor, dominios, programas de
                  computación, códigos, desarrollos, software, bases de datos,
                  información, tecnología, patentes y modelos de utilidad,
                  diseños y modelos industriales, secretos comerciales, entre
                  otros (“Propiedad Intelectual”) y se encuentran protegidos por
                  leyes nacionales e internacionales.
                  <br />
                  Aunque IPHONECASEOBERA otorga permiso para usar sus productos
                  y servicios conforme a lo previsto en los Términos y
                  Condiciones, esto no implica una autorización para usar su
                  Propiedad Intelectual, excepto consentimiento previo y expreso
                  de IPHONECASEOBERA y/o sus sociedades vinculadas.
                  <br />
                  Está prohibido usar nuestros productos o servicios para fines
                  ilegales, realizar cualquier tipo de ingeniería inversa u
                  obras derivadas, utilizar herramientas de búsqueda o de
                  extracción de datos y contenidos de nuestra plataforma para su
                  reutilización y/o crear bases de datos propias que incluyan en
                  todo o en parte nuestro contenido sin nuestra expresa
                  autorización. Está también prohibido el uso indebido, sin
                  autorización y/o contrario a la normativa vigente y/o que
                  genere confusión o implique uso denigratorio y/o que le cause
                  perjuicio, daños o pérdidas a IPHONECASEOBERA y/o a sus
                  sociedades relacionadas. La utilización de los productos y
                  servicios de IPHONECASEOBERA tampoco implica la autorización
                  para usar propiedad intelectual de terceros que pueda estar
                  involucrada, cuyo uso quedará bajo exclusiva responsabilidad
                  del usuario. En caso que una Persona Usuaria infrinja la
                  Propiedad Intelectual de IPHONECASEOBERA o de terceros,
                  IPHONECASEOBERA podrá, sancionar al usuario conforme a lo
                  previsto en estos Términos y Condiciones y ejercer las
                  acciones extrajudiciales y/o judiciales correspondientes.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion //9
              expanded={expanded === "panel9"}
              onChange={handleChange("panel9")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                aria-controls="panel9bh-content"
                id="panel9bh-header"
                sx={{
                  backgroundColor: "#543bc2",
                  color: "white",
                }}
              >
                <Typography fontWeight={"bold"}>
                  Jurisdicción y Ley Aplicable
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Estos Términos y Condiciones se rigen por la ley argentina.
                  Toda controversia derivada de su aplicación, interpretación,
                  ejecución o validez será resuelta por los tribunales
                  nacionales ordinarios competentes, con asiento en la Ciudad de
                  Buenos Aires, salvo disposición específica de normas de orden
                  público, como por ejemplo, legislación relativa al Consumidor.
                  Para todos los efectos relacionados con estos Términos y
                  Condiciones y con el uso del sitio, IPHONECASEOBERA con CUIT
                  23-371165479 establece como domicilio Sarratea 371, Ciudad de
                  Obera, Misiones, Argentina.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </Box>
      </Stack>
      <br />
      <br />
    </div>
  );
}
