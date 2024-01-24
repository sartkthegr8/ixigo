import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSearchContext } from "../Contexts/SearchProdiver";

const ControlledCustomInput = React.forwardRef(
	(
		{
			type = "text",
			value,
			setValue,
			label,
			placeholder,
			crossDefaulFill = "rgba(0, 0, 0, 0.5)",
			crossHoverFill = "black",
			removeError,
		},
		ref
	) => {
		const { airports, passengers } = useSearchContext();
		return (
			<>
				{type == "text" && (
					<Autocomplete
						sx={{ width: "200px" }}
						disablePortal
						disableClearable
						openOnFocus
						options={airports}
						value={airports[value]}
						ref={ref}
						onChange={(e, v) => {
							removeError();
							setValue(
								v
									? airports.findIndex(
											(item) =>
												item.iata_code == v.iata_code
									  )
									: ""
							);
						}}
						getOptionLabel={(option) =>
							option.iata_code + " - " + option.city
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label={label}
								type={type}
								variant="standard"
								placeholder={placeholder}
								InputLabelProps={{ shrink: true }}
							/>
						)}
						renderOption={(props, option) => {
							const { iata_code, name, city, country } = option;
							return (
								<Stack
									{...props}
									sx={{
										width: 320,
										"&:hover": {
											borderLeft:
												"2px soild #ec5b24 !important",
										},
									}}
								>
									<Typography sx={{ mx: 0 }}>
										{iata_code} - {city}, {country}
									</Typography>
									<Typography
										fontSize={"12px"}
										color="rgba(0,0,0,0.6)"
									>
										{name}
									</Typography>
								</Stack>
							);
						}}
					/>
				)}
				{type == "date" && (
					<TextField
						sx={{ width: 200 }}
						label={label}
						variant="standard"
						inputRef={ref}
						value={value}
						onChange={(e) => {
							removeError();
							setValue(e.target.value);
						}}
						type={type}
						placeholder={placeholder}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				)}
				{type == "number" && (
					<Autocomplete
						sx={{
							width: "200px",
						}}
						disablePortal
						disableClearable
						openOnFocus
						onChange={(e, v) => {
							removeError();
							setValue(v - 1);
						}}
						value={passengers[value]}
						ref={ref}
						options={passengers}
						getOptionLabel={(option) =>
							option + " Passenger" + (option == 1 ? "" : "s")
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label={label}
								variant="standard"
								placeholder={placeholder}
								InputLabelProps={{ shrink: true }}
							/>
						)}
						renderOption={(props, option) => {
							return (
								<Typography {...props}>
									{option} Passenger{option == 1 ? "" : "s"}
								</Typography>
							);
						}}
					/>
				)}
			</>
		);
	}
);

export default ControlledCustomInput;