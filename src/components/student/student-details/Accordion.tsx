import React, { useState } from 'react';

const Accordion: React.FC = () => {
  // État initial avec des types any
  const [accordions, setAccordions] = useState<any[]>([
    { id: 1, title: 'Monthly Test (May)', isOpen: false },
    { id: 2, title: 'Monthly Test (June)', isOpen: false },
    { id: 3, title: 'Monthly Test (July)', isOpen: false },
  ]);

  // Fonction pour basculer l'état d'ouverture d'un accordéon
  const toggleAccordion = (id: number) => {
    setAccordions((prevAccordions: any) =>
      prevAccordions.map((acc: any) =>
        acc.id === id ? { ...acc, isOpen: !acc.isOpen } : acc
      )
    );
  };

  return (
    <div className="accordion" id="accordionExample">
      {accordions.map((item: any,index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={`heading${item.id}`}>
            <button
              className="accordion-button"
              type="button"
              onClick={() => toggleAccordion(item.id)} // Passe l'ID à la fonction
              aria-expanded={item.isOpen}
              aria-controls={`collapse${item.id}`}
            >
              {item.title}
            </button>
          </h2>
          <div
            id={`collapse${item.id}`}
            className={`accordion-collapse collapse ${item.isOpen ? 'show' : ''}`} // Ajoute la classe 'show' si l'accordéon est ouvert
            aria-labelledby={`heading${item.id}`}
          >
            <div className="accordion-body">
              {/* Contenu de l'accordéon */}
              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>Subject</th>
                      <th>Max Marks</th>
                      <th>Min Marks</th>
                      <th>Marks Obtained</th>
                      <th className="text-end">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>English (150)</td>
                      <td>100</td>
                      <td>35</td>
                      <td>65</td>
                      <td className="text-end">
                        <span className="badge badge-soft-success d-inline-flex align-items-center">
                          <i className="ti ti-circle-filled fs-5 me-1" />
                          Pass
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-dark text-white">Rank: 30</td>
                      <td className="bg-dark text-white">Total: 500</td>
                      <td className="bg-dark text-white" colSpan={2}>
                        Marks Obtained: 395
                      </td>
                      <td className="bg-dark text-white text-end">
                        <div className="d-flex align-items-center justify-content-end">
                          <span className="me-2">Percentage: 79.50</span>
                          <h6 className="fw-normal text-white">
                            Result: <span className="text-success"> Pass</span>
                          </h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
