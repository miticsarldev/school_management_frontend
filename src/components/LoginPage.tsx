import { useLocation, useNavigate } from "react-router-dom";

import { ChangeEvent, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import toast from "react-hot-toast";
import { setCredentials, useLoginMutation } from "@/redux/features/authSlice";
import { checkData } from "@/redux/utils";
import LOGO from "/logos/logo_mitic_light.png";
import { useAppDispatch } from "@/redux/hooks";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type ResponseError = {
  data: {
    message: string;
  };
  status: number;
};

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Veuillez remplir tous les champs", {
        position: "top-center",
      });
      return;
    }

    const { phone, email, username } = checkData({ email: formData.email });

    console.log({ phone, email, username, password: formData.password });

    try {
      const result = await login({
        phone,
        email,
        username,
        password: formData.password,
      }).unwrap();

      dispatch(setCredentials({ ...result, isAuthenticated: true }));
      navigate(from, { replace: true });
      toast.success("Connexion reussie", {
        position: "top-center",
      });

      navigate("/dashboard", { replace: true });
    } catch (error: unknown) {
      console.log(error);
      const message =
        (error as ResponseError)?.data?.message || "Échec de la connexion";
      toast.error(message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center">
      <div className="grid w-full max-w-[900px] grid-cols-1 rounded-xl bg-card shadow-xl md:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-6 p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Administration</h1>
            <p className="text-muted-foreground text-sm">
              Veuillez entrer votre email ou numero de telephone et mot de passe
              pour accéder au Dashboard d'Administration.
            </p>
          </div>
          <form
            className="grid w-full max-w-[350px] gap-4"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email / &#8470;Telephone / Username</Label>
              <Input
                id="email"
                name="email"
                type="text"
                required
                placeholder="Entrer votre identifiant"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-0 flex items-center px-4 focus:outline-none"
                >
                  {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                </button>
              </div>
            </div>
            {isLoading ? (
              <button
                disabled
                type="button"
                className="text-white bg-[#68b2e6] hover:bg-[#68b2e6] focus:ring-4 w-full justify-center font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-[#68b2e6] dark:hover:bg-[#f1732f] inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                En cours...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full text-white bg-[#68b2e6] hover:bg-[#68b2e6]-700 focus:ring-4 focus:outline-none focus:ring-[#68b2e6] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#68b2e6] dark:hover:bg-[#68b2e6] dark:focus:ring-[#68b2e6]"
              >
                Se connecter
              </button>
            )}
          </form>
        </div>
        <div className="hidden rounded-r-xl bg-muted md:flex w-full h-full items-center justify-center bg-white">
          <img
            src={LOGO}
            alt="Login MITIC LOGO"
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
