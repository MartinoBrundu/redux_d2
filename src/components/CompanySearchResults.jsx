import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import Job from "./Job";
import { useParams } from "react-router-dom";

const CompanySearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?company=";
  const companyError = useSelector((state) => state.jobs.hasError);

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getJobs = async () => {
    try {
      const response = await fetch(baseEndpoint + params.company);
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        throw new Error("Errore");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {companyError && <Alert variant="danger">{companyError}</Alert>} {/* Mostra un Alert in caso di errore */}
      {jobs.length === 0 && <Spinner />} {/* Mostra uno Spinner durante il caricamento */}
      <Row>
        <Col className="my-3">
          <h1 className="display-4">Job posting for: {params.company}</h1>
          {jobs.map((jobData) => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;