import { useEffect } from "react";
import { Stage } from "ngl";

export default function NglViewer({ pdbID, persp }) {
 const check = persp
  useEffect(() => {
    const stage = new Stage("viewport", {
      backgroundColor: "#F1FCEB",
      width: "610px",
      height: "541px",
    });

    stage
      .loadFile(`https://files.rcsb.org/download/${pdbID}.pdb`)
      .then(function (component) {
        component.removeAllRepresentations();

        component.addRepresentation(check);

        component.autoView();
        // console.log(component.structure.atomCount);
      });

    return () => {
      stage;
    };
  }, [pdbID, persp]);

  return <div id="viewport" style={{ width: "610px", height: "541px" }} />
}
