import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Favorite, FavoriteBorder, Search } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../state";
import { RootState } from "../../state/reducers";

interface Props {
  handleSearch: () => void;
}

const SearchBox: React.FC<Props> = ({ handleSearch }: Props) => {
  const keywords = useSelector<RootState, string>(
    (state) => state.searchProps.keywords
  );
  const dispatch = useDispatch();

  const handleKeywordChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = (event) => {
    dispatch(actionCreators.updateKeywords(event.target.value));
  };
  const [clicked, setClicked] = useState(false);
  return (
    <TextField
      autoFocus
      margin="normal"
      variant="outlined"
      fullWidth
      placeholder="Enter Keyword"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Save" arrow>
              <IconButton onClick={() => setClicked(!clicked)}>
                {clicked ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      onChange={handleKeywordChange}
      onKeyPress={(event) => {
        if (event.key === "Enter") handleSearch();
      }}
      value={keywords}
    />
  );
};

export default SearchBox;
