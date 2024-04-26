import React, { useState, useEffect } from "react";

const Filters = ({ reports, setFilteredReports, query }) => {
  const [motivoOptions, setMotivoOptions] = useState([]);
  const [empleadoOptions, setEmpleadoOptions] = useState([]);
  const [ubicacionOptions, setUbicacionOptions] = useState([]);

  const [motivoFilter, setMotivoFilter] = useState("");
  const [empleadoFilter, setEmpleadoFilter] = useState("");
  const [ubicacionFilter, setUbicacionFilter] = useState("");

  useEffect(() => {
    const uniqueMotivoOptions = [
      "",
      ...new Set(reports.map((report) => report.motivo)),
    ];
    const uniqueEmpleadoOptions = [
      "",
      ...new Set(reports.map((report) => report.nombreEmpleado)),
    ];
    const uniqueUbicacionOptions = [
      "",
      ...new Set(reports.map((report) => report.ubicacion)),
    ];

    setMotivoOptions(uniqueMotivoOptions);
    setEmpleadoOptions(uniqueEmpleadoOptions);
    setUbicacionOptions(uniqueUbicacionOptions);
  }, [reports]);

  useEffect(() => {
    const filtered = reports.filter((report) => {
      const searchFields = [
        report.motivo.toLowerCase(),
        report.nombreEmpleado.toLowerCase(),
        report.ubicacion.toLowerCase(),
        report.descripcion.toLowerCase(),
      ];
      const matchesSearch = searchFields.some((field) =>
        field.includes(query.toLowerCase())
      );

      return (
        matchesSearch &&
        (motivoFilter === "" || report.motivo === motivoFilter) &&
        (empleadoFilter === "" || report.nombreEmpleado === empleadoFilter) &&
        (ubicacionFilter === "" || report.ubicacion === ubicacionFilter)
      );
    });
    setFilteredReports(filtered);
  }, [
    motivoFilter,
    empleadoFilter,
    ubicacionFilter,
    reports,
    query,
    setFilteredReports,
  ]);

  const handleMotivoChange = (e) => {
    setMotivoFilter(e.target.value);
  };

  const handleEmpleadoChange = (e) => {
    setEmpleadoFilter(e.target.value);
  };

  const handleUbicacionChange = (e) => {
    setUbicacionFilter(e.target.value);
  };

  return (
    <div className="filter-container">
      <div className="filter-dropdowns">
        <select
          className="filter-dropdown"
          value={motivoFilter}
          onChange={handleMotivoChange}
        >
          {motivoOptions.map((motivo) => (
            <option key={motivo} value={motivo}>
              {motivo || "Motivo"}
            </option>
          ))}
        </select>
        <select
          className="filter-dropdown"
          value={empleadoFilter}
          onChange={handleEmpleadoChange}
        >
          {empleadoOptions.map((empleado) => (
            <option key={empleado} value={empleado}>
              {empleado || "Empleado"}
            </option>
          ))}
        </select>
        <select
          className="filter-dropdown"
          value={ubicacionFilter}
          onChange={handleUbicacionChange}
        >
          {ubicacionOptions.map((ubicacion) => (
            <option key={ubicacion} value={ubicacion}>
              {ubicacion || "Ubicación"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
