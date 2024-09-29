import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { CustomError, User, UsersFormProps } from "@/types";
import toast from "react-hot-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  useDeleteUserMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} from "@/redux/features/authSlice";

const UsersForm: React.FC<UsersFormProps> = ({ mode, user, onClose }) => {
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [update, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>(
    user || {
      firstname: "",
      lastname: "",
      email: "",
      telephone: "",
      username: "",
      password: "",
      bio: "",
      birthdate: "",
      gender: "",
      country: "",
      city: "",
      quarter: "",
      street: "",
      door: "",
      image: "",
      website: "",
      status: "",
      role: "etudiant",
      lastLogin: "",
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { firstname, lastname, email, password, status, role } = formData;

    console.log({ firstname, lastname, email, password, status, role });

    if (mode === "add") {
      if (
        firstname === "" ||
        lastname === "" ||
        email === "" ||
        password === "" ||
        status === "" ||
        !!role
      ) {
        toast.error("Veuillez remplir tous les champs", {
          position: "top-center",
        });
        return;
      }

      try {
        const response = await register({
          firstname,
          lastname,
          email,
          password,
          status,
          role,
        }).unwrap();

        if (response) {
          toast.success("Utilisateur ajouté avec succès", {
            position: "top-center",
          });
        }
      } catch (error) {
        console.error("Error adding user:", error);
        if ((error as CustomError)?.data?.error?.includes("password")) {
          toast.error(
            "Le mot de passe doit contenir au moins 8 caractères: \n1 majuscule, \n1 minuscule, \n1 chiffre, \n1 symbole,",
            {
              position: "top-center",
            }
          );
        }
        return;
      }
    }

    if (mode === "modify") {
      if (firstname === "" || lastname === "" || status === "" || !!role) {
        toast.error("Veuillez remplir tous les champs", {
          position: "top-center",
        });
        return;
      }

      try {
        const response = await update({
          id: user ? (user!._id as string) : "",
          firstname,
          lastname,
          status,
          role,
        }).unwrap();

        if (response) {
          toast.success("Utilisateur modifié avec succès", {
            position: "top-center",
          });
        }
      } catch (error) {
        console.error("Error updating user:", error);
        if ((error as CustomError)?.data?.error?.includes("password")) {
          toast.error("Erreur du serveur.", {
            position: "top-center",
          });
        }
      }
    }

    if (mode === "delete") {
      try {
        const response = await deleteUser(
          user ? (user!._id as string) : ""
        ).unwrap();
        if (response) {
          toast.success("Utilisateur supprimé avec succès", {
            position: "top-center",
          });
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }

    onClose();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isRegistering || isUpdating || isDeleting) {
    return <div className="text-center">En cours...</div>;
  }

  if (mode === "delete") {
    return (
      <div className="space-y-4">
        <p>
          Êtes-vous sûr de vouloir supprimer l'utilisateur {user?.firstname}{" "}
          {user?.lastname} ?
        </p>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleSubmit}>
            Supprimer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstname">Prénom</Label>
          <Input
            id="firstname"
            name="firstname"
            placeholder="Entrez le prénom"
            value={formData?.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastname">Nom</Label>
          <Input
            id="lastname"
            name="lastname"
            placeholder="Entrez le lastname"
            value={formData?.lastname}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData?.email}
          onChange={handleChange}
          disabled={mode === "modify"}
          placeholder="Entrez l'adresse email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Telephone</Label>
        <Input
          id="phone"
          name="phone"
          type="phone"
          value={formData?.telephone}
          onChange={handleChange}
          disabled={mode === "modify"}
          placeholder="Entrez l'adresse phone"
        />
      </div>
      {mode === "add" && (
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData?.password}
              onChange={handleChange}
              placeholder="Entrez le mot de passe"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeIcon className="h-4 w-4" />
              ) : (
                <EyeOffIcon className="h-4 w-4" />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="role">Rôle</Label>
        <Select
          name="role"
          value={formData.role}
          onValueChange={(value) =>
            handleChange({
              target: { name: "role", value },
            } as ChangeEvent<HTMLSelectElement>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="administrateur">Administrateur</SelectItem>
            <SelectItem value="réceptionniste">Réceptionniste</SelectItem>
            <SelectItem value="médecin">Médecin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          name="status"
          value={formData.status}
          onValueChange={(value) =>
            handleChange({
              target: {
                name: "status",
                value,
              },
            } as ChangeEvent<HTMLSelectElement>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="actif">Actif</SelectItem>
            <SelectItem value="inactif">Inactif</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="button" onClick={handleSubmit} variant="default">
          {mode === "add" ? "Ajouter" : "Modifier"}
        </Button>
      </div>
    </form>
  );
};

export default UsersForm;
