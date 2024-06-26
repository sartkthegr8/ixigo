import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import trainLogo from "../../../assests/images/train-booking.png";
import swapSVG from "../../../assests/svgs/swap.svg";
import irctcLogo from "../../../assests/images/irctc-logo.webp";
import guaranteeIMG1 from "../../../assests/images/train-guarantee-1.webp";
import guaranteeIMG2 from "../../../assests/images/train-guarantee-2.webp";
import guaranteeIMG3 from "../../../assests/images/train-guarantee-3.webp";
import guaranteeIMG4 from "../../../assests/images/train-guarantee-4.webp";
import { BiSolidError } from "react-icons/bi";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useTrainSearchContext } from "../../../Contexts/TrainSearchProvider";
import TrainStationInput from "./TrainStationInput";
import { TRAIN_STATIONS } from "../../../constants";
import "../../../styles/Flights.css";

const popperSX = {
  border: 0,
  py: 0.5,
  px: 1,
  fontSize: "14px",
  bgcolor: "rgba(255,0,0,0.1)",
  color: "#D50000",
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  mt: "0px",
  borderBottomRightRadius: "5px",
  borderBottomLeftRadius: "5px",
};
const guarantees = [
  { img: guaranteeIMG1, text: "₹0 Payment Gateway Fee on Payments via UPI" },
  {
    img: guaranteeIMG2,
    text: " MakeMyTrip Assured: Free Cancellation of Train Tickets",
  },
  {
    img: guaranteeIMG3,
    text: "Instant Refund on Indian Railway Reservation Cancellation",
  },
  { img: guaranteeIMG4, text: "24*7 Support for IRCTC Train Ticket Booking" },
];
export default function Trains() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorMesaage, setErrorMessage] = useState("");
  const fromRef = useRef();
  const toRef = useRef();
  const depDateRef = useRef();
  const navigate = useNavigate();
  const {
    fromStation,
    setFromStation,
    toStation,
    setToStation,
    departureDate,
    setDepartureDate,
  } = useTrainSearchContext();
  function removeError() {
    setErrorMessage("");
    setAnchorEl(null);
  }
  function validateAndFetch() {
    if (fromStation == toStation) {
      setErrorMessage("Source & Destination Can't be same!");
      setAnchorEl(fromRef.current);
      return;
    }
    if (!departureDate) {
      setErrorMessage("Please Enter A Date!");
      setAnchorEl(depDateRef.current);
      return;
    }
    if (departureDate.$d == "Invalid Date") {
      setErrorMessage("Please Enter A Valid Date!");
      setAnchorEl(depDateRef.current);
      return;
    }
    const difference = departureDate.diff(new dayjs().hour(0).minute(0));
    if (difference < 0 || difference > 121 * 24 * 3600 * 1000) {
      setErrorMessage("Date is out of Range!");
      setAnchorEl(depDateRef.current);
      return;
    }
    setAnchorEl(null);
    const date = departureDate.toJSON();
    const from = encodeURI(TRAIN_STATIONS[fromStation]);
    const to = encodeURI(TRAIN_STATIONS[toStation]);
    // console.log(from);
    const url = `/trains/search?date=${date}&from=${from}&to=${to}`;
    // console.log(url);
    navigate(url);
  }
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <Box component={"div"} sx={{ width: "100%" }}>
      <Box
        component={"div"}
        position={"absolute"}
        // position={"relative"}
        sx={{ width: "100%" }}
      >
        <Box
          component={"div"}
          position={"absolute"}
          sx={{
            backgroundImage:
              "url('//imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/bg1.jpg')",
            width: "100%",
            height: "550px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            zIndex: "-10",
          }}
        ></Box>
      </Box>
      <Box>
        <div style={{ position: "relative" }}>
          <Stack
            direction={"row"}
            gap={1}
            sx={{
              pt: "150px",
              pb: "120px",
              width: "fit-content",
              margin: "auto",
              alignItems: "center",
            }}
          >
            <img src={trainLogo} />
            <Typography variant="h5" color={"#fff"} fontWeight={600}>
              Train Ticket Booking
            </Typography>
          </Stack>
        </div>
      </Box>
      <Stack
        direction={"row"}
        className="search-pannel"
        alignItems={"center"}
        gap={4}
        sx={{
          width: "fit-content",
          m: "auto",
          backgroundColor: "#fff",
          py: 4,
          px: 4,
          borderRadius: "5px",
        }}
      >
        <TrainStationInput
          removeError={removeError}
          ref={fromRef}
          options={TRAIN_STATIONS}
          value={fromStation}
          setValue={setFromStation}
          label={"From"}
          placeholder="Leaving From"
        />
        <IconButton
          onClick={() => {
            setFromStation(toStation);
            setToStation(fromStation);
          }}
          disableRipple
          sx={{
            mx: 1,
            p: 0.2,
            height: "fit-content",
            border: "2px solid",
          }}
        >
          <img src={swapSVG} />
        </IconButton>
        <TrainStationInput
          removeError={removeError}
          ref={toRef}
          options={TRAIN_STATIONS}
          value={toStation}
          setValue={setToStation}
          label={"To"}
          placeholder="Going To"
        />
        <DatePicker
          ref={depDateRef}
          slotProps={{
            textField: {
              variant: "standard",
              InputLabelProps: { shrink: true },
            },
          }}
          format="DD MMM, dddd"
          disablePast
          label="Departure"
          reduceAnimations
          maxDate={new dayjs().add(120, "day")}
          value={departureDate}
          onChange={(val) => {
            setDepartureDate(val);
            setAnchorEl(null);
          }}
        />
        <Button
          className="search-button"
          sx={{
            color: "#fff",
            m: "auto",
            py: 1,
            px: 7,
            fontWeight: 700,
            fontSize: "16px",
            borderRadius: "2px",
            backgroundColor: "secondary.hover",
            ":hover": { backgroundColor: "secondary.hover" },
          }}
          onClick={validateAndFetch}
        >
          Search
        </Button>
        <Popper
          placement="bottom-start"
          open={anchorEl != null}
          anchorEl={anchorEl}
          sx={{ zIndex: 100 }}
        >
          <Box sx={{ ...popperSX }}>
            <BiSolidError size="17px" style={{ marginRight: "5px" }} />{" "}
            <Typography fontSize={14}>{errorMesaage}</Typography>
          </Box>
        </Popper>
      </Stack>
    </Box>
  );
}
