import React, { useEffect, useState } from "react";
import axios from "axios";
import Demo from "./RespAppBar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
//import GetImage from '../GetImage';
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ClassNames } from "@emotion/react";
import styled from "@emotion/styled";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const useStyle = styled({
  root: {
    marginTop: 20,
  },
  loader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    marginBottom: "1rem",
    padding: "13px",
  },
  filters: {
    padding: "0 1.5rem",
  },
  priceRangeInputs: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const AdminSeeAcounts = () => {
  const vamsi = useParams();
  const nav = useNavigate();
  const clickHandler = () => {
    let path = `/AdminUpdateAcount/${vamsi._id}`;
    nav(path);
  };
  const clickHandler1 = () => {
    let path = "/AdminDeleteAcount";
    nav(path);
  };

  const classes = useStyle();
  const history = useNavigate();
  const location = useLocation();

  const params = location.search ? location.search : null;
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sliderMax, setSliderMax] = useState(1000);
  const [priceRange, setPriceRange] = useState([25, 75]);
  const [priceOrder, setPriceOrder] = useState("descending");

  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState("");

  const [datas, setdata] = useState([]);

  const [currency, setCurrency] = React.useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const upateUIValues = (uiValues) => {
    setSliderMax(uiValues.maxPrice);

    if (uiValues.filtering.fullname) {
      let priceFilter = uiValues.filtering.fullname;

      setPriceRange([Number(priceFilter.gte), Number(priceFilter.lte)]);
    }

    if (uiValues.sorting.fullname) {
      let priceSort = uiValues.sorting.fullname;
      setPriceOrder(priceSort);
    }
  };

  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      setLoading(true);

      try {
        let query;

        if (params && !filter) {
          query = params;
        } else {
          query = filter;
        }
        if (sorting) {
          if (query.length === 0) {
            query = `?sort=${sorting}`;
          } else {
            query = query + "&sort=" + sorting;
          }
        }

        const data = axios
          .get(`http://localhost:4000/allprofiles${query}`, {
            headers: {
              "x-token": localStorage.getItem("krishna"),
            },
          })
          .then((res) => setBootcamps(res.data.data));

        setLoading(false);
        upateUIValues(data.uiValues);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.log(error.response);
      }
    };

    fetchData();

    return () => cancel;
  }, [filter, params, sorting]);

  const handlePriceInputChange = (e, type) => {
    let newRange;

    if (type === "lower") {
      newRange = [...priceRange];
      newRange[0] = Number(e.target.value);

      setPriceRange(newRange);
    }

    if (type === "upper") {
      newRange = [...priceRange];
      newRange[1] = Number(e.target.value);

      setPriceRange(newRange);
    }
  };

  const onSliderCommitHandler = (e, newValue) => {
    buildRangeFilter(newValue);
  };

  const onTextfieldCommitHandler = () => {
    buildRangeFilter(priceRange);
  };

  const buildRangeFilter = (newValue) => {
    const urlFilter = `?fullname[gte]=${newValue[0]}&fullname[lte]=${newValue[1]}`;

    setFilter(urlFilter);

    history(urlFilter);
  };

  const handleSortChange = (e) => {
    setPriceOrder(e.target.value);

    if (e.target.value === "ascending") {
      setSorting("fullname");
    } else if (e.target.value === "descending") {
      setSorting("-fullname");
    }
  };

  {
    /* if(!localStorage.getItem('token')){
        return <Navigate to='/login'/>
    }
*/
  }

  return (
    <div>
      <Demo />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Sort By</Typography>

          <FormControl component="fieldset" className={classes.filters}>
            <InputLabel id="demo-simple-select-label">
              Filter the component
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Filter the name"
              onChange={handleSortChange}
            >
              <MenuItem
                value="descending"
                disabled={loading}
                label="Des: Highest - Lowest"
                onChange={handleChange}
              >
                Des: Highest - Lowest
              </MenuItem>

              <MenuItem
                value="ascending"
                disabled={loading}
                label="Asc: Lowest - Highest"
                onChange={handleChange}
              >
                Asc: Lowest - Highest
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Box>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress size="3rem" thickness={5} />
          </div>
        ) : bootcamps.length >= 1 ? (
          bootcamps.map((profile) => (
            <div>
              <Card sx={{ width: "100%" }}>
                <CardMedia>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar
                      sx={{ bgcolor: deepOrange[500], width: 177, height: 177 }}
                      alt={profile.fullname}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </CardMedia>

                {/*//component="img"
        //alt="green iguana"
        //height="140"
        //image={/*<GetImage/>*/}

                {/*<img src={<GetImage/>} alt="icon" />*/}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {profile.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.fullname}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Link to={`/AdminDeleteAcount/${profile._id}`} > delete </Link>
                      <Link to={`/AdminUpdateAcount/${profile._id}`} > update </Link>
                      <Link to={`/addProfile/${profile._id}`} > ChangeProfile </Link>*/}
                  <Button
                    onClick={() => {
                      let path = `/AdminDeleteAcount/${profile._id}`;
                      nav(path);
                    }}
                  >
                    delete
                  </Button>
                  <Button
                    onClick={() => {
                      let path = `/AdminUpdateAcount/${profile._id}`;
                      nav(path);
                    }}
                  >
                    update
                  </Button>
                  <Button
                    onClick={() => {
                      let path = `/addProfile/${profile._id}`;
                      nav(path);
                    }}
                  >
                    ChangeProfile
                  </Button>
                </CardActions>
              </Card>
              <br />
              <br />
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default AdminSeeAcounts;
