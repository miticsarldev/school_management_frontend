import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Définition des interfaces
interface Classroom {
  _id: string;
  name: string;
  capacity: number;
  statuses?: boolean;
}

interface Student {
  _id: string;
  student_id: string; // Référence à l'étudiant
  classroom_id: string; // Référence à la classe
}

interface Course {
  _id: string;
  name: string;
  number_of_hours: number;
  description?: string;
  id_user: string;
  id_grade: string;
  id_classroom_etudiant: string;
  statuses?: boolean;
}

interface Grade {
  _id: string;
  value: number;
  appreciation?: string;
  statuses?: boolean;
}

const TopSubjectsCard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const classroomsResponse = await axios.get('http://localhost:4444/api/classrooms');
        console.log(classroomsResponse.data);
        
        setClassrooms(classroomsResponse.data);

        const coursesResponse = await axios.get('http://localhost:4444/api/courses');
        console.log(coursesResponse.data);
        
        setCourses(coursesResponse.data);

        const gradesResponse = await axios.get('http://localhost:4444/api/grades');
        console.log(gradesResponse.data);
        
        setGrades(gradesResponse.data);

        const studentsResponse = await axios.get('http://localhost:4444/api/classroom_etudiants');
        console.log(studentsResponse.data);
        
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  const filteredCourses = courses.filter(course =>
    students.some(student => 
      student.classroom_id === selectedClass && student.student_id === course.id_classroom_etudiant
    )
  );

  return (
    <div className="col-xxl-4 col-xl-6 d-flex">
      <div className="card flex-fill">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h4 className="card-title">Top Matiere</h4>
          <div className="dropdown">
            <select onChange={handleClassChange} className="bg-white">
              <option value="">Select Class</option>
              {classrooms.map((classroom) => (
                <option key={classroom._id} value={classroom._id}>
                  {classroom.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="card-body">
          {loading ? (
            <div>Chargement...</div>
          ) : filteredCourses.length === 0 ? (
            <div>Pas de résultat pour cette classe.</div>
          ) : (
            <ul className="list-group">
              {filteredCourses.map((course) => {
                const grade = grades.find(g => g._id === course.id_grade) || { value: 0 };
                return (
                  <li className="list-group-item" key={course._id}>
                    <div className="row align-items-center">
                      <div className="col-sm-4">
                        <p className="text-dark">{course.name}</p>
                      </div>
                      <div className="col-sm-8">
                        <div className="progress progress-xs flex-grow-1">
                          <div
                            className="progress-bar bg-primary rounded"
                            role="progressbar"
                            style={{ width: `${grade.value}%` }}
                            aria-valuenow={grade.value}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSubjectsCard;
