import React, { useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./App.css";

const accessToken = "d5784370-40b5-11ec-aaa4-9cb6d0b7d039";
const apiUrl = "https://dealer-5wb4b3itbq-uc.a.run.app";

// https://dealer-5wb4b3itbq-uc.a.run.app
axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function FetchDealers() {
  const [users, setUsers] = useState([]);
  const [cards, setcards] = useState([]);
  const [requestError, setRequestError] = useState();
  const fetchData = useCallback(async () => {
    try {
      // Fetch and set users
      const result = await axios.get(`${apiUrl}/dealers/`);
      setUsers(result.data);
      console.log(result.data);
    } catch (err) {
      // Set request error message
      setRequestError(err.message);
    }
  });
  const fetchCard = useCallback(async (id, action) => {
    try {
      // Fetch and set users
      const cardResult = await axios.get(`${apiUrl}/dealers/${id}/${action}/`);
      console.log(cardResult.data);
      setcards(cardResult.data);
    } catch (err) {
      // Set request error message
      setRequestError(err.message);
    }
  });
  return (
    <div>
      <br />
      <br />
      <Button variant="primary" onClick={() => fetchData()}>
        Get Dealers
      </Button>
      <br />
      <br />
      <div className="conatiner">
        <div className="wrap">
          <div className="box one">
            <center>
              {users.map((dealers) => {
                return (
                  <Card className="dealers-card" key={dealers.id}>
                    <Card.Body>
                      <Card.Title>{dealers.name}</Card.Title>
                      <Card.Text> id: {dealers.id}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => fetchCard(dealers.id, "deck")}
                      >
                        Get Cards
                      </Button>
                      <br />
                      <br />
                      <Button
                        variant="primary"
                        onClick={() => fetchCard(dealers.id, "shuffle")}
                      >
                        Shuffle Cards
                      </Button>
                      <br />
                      <br />
                      <Button
                        variant="primary"
                        onClick={() => fetchCard(dealers.id, "arrange")}
                      >
                        Arrange Cards
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
              <br />
              <div className="card__overlay">
                <div className="card-content">
                  {cards.map((card) => {
                    return (
                      <Card
                        className="dealers-card"
                        key={card.rank + card.suit}
                      >
                        <Card.Body>
                          <Card.Title>{card.rank}</Card.Title>
                          <Card.Text> id: {card.suit}</Card.Text>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
      {requestError && <p className="error">{requestError}</p>}
    </div>
  );
}

export default FetchDealers;
