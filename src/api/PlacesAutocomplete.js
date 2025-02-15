import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import './PlacesAutocomplete.css';

const PlacesAutocomplete = ({ setCenter }) => {
  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setCenter({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} className="combobox-input" placeholder="Enter your starting point" />
        {status === "OK" && data.length > 0 &&
          <ComboboxPopover>
            <ComboboxList>
              {data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description} />)}
            </ComboboxList>
          </ComboboxPopover>
        }
    </Combobox>
  );
};

export default PlacesAutocomplete;
