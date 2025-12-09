import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [data, setData] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/activities/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Fetched activities:', results);
      });
  }, [endpoint]);

  return (
    <div className="card shadow-sm mb-4" style={{background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)'}}>
      <div className="card-body">
        <h2 className="card-title mb-4 text-primary" style={{color: '#3a86ff'}}>Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover" style={{borderRadius: '0.5rem', overflow: 'hidden'}}>
            <thead className="table-light" style={{background: '#8338ec', color: '#fff'}}>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Date</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id || idx} style={{background: idx % 2 === 0 ? '#f1f3f8' : '#fff'}}>
                  <td>{idx + 1}</td>
                  <td style={{color: '#8338ec', fontWeight: 'bold'}}>{item.type}</td>
                  <td>{item.duration}</td>
                  <td>{item.date}</td>
                  <td>{item.user?.name || item.user || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-primary mt-3" style={{background: 'linear-gradient(90deg, #3a86ff 0%, #8338ec 100%)', color: '#fff'}}>Log New Activity</button>
      </div>
    </div>
  );
};

export default Activities;
