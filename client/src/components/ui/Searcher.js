import React, { 
  useEffect, 
  useReducer, 
  useRef, 
  useCallback 
} from "react";
import { Search } from "semantic-ui-react";

import escapeRegExp from "../../utils/escapeRegExp";

const initialState = { 
  loading: false, 
  results: [], 
  value: "" 
};
const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState
    case "START_SEARCH":
      return { 
        ...state, 
        loading: true, 
        value: action.query 
      };
    case "FINISH_SEARCH":
      return { 
        ...state, 
        loading: false, 
        results: action.results 
      };
    case "UPDATE_SELECTION": 
      return {...state, value: action.selection };
    default:
      throw new Error();
  }
};

const Searcher = ({ decks }) => {
  const [state, dispatch ] = useReducer(reducer, initialState);

  const timeoutRef = useRef()
  const handleSearchChange = useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      const re = new RegExp(escapeRegExp(data.value), 'i')
      const isMatch = (result) => re.test(result.title)

      dispatch({
        type: 'FINISH_SEARCH',
        results: decks.filter(isMatch),
      })
    }, 300)
  }, [])
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Search 
      loading={state.loading}
      placeholder="Search Decks:"
      onResultSelect={(event, data) => 
        dispatch({ type: "UPDATE_SELECTION", selection: data.result.title })
      }
      onSearchChange={handleSearchChange}
      results={state.results}
      value={state.value}
    />
  )
};
export default Searcher;