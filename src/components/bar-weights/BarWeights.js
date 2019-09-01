import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  root: {
    flexGrow: 1
  },
  textField: {
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
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

const calculatePlateAmounts = (weight, barWeight) => {
  let totalweight = barWeight;
  let plates = {
    "25.0": 0,
    "20.0": 0,
    "15.0": 0,
    "10.0": 0,
    "5.0": 0,
    "2.5": 0,
    "1.25": 0,
    "1.0": 0,
    "0.5": 0
  };

  // If we have a .5 value we need to add the .25 on each side once.
  if (!Number.isInteger(weight)) {
    totalweight += 1.25 * 2;
    plates["1.25"] += 1;
  }
  // calculate how many of each plate.
  while (totalweight < weight) {
    for (let i = 0; i < weights.length; i++) {
      const wgt = Number(weights[i]) * 2;
      if (totalweight + wgt <= weight) {
        if (wgt / 2 === 1.25) continue; // quick fix for the 1.25 kg.
        totalweight += wgt;
        plates[weights[i]] += 1;
        break;
      }
    }
  }
  return plates;
};

export default function BarWeights() {
  const classes = useStyles();

  const [textField, setTextField] = useState();
  const [barWeight, setBarWeight] = useState(20);
  const [plateAmounts, setPlateAmounts] = useState({});

  return (
    <div className={classes.root}>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          className={classes.textField}
          id="standard-with-placeholder"
          label="Weight"
          placeholder="Example '50'"
          helperText="Please input full weight including bar"
          type="number"
          step={0.01}
          margin="normal"
          value={textField}
          onChange={e => {
            setTextField(e.target.value);

            const reachedValue = Number(e.target.value);
            if (isNaN(reachedValue) || reachedValue <= 20) {
              setPlateAmounts({});
              console.log("not a number");
              return;
            }
            const plates = calculatePlateAmounts(reachedValue, barWeight);
            setPlateAmounts(plates);
          }}
        />
        <TextField
          id="select-barweight"
          select
          label="Select Bar Weight"
          className={classes.textField}
          value={barWeight}
          onChange={e => {
            setBarWeight(e.target.value);
            setPlateAmounts(
              calculatePlateAmounts(Number(textField), e.target.value)
            );
          }}
          helperText="Please select the bar weight"
          margin="normal"
        >
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </TextField>
      </form>
      {Object.keys(plateAmounts).map(key => {
        if (plateAmounts[key] === 0) return null;
        return (
          <Typography variant="h3" component="h2">
            {plateAmounts[key] + " x " + key + " KG "}
          </Typography>
        );
      })}
    </div>
  );
}
