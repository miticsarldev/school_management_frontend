import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Edit2Icon,
  PlusCircleIcon,
  Trash2Icon,
} from "lucide-react";
import { Mode, User } from "@/types";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useGetAllUsersQuery } from "@/redux/features/authSlice";
import UsersForm from "./forms/UsersForm";

const UsersManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [linesPerPage, setLinesPerPage] = useState<number>(5);
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [checkedUsers, setCheckedUsers] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsersQuery();
  console.log(usersData);

  const handleAction = (action: Mode, User: User | null) => {
    setMode(action);
    setSelectedUser(User);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setMode(null);
    setSelectedUser(null);
  };

  const handleCheckboxChange = (id: string) => {
    setCheckedUsers((prev) => {
      const newCheckedUsers = new Set(prev);
      if (newCheckedUsers.has(id)) {
        newCheckedUsers.delete(id);
      } else {
        newCheckedUsers.add(id);
      }
      return newCheckedUsers;
    });
  };

  const handleManyUsersDelete = () => {
    // Here you would typically make an API call to delete the selected users
    console.log("Selected users:", checkedUsers);
    setCheckedUsers(new Set());
  };

  const filteredUsers =
    usersData &&
    usersData.filter((user) =>
      `${user.firstname} ${user.lastname} ${user.email} ${user.role} ${user.status}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  const isAnyChecked = checkedUsers.size > 0;
  const buttonStyle = isAnyChecked
    ? "bg-red-600 text-white"
    : "bg-gray-300 text-gray-700";

  const totalPages = Math.ceil(
    (filteredUsers?.length as number) / linesPerPage
  );

  if (isLoadingUsers) return <div>Loading...</div>;

  return (
    <div className="w-full container mx-auto p-4 space-y-4 mt-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            Tous les utilisateurs: {filteredUsers?.length}
          </h2>
          <p className="text-sm text-gray-500">
            ({currentPage}/{totalPages})
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            className="border-2 rounded p-2 w-full bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="space-x-2 flex items-center">
          <Button onClick={() => handleAction("add", null)}>
            <PlusCircleIcon className="w-4 h-4 mr-2" /> Ajouter un nouvel
            utilisateur
          </Button>
          <Button
            variant="outline"
            className={buttonStyle}
            disabled={!isAnyChecked}
            onClick={() => handleManyUsersDelete()}
          >
            Supprimer tout
          </Button>
        </div>
      </div>

      <Table className="w-full bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead>UTILISATEUR</TableHead>
            <TableHead>RÔLE</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>DERNIÈRE CONNEXION</TableHead>
            <TableHead className="w-[40px]">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers
            ?.slice(
              (currentPage - 1) * linesPerPage,
              currentPage * linesPerPage
            )
            .map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={checkedUsers.has(user?._id as string)}
                    onChange={() => handleCheckboxChange(user?._id as string)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {user.firstname} {user.lastname}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "administrateur"
                        ? "bg-blue-100 text-blue-800"
                        : user.role === "enseignant"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`flex items-center gap-1 ${
                      user.status === "actif"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        user.status === "actif" ? "bg-green-600" : "bg-red-600"
                      }`}
                    ></span>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="!text-sm">
                    {format(
                      parseISO(user.lastLogin),
                      "eeee dd MMMM yyyy 'à' HH'h'mm",
                      { locale: fr }
                    )
                      .charAt(0)
                      .toUpperCase() +
                      format(
                        parseISO(user.lastLogin),
                        "eeee dd MMMM yyyy 'à' HH'h'mm",
                        { locale: fr }
                      ).slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction("modify", user)}
                    >
                      <Edit2Icon className="w-4 h-4 mr-2" />
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleAction("delete", user)}
                      className="ml-2"
                    >
                      <Trash2Icon className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Lignes par page</span>
          <select
            className="border rounded p-1 bg-white"
            value={linesPerPage}
            onChange={(e) => setLinesPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span className="text-sm text-muted-foreground">
            {(currentPage - 1) * linesPerPage + 1}-
            {Math.min(
              currentPage * linesPerPage,
              filteredUsers?.length as number
            )}{" "}
            sur {filteredUsers?.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <DialogDescription />
              {mode === "add" && "Ajouter un nouvel utilisateur"}
              {mode === "modify" && "Modifier l'utilisateur"}
              {mode === "delete" && "Supprimer l'utilisateur"}
            </DialogTitle>
          </DialogHeader>
          <UsersForm
            mode={mode}
            user={selectedUser}
            onClose={handleCloseModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersManagement;
