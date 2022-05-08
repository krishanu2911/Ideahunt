import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "supabaseClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLogin, setUserLogin] = useState(false);


  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);

  const signUp = (userData, metaData) =>
    supabase.auth.signUp(userData, { data: metaData });

  const signIn = (data) => {
    if(Date.parse(user?.last_sign_in_at) < Date.now())
    supabase.auth.signOut()
   return  supabase.auth.signIn(data)
  };

  const signOut = () => supabase.auth.signOut();


  useEffect(()=>{
    if(user) setUserLogin(true);
  }, [user])

  const logoutHandler = (navigate) => {
    signOut()
    localStorage.removeItem('userToken')
    setUserLogin(false)  
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp, userLogin, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
