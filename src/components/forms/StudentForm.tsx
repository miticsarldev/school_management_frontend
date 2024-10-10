// import { ChangeEvent, FormEvent, useState } from "react";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Button } from "../ui/button";
// import { CustomError, Student, StudentFormProps } from "@/types";
// import toast from "react-hot-toast";
// import { Dropdown } from "../ui/dropdown-menu"; // Assurez-vous d'importer le composant Dropdown si nécessaire
// import {
//   useDeleteStudentMutation,
//   useRegisterStudentMutation,
//   useUpdateStudentMutation,
// } from "@/redux/features/studentSlice"; // Ajustez selon votre structure

// const StudentForm: React.FC<StudentFormProps> = ({ mode, student, onClose }) => {
//   const [register, { isLoading: isRegistering }] = useRegisterStudentMutation();
//   const [update, { isLoading: isUpdating }] = useUpdateStudentMutation();
//   const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();
//   const [formData, setFormData] = useState<Student>(
//     student || {
//       firstname: "",
//       lastname: "",
//       class: "",
//       status: "",
//       membershipDate: "",
//       birthDate: "",
//     }
//   );

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const { firstname, lastname, class: studentClass, status } = formData;

//     if (mode === "add") {
//       if (!firstname || !lastname || !studentClass || !status) {
//         toast.error("Veuillez remplir tous les champs", {
//           position: "top-center",
//         });
//         return;
//       }

//       try {
//         const response = await register(formData).unwrap();
//         if (response) {
//           toast.success("Étudiant ajouté avec succès", {
//             position: "top-center",
//           });
//         }
//       } catch (error) {
//         console.error("Error adding student:", error);
//         toast.error("Erreur lors de l'ajout de l'étudiant", {
//           position: "top-center",
//         });
//       }
//     }

//     if (mode === "modify") {
//       try {
//         const response = await update({
//           id: student ? (student._id as string) : "",
//           ...formData,
//         }).unwrap();
//         if (response) {
//           toast.success("Étudiant modifié avec succès", {
//             position: "top-center",
//           });
//         }
//       } catch (error) {
//         console.error("Error updating student:", error);
//         toast.error("Erreur lors de la mise à jour de l'étudiant", {
//           position: "top-center",
//         });
//       }
//     }

//     if (mode === "delete") {
//       try {
//         const response = await deleteStudent(student ? (student._id as string) : "").unwrap();
//         if (response) {
//           toast.success("Étudiant supprimé avec succès", {
//             position: "top-center",
//           });
//         }
//       } catch (error) {
//         console.error("Error deleting student:", error);
//         toast.error("Erreur lors de la suppression de l'étudiant", {
//           position: "top-center",
//         });
//       }
//     }

//     onClose();
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   if (isRegistering || isUpdating || isDeleting) {
//     return <div className="text-center">En cours...</div>;
//   }

//   if (mode === "delete") {
//     return (
//       <div className="space-y-4">
//         <p>
//           Êtes-vous sûr de vouloir supprimer l'étudiant {student?.firstname} {student?.lastname} ?
//         </p>
//         <div className="flex justify-end space-x-2">
//           <Button variant="outline" onClick={onClose}>
//             Annuler
//           </Button>
//           <Button variant="destructive" onClick={handleSubmit}>
//             Supprimer
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <form className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="firstname">Prénom</Label>
//           <Input
//             id="firstname"
//             name="firstname"
//             placeholder="Entrez le prénom"
//             value={formData?.firstname}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="lastname">Nom</Label>
//           <Input
//             id="lastname"
//             name="lastname"
//             placeholder="Entrez le nom"
//             value={formData?.lastname}
//             onChange={handleChange}
//           />
//         </div>
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor="class">Classe</Label>
//         <Input
//           id="class"
//           name="class"
//           placeholder="Entrez la classe"
//           value={formData?.class}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor="status">Statut</Label>
//         <Select
//           name="status"
//           value={formData.status}
//           onValueChange={(value) => handleChange({ target: { name: "status", value } } as ChangeEvent<HTMLSelectElement>)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Sélectionnez un statut" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="actif">Actif</SelectItem>
//             <SelectItem value="inactif">Inactif</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor="membershipDate">Date d'adhésion</Label>
//         <Input
//           id="membershipDate"
//           name="membershipDate"
//           type="date"
//           value={formData?.membershipDate}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor="birthDate">Date de naissance</Label>
//         <Input
//           id="birthDate"
//           name="birthDate"
//           type="date"
//           value={formData?.birthDate}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex justify-end space-x-2">
//         <Button type="button" variant="outline" onClick={onClose}>
//           Annuler
//         </Button>
//         <Button type="button" onClick={handleSubmit} variant="default">
//           {mode === "add" ? "Ajouter" : "Modifier"}
//         </Button>
//       </div>
//       <Dropdown>
//         <Dropdown.Trigger>
//           <Button variant="outline">Actions</Button>
//         </Dropdown.Trigger>
//         <Dropdown.Content>
//           <Dropdown.Item onClick={() => {/* Logique pour modifier */}}>Modifier</Dropdown.Item>
//           <Dropdown.Item onClick={() => {/* Logique pour promouvoir */}}>Promouvoir</Dropdown.Item>
//           <Dropdown.Item onClick={() => {/* Logique pour voir le profil */}}>Voir Profil</Dropdown.Item>
//         </Dropdown.Content>
//       </Dropdown>
//     </form>
//   );
// };

// export default StudentForm;
