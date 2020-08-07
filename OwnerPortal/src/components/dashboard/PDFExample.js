import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PDFExample = (props) => {
  function print(quality = 1) {
    const filename = "Doc.pdf";

    html2canvas(document.querySelector("#root"), { scale: quality }).then(
      (canvas) => {
        let pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
        pdf.save(filename);
      }
    );
  }

  return (
    <div>
      <button onClick={() => print()}>Gen PDF</button>
    </div>
  );
};

PDFExample.propTypes = {};

export default PDFExample;
