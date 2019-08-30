import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  textField: {
    marginBottom: theme.spacing(5)
  }
}));

const weights = [
  "25.0",
  "20.0",
  "15.0",
  "10.0",
  "5.0",
  "2.5",
  "1.25",
  "1.0",
  "0.5"
];

export default function DenseAppBar() {
  const classes = useStyles();

  const [textField, setTextField] = useState("");
  const [plateAmounts, setPlateAmounts] = useState({});

  return (
    <div className={classes.root}>
      <TextField
        className={classes.textField}
        id="standard-with-placeholder"
        label="Weight"
        placeholder="Example '50'"
        className={classes.textField}
        type="number"
        margin="normal"
        value={textField}
        onChange={e => {
          setTextField(e.target.value);
          // calculate the weights
          if (e.target.value <= 0) {
            return;
          }
          const reachedValue = e.target.value;
          let totalweight = 20;
          let plates = {
            "25": 0,
            "20": 0,
            "15": 0,
            "10": 0,
            "5": 0,
            "2.5": 0,
            "1.25": 0,
            "1.0": 0,
            "0.5": 0
          };
          while (totalweight < reachedValue) {
            if (totalweight + 25 * 2 <= reachedValue) {
              totalweight += 25 * 2;
              plates[25] += 1;
              continue;
            }
            if (totalweight + 20 * 2 <= reachedValue) {
              totalweight += 20 * 2;
              plates[20] += 1;
              continue;
            }
            if (totalweight + 15 * 2 <= reachedValue) {
              totalweight += 15 * 2;
              plates[15] += 1;
              continue;
            }
            if (totalweight + 10 * 2 <= reachedValue) {
              totalweight += 10 * 2;
              plates[10] += 1;
              continue;
            }
            if (totalweight + 5 * 2 <= reachedValue) {
              totalweight += 5 * 2;
              plates[5] += 1;
              continue;
            }
            if (totalweight + 2.5 * 2 <= reachedValue) {
              totalweight += 2.5 * 2;
              plates["2.5"] += 1;
              continue;
            }
            if (totalweight + 1.25 * 2 <= reachedValue) {
              totalweight += 1.25 * 2;
              plates["1.25"] += 1;
              continue;
            }
            if (totalweight + 1 * 2 <= reachedValue) {
              totalweight += 1 * 2;
              plates["1.0"] += 1;
              continue;
            }
            if (totalweight + 0.5 * 2 <= reachedValue) {
              totalweight += 0.5 * 2;
              plates["0.5"] += 1;
              continue;
            }
          }

          console.log(plates);
          setPlateAmounts(plates);
        }}
      />
      {Object.keys(plateAmounts).map(key => {
        if (plateAmounts[key] == 0) return null;
        return (
          <Typography variant="h3" component="h2">
            {plateAmounts[key] + " x " + key + " KG "}
          </Typography>
        );
      })}
    </div>
  );
}
