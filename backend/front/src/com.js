{
    /*const [data, setdata] = useState({
    Email: "",
    Password: "",
  });
  const { Email, Password } = data;
  const changehangler = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Email.trim()) {
      
      alert("email is required")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(Email)) {
      alert("email is not valid");
    }
    if (!Password) {
      
    } else if (Password.length <= 6) {
      alert("password is more then 6 cher");
    }
  };

  costom hook .................

  const getStorageData = (keyName, defaultValue) =>{
    const savedItem = localStorage.getItem(keyName);
  const parsedItem = JSON.parse(savedItem);
  return parsedItem || defaultValue;
  }
   
  export const useLocalStorage = (keyName, initialValue) => {
    const [value, setValue] = useState(() => {
      return getStorageData(keyName, initialValue);
    });
     
  useEffect(() => {
      localStorage.setItem(keyName, JSON.stringify(value));
    }, [keyName, value]);
   
  return [value, setValue];
  }

  const Form = ()  => {
// Handles localStorage functionality for input //field element
 
 const [value, setValue] = useLocalStorage("Username", "")
  
// Handles localStorage functionality for //checkbox element
 
const [checked, setChecked] = useLocalStorage("Checkbox", false)
}
*/
  }

  {/*<Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  control={control}
                  name="rememberMe"
                  defaultValue=""
                  inputRef={register()}
                  render={({ field: { onChange } }) => (
                    <Checkbox
                      color="primary"
                      onChange={(e) => onChange(e.target.checked)}
                      />
                  )}
                />
              }
              label={
                <Typography>
                  Remember me
                </Typography>
              }
            />
            <br /> 
          </Grid>
          */}