import { useState, useEffect, useCallback } from "react";
import Img from "react-image";
import LeaderboardAPI from "./Leaderboard";
import Filters from "./Filters";

import "./index.css";

export default function MainApp() {
  const [query, setQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  function handleReportSelect(report) {
    setSelectedReport(report);
  }

  function handleBackClick() {
    setSelectedReport(null);
  }

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch("http://208.94.246.53:8080/api/getReportes");
      console.log(response);
      const data = await response.json();
      setReports(data.recordset);
      setFilteredReports(data.recordset);
    } catch (error) {
      console.error("Error obteniendo reportes:", error);
    }
  };

  useEffect(() => {
    const filtered = reports.filter((report) => {
      const searchFields = [
        report.motivo.toLowerCase(),
        report.nombreEmpleado.toLowerCase(),
        report.ubicacion.toLowerCase(),
        report.descripcion.toLowerCase(),
      ];
      return searchFields.some((field) => field.includes(query.toLowerCase()));
    });
    setFilteredReports(filtered);
  }, [query, reports]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Numresults numResults={filteredReports.length} />
      </NavBar>
      <Filters
        reports={reports}
        setFilteredReports={setFilteredReports}
        query={query}
      />
      <Main>
        <ReportList
          reports={filteredReports}
          onReportSelect={handleReportSelect}
        />
        <ReportDetails report={selectedReport} onBackClick={handleBackClick} />
      </Main>
    </>
  );

  function NavBar({ children }) {
    return <nav className="nav-bar">{children}</nav>;
  }

  function Logo() {
    return (
      <div className="logo">
        <span role="img">📂</span>
        <h1>PromoGames Reportes</h1>
      </div>
    );
  }

  function ReportList({ reports, onReportSelect }) {
    function handleReportSelect(report) {
      onReportSelect(report);
    }

    return (
      <div className="box">
        <ul className="list list-reports">
          {reports.map((report) => (
            <li key={report.id} onClick={() => handleReportSelect(report)}>
              <h3>{report.motivo}</h3>
              <div>
                <p>
                  <span role="img">📍</span>
                  {report.ubicacion}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // function ReportDetails({ report, onBackClick }) {
  //   if (!report) {
  //     return (
  //       <div className="box">
  //         <LeaderboardAPI />
  //       </div>
  //     );
  //   }

  //   const dateObject = new Date(report.fechageneracion);

  //   const formattedDate = dateObject.toISOString().split("T")[0];

  //   return (
  //     <div className="box">
  //       <button className="btn-back" onClick={onBackClick}>
  //         &larr;
  //       </button>
  //       <div className="details">
  //         <div className="details-overview">
  //           <h2>{report.motivo}</h2>
  //           <p>{formattedDate}</p>
  //           <p>
  //             <span role="img">📍</span>
  //             {report.ubicacion}
  //           </p>
  //           <p>
  //             Reportado por: <strong>{report.nombreEmpleado}</strong>
  //           </p>
  //           <p>{report.descripcion}</p>
  //         </div>
  //         <img src={report.link} alt={report.motivo} />
  //       </div>
  //     </div>
  //   );
  // }

  function ReportDetails({ report, onBackClick }) {
    if (!report) {
      return (
        <div className="box">
          <LeaderboardAPI />
        </div>
      );
    }

    const dateObject = new Date(report.fechageneracion);
    const formattedDate = dateObject.toISOString().split("T")[0];
    const imageUrl =
      report.link !== null && report.link !== undefined
        ? `http://208.94.246.53:8080/images/${report.link.trim()}`
        : null;

    return (
      <div className="box">
        <button className="btn-back" onClick={onBackClick}>
          &larr;
        </button>
        <div className="details">
          <div className="details-overview">
            <h2>{report.motivo}</h2>
            <p>{formattedDate}</p>
            <p>
              <span role="img">📍</span>
              {report.ubicacion}
            </p>
            <p>
              Reportado por: <strong>{report.nombreEmpleado}</strong>
            </p>
            <p>{report.descripcion}</p>
          </div>
          {imageUrl && <img src={imageUrl} alt={report.motivo} />}
        </div>
      </div>
    );
  }

  // function ReportDetails({ report, onBackClick }) {
  //   if (!report) {
  //     return (
  //       <div className="box">
  //         <LeaderboardAPI />
  //       </div>
  //     );
  //   }

  //   const dateObject = new Date(report.fechageneracion);
  //   const formattedDate = dateObject.toISOString().split("T")[0];
  //   const imageUrl = `http://208.94.246.53:8080/images/${report.link.trim()}`;

  //   return (
  //     <div className="box">
  //       <button className="btn-back" onClick={onBackClick}>
  //         &larr;
  //       </button>
  //       <div className="details">
  //         <div className="details-overview">
  //           <h2>{report.motivo}</h2>
  //           <p>{formattedDate}</p>
  //           <p>
  //             <span role="img">📍</span>
  //             {report.ubicacion}
  //           </p>
  //           <p>
  //             Reportado por: <strong>{report.nombreEmpleado}</strong>
  //           </p>
  //           <p>{report.descripcion}</p>
  //         </div>
  //         <img src={imageUrl} alt={report.descripcion} />
  //       </div>
  //     </div>
  //   );
  // }

  // function ReportDetails({ report, onBackClick }) {
  //   if (!report) {
  //     return (
  //       <div className="box">
  //         <LeaderboardAPI />
  //       </div>
  //     );
  //   }

  //   const dateObject = new Date(report.fechageneracion);
  //   const imageUrl = `http://208.94.246.53:8080/images/${report.link}`;
  //   const formattedDate = dateObject.toISOString().split("T")[0];

  //   return (
  //     <div className="box">
  //       <button className="btn-back" onClick={onBackClick}>
  //         &larr;
  //       </button>
  //       <div className="details">
  //         <div className="details-overview">
  //           <h2>{report.motivo}</h2>
  //           <p>{formattedDate}</p>
  //           <p>
  //             <span role="img">📍</span>
  //             {report.ubicacion}
  //           </p>
  //           <p>
  //             Reportado por: <strong>{report.nombreEmpleado}</strong>
  //           </p>
  //           <p>{report.descripcion}</p>
  //         </div>
  //         <img src={imageUrl} alt={report.motivo} />
  //       </div>
  //     </div>
  //   );
  // }
  // function ReportDetails({ report, onBackClick }) {
  //   const [imageData, setImageData] = useState(null);

  //   const blobToBase64 = (blob) =>
  //     new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = () => resolve(reader.result.split(",")[1]);
  //       reader.onerror = reject;
  //       reader.readAsDataURL(blob);
  //     });

  //   useEffect(() => {
  //     const fetchImageData = async () => {
  //       if (report) {
  //         const imageUrl = `http://208.94.246.53:8080/images/${report.link}`;
  //         try {
  //           const response = await fetch(imageUrl);
  //           const blob = await response.blob();
  //           const base64Data = await blobToBase64(blob);
  //           setImageData(base64Data);
  //         } catch (error) {
  //           console.error("Error fetching image data:", error);
  //         }
  //       }
  //     };

  //     fetchImageData();
  //   }, [report]);

  //   if (!report) {
  //     return (
  //       <div className="box">
  //         <LeaderboardAPI />
  //       </div>
  //     );
  //   }

  //   const dateObject = new Date(report.fechageneracion);
  //   const formattedDate = dateObject.toISOString().split("T")[0];

  //   return (
  //     <div className="box">
  //       <button className="btn-back" onClick={onBackClick}>
  //         &larr;
  //       </button>
  //       <div className="details">
  //         <div className="details-overview">
  //           <h2>{report.motivo}</h2>
  //           <p>{formattedDate}</p>
  //           <p>
  //             <span role="img">📍</span>
  //             {report.ubicacion}
  //           </p>
  //           <p>
  //             Reportado por: <strong>{report.nombreEmpleado}</strong>
  //           </p>
  //           <p>{report.descripcion}</p>
  //         </div>
  //         {imageData ? (
  //           <img src={imageUrl} alt={report.motivo} />
  //         ) : (
  //           <p>Loading image...</p>
  //         )}
  //       </div>
  //     </div>
  //   );
  // }

  // function ReportDetails({ report, onBackClick }) {
  //   const [imageUrl, setImageUrl] = useState(null);

  //   useEffect(() => {
  //     if (report) {
  //       const imageUrl = `http://208.94.246.53:8080/images/${report.link}`;
  //       setImageUrl(imageUrl);
  //     }
  //   }, [report]);

  //   if (!report) {
  //     return (
  //       <div className="box">
  //         <LeaderboardAPI />
  //       </div>
  //     );
  //   }

  //   const dateObject = new Date(report.fechageneracion);
  //   const formattedDate = dateObject.toISOString().split("T")[0];

  //   return (
  //     <div className="box">
  //       <button className="btn-back" onClick={onBackClick}>
  //         &larr;
  //       </button>
  //       <div className="details">
  //         <div className="details-overview">
  //           <h2>{report.motivo}</h2>
  //           <p>{formattedDate}</p>
  //           <p>
  //             <span role="img">📍</span>
  //             {report.ubicacion}
  //           </p>
  //           <p>
  //             Reportado por: <strong>{report.nombreEmpleado}</strong>
  //           </p>
  //           <p>{report.descripcion}</p>
  //         </div>
  //         {imageUrl && <img src={imageUrl} alt={report.motivo} />}
  //       </div>
  //     </div>
  //   );
  // }

  function Search({ query, setQuery }) {
    const handleChange = (e) => {
      setQuery(e.target.value);
    };

    return (
      <input
        className="search"
        type="text"
        placeholder="Buscar reporte..."
        value={query}
        onChange={handleChange}
        autoFocus
      />
    );
  }

  function Numresults({ numResults }) {
    return (
      <p className="num-results">
        <strong>{numResults}</strong> resultados encontrados
      </p>
    );
  }

  function Main({ children }) {
    return <main className="main">{children}</main>;
  }
}
