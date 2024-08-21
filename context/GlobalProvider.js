import {
	createContext,
	useState,
	useEffect,
	useContext,
} from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	return context;
};

const GlobalProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	
    useEffect(() => {
		getCurrentUser()
			.then((res) => {
				if (res) {
					console.log(res);
					setIsLogged(true);
					setUser(res);
				} else {
					setIsLogged(false);
					setUser(null);
				}
			})
			.catch((error) => console.log(error))
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return (
		<GlobalContext.Provider
			value={{ isLogged, setIsLogged, user, setUser, loading }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
