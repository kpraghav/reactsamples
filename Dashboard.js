import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const USA_TOPO_JSON = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/USA.json";

// Static data for the mock
const dataCenters = [
  {
    id: 1,
    name: "New York DC",
    coordinates: [-74.006, 40.7128],
    databases: ["MySQL", "MongoDB", "Oracle"],
  },
  {
    id: 2,
    name: "San Francisco DC",
    coordinates: [-122.4194, 37.7749],
    databases: ["PostgreSQL", "Redis", "Cassandra"],
  },
  {
    id: 3,
    name: "Dallas DC",
    coordinates: [-96.7969, 32.7767],
    databases: ["SQL Server", "MariaDB", "Neo4j"],
  },
];

export default function Dashboard() {
  const [selectedDC, setSelectedDC] = useState(null);

  const handleMarkerClick = (dc) => {
    setSelectedDC(dc);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Map Section */}
      <div style={{ flex: 1, position: "relative", margin: "20px" }}>
        <h2 style={{ textAlign: "center" }}>Data Centers in the USA</h2>
        <ComposableMap
          projection="geoAlbersUsa"
          style={{ width: "100%", height: "90%" }}
        >
          <Geographies geography={USA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: "#D6D6DA" },
                    hover: { fill: "#A9A9A9" },
                    pressed: { fill: "#8B0000" },
                  }}
                />
              ))
            }
          </Geographies>
          {dataCenters.map((dc) => (
            <Marker key={dc.id} coordinates={dc.coordinates}>
              <circle
                r={8}
                fill="#FF0000"
                stroke="#fff"
                strokeWidth={2}
                onClick={() => handleMarkerClick(dc)}
                style={{ cursor: "pointer" }}
              />
              <text x={12} y={4} fontSize={12}>
                {dc.name}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Details Section */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          borderLeft: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Data Center Details</h2>
        {selectedDC ? (
          <div>
            <h3>{selectedDC.name}</h3>
            <ul>
              {selectedDC.databases.map((db, index) => (
                <li key={index}>{db}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Select a Data Center to see details.</p>
        )}
      </div>
    </div>
  );
}
