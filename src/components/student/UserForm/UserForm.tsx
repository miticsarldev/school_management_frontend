import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserFormProps {
  userId?: string | null; // userId est optionnel et peut être null
  onClose?: () => void; 
}

const UserForm: React.FC<UserFormProps> = ({ userId, onClose }) => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
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
    status: 'active',
    image: "http://localhost:4444"
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userId) {
      // Si userId est fourni, charger les données de l'utilisateur
      axios.get(`/api/users/${userId}`)
        .then(response => {
          setUserData(response.data);
          setIsEditing(true);
        })
        .catch(error => {
          console.error('Erreur lors du chargement des données de l\'utilisateur :', error);
        });
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Conversion de la date avant l'envoi
    const date = new Date(userData.birthdate); // Créez un objet Date

    const dataToSend = {
      ...userData,
      birthdate: date.toISOString(), // Convertissez en format ISO pour l'envoi
    };

    const request = isEditing
      ? axios.put(`http://localhost:4444/api/users/${userId}`, dataToSend)
      : axios.post('http://localhost:4444/api/register', dataToSend);

    request
      .then(response => {
        console.log(response.data);
        if (onClose) onClose(); // Fermer le formulaire après la soumission
      })
      .catch(error => {
        console.error('Erreur lors de la soumission du formulaire :', error);
      });
  };

  return (
    <div className="container">
      <h2 className="my-4">{isEditing ? 'Modifier un Étudiant' : 'Ajouter un Étudiant'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Prénom</label>
          <input
            type="text"
            className="form-control"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">UserName</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Téléphone</label>
          <input
            type="tel"
            className="form-control"
            name="telephone"
            value={userData.telephone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required={!isEditing}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Biographie</label>
          <textarea
            className="form-control"
            name="bio"
            value={userData.bio}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date de naissance</label>
          <input
            type="date"
            className="form-control"
            name="birthdate"
            value={userData.birthdate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Genre</label>
          <select
            className="form-select"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
          >
            <option value="">Sélectionner...</option>
            <option value="male">Masculin</option>
            <option value="female">Féminin</option>
            <option value="other">Autre</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Pays</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={userData.country}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ville</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={userData.city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quartier</label>
          <input
            type="text"
            className="form-control"
            name="quarter"
            value={userData.quarter}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rue</label>
          <input
            type="text"
            className="form-control"
            name="street"
            value={userData.street}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Numéro de porte</label>
          <input
            type="text"
            className="form-control"
            name="door"
            value={userData.door}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Site Web</label>
          <input
            type="url"
            className="form-control"
            name="website"
            value={userData.website}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Modifier' : 'Ajouter'}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
          Annuler
        </button>
      </form>
    </div>
  );
};

export default UserForm;
