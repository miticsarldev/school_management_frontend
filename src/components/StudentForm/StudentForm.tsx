import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

interface StudentFormProps {
  studentId?: string; // Si l'ID est fourni, nous sommes en mode modification
}

const StudentForm: React.FC<StudentFormProps> = ({ studentId }) => {
  const [studentData, setStudentData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    telephone: '',
    password: '',
    bio: '',
    birthdate: '',
    gender: '',
    country: '',
    city: '',
    quarter: '',
    street: '',
    door: '',
    website: '',
    role: 'etudiant', // par défaut
    status: "actif", // par défaut
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Si studentId est fourni, on va récupérer les données de l'étudiant pour le modifier
    if (studentId) {
      setIsLoading(true);
      axios
        .get(`http://your-backend-url.com/api/users/${studentId}`)
        .then((response) => {
          setStudentData(response.data);
        })
        .catch((error) => {
          console.error(error);
          setMessage('Erreur lors de la récupération des données.');
        })
        .finally(() => setIsLoading(false));
    }
  }, [studentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      if (studentId) {
        // Modifier l'étudiant
        await axios.put(`http://your-backend-url.com/api/users/${studentId}`, studentData);
        setMessage('Étudiant mis à jour avec succès.');
      } else {
        // Ajouter un nouvel étudiant
        await axios.post('http://localhost:4444/api/register', studentData);
        setMessage('Étudiant créé avec succès.');
      }
      // Réinitialiser le formulaire après une soumission réussie
      setStudentData({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        telephone: '',
        password: '',
        bio: '',
        birthdate: '',
        gender: '',
        country: '',
        city: '',
        quarter: '',
        street: '',
        door: '',
        website: '',
        role: 'etudiant',
        status: 'actif',
      });
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de l\'ajout ou de la modification de l\'étudiant.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>{studentId ? 'Modifier un étudiant' : 'Ajouter un étudiant'}</h2>
      {isLoading && <p>Chargement des données...</p>}
      {message && <div className="alert alert-info">{message}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstname">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le prénom"
            name="firstname"
            value={studentData.firstname}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLastname">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le nom"
            name="lastname"
            value={studentData.lastname}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez l'email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Entrez username"
            name="username"
            value={studentData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTelephone">
          <Form.Label>Téléphone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Entrez le numéro de téléphone"
            name="telephone"
            value={studentData.telephone}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrez le mot de passe"
            name="password"
            value={studentData.password}
            onChange={handleChange}
            required={!studentId} // Le mot de passe est requis uniquement pour l'ajout
          />
        </Form.Group>
        <Form.Group controlId="formBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Entrez la biographie"
            name="bio"
            value={studentData.bio}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBirthdate">
          <Form.Label>Date de naissance</Form.Label>
          <Form.Control
            type="text"
            name="birthdate"
            value={studentData.birthdate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formGender">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={studentData.gender}
            onChange={handleChange}
          >
            <option value="">Sélectionner le genre</option>
            <option value="masculin">Masculin</option>
            <option value="féminin">Féminin</option>
            <option value="autre">Autre</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCountry">
          <Form.Label>Pays</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le pays"
            name="country"
            value={studentData.country}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formCity">
          <Form.Label>Ville</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez la ville"
            name="city"
            value={studentData.city}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formQuarter">
          <Form.Label>Quartier</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le quartier"
            name="quarter"
            value={studentData.quarter}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formStreet">
          <Form.Label>Rue</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez la rue"
            name="street"
            value={studentData.street}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDoor">
          <Form.Label>Porte</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez la porte"
            name="door"
            value={studentData.door}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formWebsite">
          <Form.Label>Site web</Form.Label>
          <Form.Control
            type="url"
            placeholder="Entrez l'URL du site web"
            name="website"
            value={studentData.website}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formRole">
          <Form.Label>Rôle</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={studentData.role}
            onChange={handleChange}
          >
            <option value="etudiant">Étudiant</option>
            <option value="enseignant">Enseignant</option>
            <option value="administrateur">Administrateur</option>
          </Form.Control>
        </Form.Group>
        {/* <Form.Group controlId="formStatus">
          <Form.Label>Statut</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={studentData.status ? "actif" : "inactif"}
            onChange={handleChange}
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </Form.Control>
        </Form.Group> */}
        <Button variant="primary" type="submit">
          {studentId ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </Form>
    </div>
  );
};

export default StudentForm;
